// src/types/vipps.ts

export interface VippsCustomerInfo {
  name: string;
  email: string;
  phone: string;
}

export interface VippsPaymentData {
  orderId: string;
  amount: number; // Amount in øre
  customerInfo: VippsCustomerInfo;
  description?: string;
}

export interface VippsResponse {
  success: boolean;
  orderId?: string;
  reference?: string;
  url?: string;
  error?: string;
}

export interface VippsTransactionInfo {
  status: 'INITIATED' | 'AUTHORIZED' | 'CAPTURED' | 'CANCELLED' | 'FAILED' | 'EXPIRED';
  amount: number;
  transactionId: string;
  timeStamp?: string;
}

export interface VippsStatusResponse {
  success: boolean;
  orderId?: string;
  transactionInfo?: VippsTransactionInfo;
  error?: string;
}

export interface VippsCallbackData {
  orderId: string;
  reference: string;
  status: string;
}

// Vipps API Response Types (for internal use)
export interface VippsApiPaymentRequest {
  amount: {
    value: number;
    currency: 'NOK';
  };
  paymentMethod: {
    type: 'WALLET';
  };
  customer: {
    phoneNumber: string;
  };
  paymentDescription: string;
  userFlow: 'WEB_REDIRECT' | 'NATIVE_REDIRECT';
  returnUrl: string;
  reference: string;
  paymentToken: string;
}

export interface VippsApiPaymentResponse {
  reference: string;
  redirectUrl: string;
  paymentToken: string;
}

export interface VippsApiStatusResponse {
  reference: string;
  state: 'CREATED' | 'ABORTED' | 'EXPIRED' | 'AUTHORIZED' | 'TERMINATED';
  amount: {
    value: number;
    currency: string;
  };
  aggregate: {
    authorizedAmount: {
      value: number;
      currency: string;
    };
    capturedAmount: {
      value: number;
      currency: string;
    };
    refundedAmount: {
      value: number;
      currency: string;
    };
    cancelledAmount: {
      value: number;
      currency: string;
    };
  };
  pspReference: string;
  userFlow: string;
  createdAt: string;
  modifiedAt: string;
}

export interface VippsApiTokenResponse {
  token_type: 'Bearer';
  expires_in: number;
  ext_expires_in: number;
  expires_on: string;
  not_before: string;
  resource: string;
  access_token: string;
}

// Order-related types
export interface OrderStatus {
  id: string;
  status: 'CREATED' | 'RESERVED' | 'INITIATED' | 'AUTHORIZED' | 'CAPTURED' | 'CANCELLED' | 'FAILED' | 'EXPIRED';
  vippsReference?: string;
  vippsTransactionId?: string;
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
}

// Error types
export interface VippsError {
  code: string;
  message: string;
  field?: string;
}