'use client';

import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { X, CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { usePaymentService, PaymentOptions, PaymentResult } from '../lib/payment-service';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  amount: string;
  description: string;
}

export function PaymentModal({ isOpen, onClose, planName, amount, description }: PaymentModalProps) {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { paymentService, isReady } = usePaymentService();
  
  const [paymentState, setPaymentState] = useState<'idle' | 'processing' | 'confirming' | 'success' | 'error'>('idle');
  const [paymentResult, setPaymentResult] = useState<PaymentResult | null>(null);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [confirmations, setConfirmations] = useState(0);
  const [balance, setBalance] = useState<string>('0');

  // Load balance when connected
  useEffect(() => {
    if (isConnected && address && paymentService) {
      paymentService.getUSDCBalance(address).then(setBalance);
    }
  }, [isConnected, address, paymentService]);

  // Monitor transaction confirmations
  useEffect(() => {
    if (paymentState === 'confirming' && transactionHash && paymentService) {
      const checkConfirmations = async () => {
        try {
          const status = await paymentService.checkTransactionStatus(transactionHash);
          setConfirmations(status.confirmations);
          
          if (status.confirmed && status.confirmations >= 1) {
            setPaymentState('success');
          }
        } catch (error) {
          console.error('Error checking confirmations:', error);
        }
      };

      const interval = setInterval(checkConfirmations, 5000); // Check every 5 seconds
      return () => clearInterval(interval);
    }
  }, [paymentState, transactionHash, paymentService]);

  const handlePayment = async () => {
    if (!paymentService || !isConnected) return;

    setPaymentState('processing');
    setPaymentResult(null);

    const paymentOptions: PaymentOptions = {
      amount,
      recipient: process.env.NEXT_PUBLIC_PAYMENT_RECIPIENT || '0x742d35Cc6634C0532925a3b8D0f0b25b47d5d2b2', // Default recipient
      description,
    };

    try {
      const result = await paymentService.initializePayment(paymentOptions);
      setPaymentResult(result);
      
      if (result.success && result.transactionHash) {
        setTransactionHash(result.transactionHash);
        setPaymentState('confirming');
      } else {
        setPaymentState('error');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentState('error');
      setPaymentResult({
        success: false,
        error: error instanceof Error ? error.message : 'Payment failed',
      });
    }
  };

  const handleClose = () => {
    setPaymentState('idle');
    setPaymentResult(null);
    setTransactionHash('');
    setConfirmations(0);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-surface border border-gray-700 rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-text-primary">Upgrade to {planName}</h3>
          <button
            onClick={handleClose}
            className="text-text-secondary hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Plan Details */}
          <div className="bg-background rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-text-primary font-medium">{planName} Plan</span>
              <span className="text-text-primary font-bold">${amount} USDC</span>
            </div>
            <p className="text-text-secondary text-sm">{description}</p>
          </div>

          {/* Wallet Connection */}
          {!isConnected ? (
            <div className="space-y-3">
              <p className="text-text-secondary text-sm">Connect your wallet to proceed with payment:</p>
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Connect {connector.name}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Wallet Info */}
              <div className="bg-background rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-text-secondary text-sm">Connected Wallet:</span>
                  <button
                    onClick={() => disconnect()}
                    className="text-accent text-sm hover:underline"
                  >
                    Disconnect
                  </button>
                </div>
                <p className="text-text-primary font-mono text-sm">
                  {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-text-secondary text-sm">USDC Balance:</span>
                  <span className="text-text-primary font-medium">{parseFloat(balance).toFixed(2)} USDC</span>
                </div>
              </div>

              {/* Payment Status */}
              {paymentState === 'idle' && (
                <button
                  onClick={handlePayment}
                  disabled={!isReady || parseFloat(balance) < parseFloat(amount)}
                  className="w-full bg-accent text-background py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay ${amount} USDC</span>
                </button>
              )}

              {paymentState === 'processing' && (
                <div className="bg-background rounded-lg p-4 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-2" />
                  <p className="text-text-primary">Processing payment...</p>
                  <p className="text-text-secondary text-sm">Please confirm in your wallet</p>
                </div>
              )}

              {paymentState === 'confirming' && (
                <div className="bg-background rounded-lg p-4 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto mb-2" />
                  <p className="text-text-primary">Confirming transaction...</p>
                  <p className="text-text-secondary text-sm">
                    Confirmations: {confirmations}/1
                  </p>
                  {transactionHash && (
                    <a
                      href={`https://basescan.org/tx/${transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-sm hover:underline mt-2 inline-block"
                    >
                      View on BaseScan
                    </a>
                  )}
                </div>
              )}

              {paymentState === 'success' && (
                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-400 font-medium">Payment Successful!</p>
                  <p className="text-text-secondary text-sm">Your upgrade is now active</p>
                  {transactionHash && (
                    <a
                      href={`https://basescan.org/tx/${transactionHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent text-sm hover:underline mt-2 inline-block"
                    >
                      View Transaction
                    </a>
                  )}
                  <button
                    onClick={handleClose}
                    className="w-full bg-accent text-background py-2 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors mt-3"
                  >
                    Continue
                  </button>
                </div>
              )}

              {paymentState === 'error' && (
                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 text-center">
                  <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <p className="text-red-400 font-medium">Payment Failed</p>
                  <p className="text-text-secondary text-sm">
                    {paymentResult?.error || 'An error occurred during payment'}
                  </p>
                  <button
                    onClick={() => setPaymentState('idle')}
                    className="w-full bg-accent text-background py-2 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors mt-3"
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Insufficient Balance Warning */}
              {parseFloat(balance) < parseFloat(amount) && paymentState === 'idle' && (
                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-3">
                  <p className="text-yellow-400 text-sm">
                    Insufficient USDC balance. You need ${amount} USDC but only have {parseFloat(balance).toFixed(2)} USDC.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}