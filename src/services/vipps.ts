// src/services/vipps.ts
import { functions } from '../lib/appwrite';
import type { VippsPaymentData, VippsResponse, VippsStatusResponse } from '../types';

const VIPPS_FUNCTION_ID = import.meta.env.VITE_VIPPS_FUNCTION_ID;

export class VippsService {

  /**
   * Initiate payment with Vipps
   */
  static async initiatePayment(paymentData: VippsPaymentData): Promise<VippsResponse> {
    try {
      console.log('🚀 Initiating Vipps payment:', paymentData);

      if (!VIPPS_FUNCTION_ID) {
        throw new Error('Vipps Function ID is not configured');
      }

      const response = await functions.createExecution(
        VIPPS_FUNCTION_ID,
        JSON.stringify({
          action: 'initiate',
          orderId: paymentData.orderId,
          amount: paymentData.amount,
          customerInfo: paymentData.customerInfo
        })
      );

      console.log('📨 Vipps function response:', {
        statusCode: response.responseStatusCode,
        body: response.responseBody
      });

      if (response.responseStatusCode !== 200) {
        throw new Error(`Vipps function failed: ${response.responseBody}`);
      }

      const result = JSON.parse(response.responseBody);
      
      if (!result.success) {
        throw new Error(result.error || 'Unknown Vipps error');
      }

      return {
        success: true,
        orderId: result.orderId,
        reference: result.reference,
        url: result.redirectUrl
      };

    } catch (error) {
      console.error('❌ Vipps payment initiation failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Check payment status
   */
  static async checkPaymentStatus(orderId: string): Promise<VippsStatusResponse> {
    try {
      console.log('🔍 Checking Vipps payment status:', orderId);

      if (!VIPPS_FUNCTION_ID) {
        throw new Error('Vipps Function ID is not configured');
      }

      const response = await functions.createExecution(
        VIPPS_FUNCTION_ID,
        JSON.stringify({
          action: 'status',
          orderId: orderId
        })
      );

      if (response.responseStatusCode !== 200) {
        throw new Error(`Status check failed: ${response.responseBody}`);
      }

      const result = JSON.parse(response.responseBody);
      
      if (!result.success) {
        throw new Error(result.error || 'Unknown status check error');
      }

      return {
        success: true,
        orderId: result.orderId,
        transactionInfo: {
          status: result.status,
          amount: result.amount,
          transactionId: result.transactionId || 'N/A'
        }
      };

    } catch (error) {
      console.error('❌ Status check failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Handle payment callback from Vipps
   */
  static async handleCallback(orderId: string, reference: string): Promise<VippsStatusResponse> {
    try {
      console.log('🔄 Handling Vipps callback:', { orderId, reference });

      if (!VIPPS_FUNCTION_ID) {
        throw new Error('Vipps Function ID is not configured');
      }

      const response = await functions.createExecution(
        VIPPS_FUNCTION_ID,
        JSON.stringify({
          action: 'callback',
          orderId: orderId,
          reference: reference
        })
      );

      if (response.responseStatusCode !== 200) {
        throw new Error(`Callback handling failed: ${response.responseBody}`);
      }

      const result = JSON.parse(response.responseBody);
      
      if (!result.success) {
        throw new Error(result.error || 'Unknown callback error');
      }

      return {
        success: true,
        orderId: result.orderId,
        transactionInfo: {
          status: result.status,
          amount: result.amount || 0,
          transactionId: result.transactionId || 'N/A'
        }
      };

    } catch (error) {
      console.error('❌ Callback handling failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Generate customer phone number (utility)
   */
  static formatPhoneNumber(phone: string): string {
    // Remove spaces and non-digits
    const cleaned = phone.replace(/\D/g, '');
    
    // Add Norwegian country code if missing
    if (cleaned.length === 8) {
      return `47${cleaned}`;
    }
    
    if (cleaned.startsWith('47') && cleaned.length === 10) {
      return cleaned;
    }
    
    // Return as-is if unknown format
    return cleaned;
  }

  /**
   * Validate payment amount (in øre)
   */
  static validateAmount(amount: number): boolean {
    return amount > 0 && amount <= 1000000000; // Max 10 million NOK
  }

  /**
   * Convert NOK to øre
   */
  static nokToOre(nok: number): number {
    return Math.round(nok * 100);
  }

  /**
   * Convert øre to NOK
   */
  static oreToNok(ore: number): number {
    return ore / 100;
  }
}

// Export default instance for convenience
export const vipps = VippsService;