// functions/vipps-payment/src/main.js
import { Client, Databases } from 'node-appwrite';

/**
 * Vipps Payment Integration Function
 * Håndterer Vipps ePay API calls sikkert på server-side
 */

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  if (req.method === 'OPTIONS') {
    return res.json({}, 200, corsHeaders);
  }

  try {
    const { action, ...payload } = JSON.parse(req.body || '{}');
    log(`Vipps function called with action: ${action}`);

    switch (action) {
      case 'initiate':
        return await initiatePayment(payload, { databases, log, error, res, corsHeaders });
      
      case 'callback':
        return await handleCallback(payload, { databases, log, error, res, corsHeaders });
      
      case 'status':
        return await checkPaymentStatus(payload, { databases, log, error, res, corsHeaders });
      
      default:
        throw new Error(`Unknown action: ${action}`);
    }

  } catch (err) {
    error(`Vipps function error: ${err.message}`);
    return res.json({ 
      success: false, 
      error: err.message 
    }, 400, corsHeaders);
  }
};

/**
 * Initiate Vipps payment
 */
async function initiatePayment(payload, { databases, log, error, res, corsHeaders }) {
  const { orderId, amount, customerInfo } = payload;
  
  log(`Initiating Vipps payment for order: ${orderId}, amount: ${amount}`);

  try {
    // 1. Get access token from Vipps
    const accessToken = await getVippsAccessToken();
    
    // 2. Create payment request
    const paymentRequest = {
      amount: {
        value: amount, // Amount in øre
        currency: 'NOK'
      },
      paymentMethod: {
        type: 'WALLET'
      },
      customer: {
        phoneNumber: customerInfo.phone
      },
      paymentDescription: `Urban Studios - Kursbestilling ${orderId}`,
      userFlow: 'WEB_REDIRECT',
      returnUrl: `${process.env.FRONTEND_URL}/payment/callback?orderId=${orderId}`,
      reference: orderId,
      paymentToken: generatePaymentToken()
    };

    // 3. Call Vipps ePay API
    const vippsResponse = await fetch('https://apitest.vipps.no/epay/v1/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY,
        'Vipps-System-Name': 'Urban Studios',
        'Vipps-System-Version': '1.0.0',
        'Vipps-System-Plugin-Name': 'Urban Studios Booking',
        'Vipps-System-Plugin-Version': '1.0.0'
      },
      body: JSON.stringify(paymentRequest)
    });

    if (!vippsResponse.ok) {
      const errorData = await vippsResponse.text();
      throw new Error(`Vipps API error: ${vippsResponse.status} - ${errorData}`);
    }

    const vippsData = await vippsResponse.json();
    log(`Vipps payment initiated successfully: ${vippsData.reference}`);
    
    // 4. Update order in database with Vipps reference
    await databases.updateDocument(
      process.env.DATABASE_ID,
      process.env.ORDERS_COLLECTION_ID,
      orderId,
      {
        vippsReference: vippsData.reference,
        vippsToken: paymentRequest.paymentToken,
        status: 'INITIATED'
      }
    );

    return res.json({
      success: true,
      reference: vippsData.reference,
      redirectUrl: vippsData.redirectUrl,
      orderId: orderId
    }, 200, corsHeaders);

  } catch (err) {
    error(`Payment initiation failed: ${err.message}`);
    
    // Update order status to failed
    try {
      await databases.updateDocument(
        process.env.DATABASE_ID,
        process.env.ORDERS_COLLECTION_ID,
        orderId,
        { status: 'FAILED', errorMessage: err.message }
      );
    } catch (dbError) {
      error(`Failed to update order status: ${dbError.message}`);
    }

    throw err;
  }
}

/**
 * Handle Vipps callback
 */
