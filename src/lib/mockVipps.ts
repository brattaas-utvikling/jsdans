// src/lib/mockVipps.ts
import type { VippsPaymentData, VippsResponse, VippsStatusResponse } from '../types';

// Mock Vipps integration for testing
export const mockVipps = {
  async initiatePayment(orderData: VippsPaymentData): Promise<VippsResponse> {
    console.log('🚀 Mock Vipps: Initiating payment', orderData);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Generate mock order ID
    const mockOrderId = `vipps_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Simulate Vipps response
    return {
      orderId: mockOrderId,
      url: `${window.location.origin}/payment-simulation?orderId=${mockOrderId}&amount=${orderData.amount}`,
      success: true
    };
  },

  async checkPaymentStatus(orderId: string): Promise<VippsStatusResponse> {
    console.log('🔍 Mock Vipps: Checking payment status', orderId);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Simulate different payment statuses
    const statuses: Array<'RESERVED' | 'PENDING' | 'CANCELLED'> = ['RESERVED', 'PENDING', 'CANCELLED'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    // 80% chance of success for testing
    const status = Math.random() > 0.2 ? 'RESERVED' : randomStatus;
    
    return {
      orderId,
      transactionInfo: {
        status,
        amount: 150000, // Mock amount in øre
        transactionId: `txn_${Date.now()}`
      },
      success: true
    };
  }
};

// Real Vipps integration (placeholder for when credentials are ready)
export const realVipps = {
  async initiatePayment(orderData: VippsPaymentData): Promise<VippsResponse> {
    const response = await fetch('/api/vipps/initiate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to initiate Vipps payment');
    }
    
    return response.json();
  },

  async checkPaymentStatus(orderId: string): Promise<VippsStatusResponse> {
    const response = await fetch(`/api/vipps/status/${orderId}`);
    
    if (!response.ok) {
      throw new Error('Failed to check payment status');
    }
    
    return response.json();
  }
};

// Export the appropriate implementation based on environment
export const vipps = import.meta.env.VITE_MOCK_PAYMENTS === 'true' ? mockVipps : realVipps;