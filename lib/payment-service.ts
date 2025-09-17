import { useWalletClient } from 'wagmi';
import { withPaymentInterceptor } from 'x402-axios';
import axios from 'axios';
import { base } from 'viem/chains';
import { parseUnits, formatUnits } from 'viem';

// USDC contract address on Base
export const USDC_CONTRACT_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';

export interface PaymentOptions {
  amount: string; // Amount in USDC (e.g., "19.00")
  recipient: string; // Recipient address
  description?: string;
}

export interface PaymentResult {
  success: boolean;
  transactionHash?: string;
  error?: string;
}

export class PaymentService {
  private x402Client: any;
  private walletClient: any;
  
  constructor(walletClient: any) {
    if (walletClient) {
      this.walletClient = walletClient;
      
      // Create axios instance with payment interceptor
      this.x402Client = axios.create({
        baseURL: process.env.NEXT_PUBLIC_X402_API_URL || 'https://api.x402.dev',
        timeout: 30000,
      });
      
      // Add payment interceptor - this will handle x402 payment flow automatically
      withPaymentInterceptor(this.x402Client, this.walletClient);
    }
  }

  async initializePayment(options: PaymentOptions): Promise<PaymentResult> {
    try {
      if (!this.x402Client) {
        throw new Error('Wallet client not available');
      }

      // Convert amount to wei (USDC has 6 decimals)
      const amountInWei = parseUnits(options.amount, 6);

      // Create payment request
      const paymentRequest = {
        to: options.recipient,
        amount: amountInWei.toString(),
        token: USDC_CONTRACT_ADDRESS,
        description: options.description || 'AlphaFlow AI Payment',
      };

      console.log('Initiating payment:', paymentRequest);

      // Process payment through x402
      const response = await this.x402Client.post('/payments', paymentRequest);
      
      if (response.status === 200 && response.data.transactionHash) {
        return {
          success: true,
          transactionHash: response.data.transactionHash,
        };
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown payment error',
      };
    }
  }

  async checkTransactionStatus(transactionHash: string): Promise<{
    confirmed: boolean;
    confirmations: number;
    error?: string;
  }> {
    try {
      if (!this.x402Client) {
        throw new Error('Wallet client not available');
      }

      const response = await this.x402Client.get(`/transactions/${transactionHash}`);
      
      return {
        confirmed: response.data.confirmed || false,
        confirmations: response.data.confirmations || 0,
      };
    } catch (error) {
      console.error('Transaction status check error:', error);
      return {
        confirmed: false,
        confirmations: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  async getUSDCBalance(address: string): Promise<string> {
    try {
      if (!this.x402Client) {
        throw new Error('Wallet client not available');
      }

      const response = await this.x402Client.get(`/balances/${address}?token=${USDC_CONTRACT_ADDRESS}`);
      
      // Convert from wei to USDC (6 decimals)
      const balance = formatUnits(BigInt(response.data.balance || '0'), 6);
      return balance;
    } catch (error) {
      console.error('Balance check error:', error);
      return '0';
    }
  }
}

// Hook to use the payment service
export function usePaymentService() {
  const { data: walletClient } = useWalletClient();
  
  const paymentService = walletClient ? new PaymentService(walletClient) : null;
  
  return {
    paymentService,
    isReady: !!paymentService,
  };
}