async function handleCallback(payload, { databases, log, error, res, corsHeaders }) {
  const { orderId, reference } = payload;
  
  log(`Handling Vipps callback for order: ${orderId}`);

  try {
    // 1. Get payment status from Vipps
    const paymentStatus = await checkVippsPaymentStatus(reference);
    
    // 2. Update order in database
    const orderUpdate = {
      status: paymentStatus.state,
      vippsTransactionId: paymentStatus.transactionId,
      paidAt: paymentStatus.state === 'AUTHORIZED' ? new Date().toISOString() : null,
      updatedAt: new Date().toISOString()
    };

    await databases.updateDocument(
      process.env.DATABASE_ID,
      process.env.ORDERS_COLLECTION_ID,
      orderId,
      orderUpdate
    );

    // 3. If payment successful, capture it
    if (paymentStatus.state === 'AUTHORIZED') {
      await captureVippsPayment(reference, paymentStatus.amount.value);
      
      // Update to captured
      await databases.updateDocument(
        process.env.DATABASE_ID,
        process.env.ORDERS_COLLECTION_ID,
        orderId,
        { status: 'CAPTURED' }
      );
    }

    log(`Order ${orderId} updated with status: ${paymentStatus.state}`);

    return res.json({
      success: true,
      status: paymentStatus.state,
      orderId: orderId
    }, 200, corsHeaders);

  } catch (err) {
    error(`Callback handling failed: ${err.message}`);
    throw err;
  }
}

/**
 * Check payment status
 */
async function checkPaymentStatus(payload, { databases, log, error, res, corsHeaders }) {
  const { orderId } = payload;
  
  try {
    // Get order from database
    const order = await databases.getDocument(
      process.env.DATABASE_ID,
      process.env.ORDERS_COLLECTION_ID,
      orderId
    );

    if (order.vippsReference) {
      // Check status with Vipps
      const vippsStatus = await checkVippsPaymentStatus(order.vippsReference);
      
      // Update local status if different
      if (vippsStatus.state !== order.status) {
        await databases.updateDocument(
          process.env.DATABASE_ID,
          process.env.ORDERS_COLLECTION_ID,
          orderId,
          { status: vippsStatus.state }
        );
      }

      return res.json({
        success: true,
        status: vippsStatus.state,
        orderId: orderId,
        amount: vippsStatus.amount.value
      }, 200, corsHeaders);
    }

    return res.json({
      success: true,
      status: order.status,
      orderId: orderId
    }, 200, corsHeaders);

  } catch (err) {
    error(`Status check failed: ${err.message}`);
    throw err;
  }
}

/**
 * Helper functions
 */

async function getVippsAccessToken() {
  const tokenResponse = await fetch('https://apitest.vipps.no/accesstoken/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client_id': process.env.VIPPS_CLIENT_ID,
      'client_secret': process.env.VIPPS_CLIENT_SECRET,
      'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY
    }
  });

  if (!tokenResponse.ok) {
    throw new Error(`Failed to get Vipps access token: ${tokenResponse.status}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

async function checkVippsPaymentStatus(reference) {
  const accessToken = await getVippsAccessToken();
  
  const statusResponse = await fetch(`https://apitest.vipps.no/epay/v1/payments/${reference}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY
    }
  });

  if (!statusResponse.ok) {
    throw new Error(`Failed to check Vipps payment status: ${statusResponse.status}`);
  }

  return await statusResponse.json();
}

async function captureVippsPayment(reference, amount) {
  const accessToken = await getVippsAccessToken();
  
  const captureResponse = await fetch(`https://apitest.vipps.no/epay/v1/payments/${reference}/capture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
      'Ocp-Apim-Subscription-Key': process.env.VIPPS_SUBSCRIPTION_KEY
    },
    body: JSON.stringify({
      amount: {
        value: amount,
        currency: 'NOK'
      }
    })
  });

  if (!captureResponse.ok) {
    throw new Error(`Failed to capture Vipps payment: ${captureResponse.status}`);
  }

  return await captureResponse.json();
}

function generatePaymentToken() {
  return `urban_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}