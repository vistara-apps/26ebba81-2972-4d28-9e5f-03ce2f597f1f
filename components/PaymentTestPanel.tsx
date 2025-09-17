'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { CheckCircle, XCircle, Play, Loader2 } from 'lucide-react';
import { PaymentFlowTester, TestResult, INTEGRATION_CHECKLIST } from '../lib/test-payment-flow';
import { usePaymentService } from '../lib/payment-service';

export function PaymentTestPanel() {
  const { address, isConnected } = useAccount();
  const { paymentService, isReady } = usePaymentService();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const runTests = async () => {
    if (!isConnected || !address || !paymentService) {
      alert('Please connect your wallet first');
      return;
    }

    setIsRunningTests(true);
    setTestResults([]);

    try {
      const tester = new PaymentFlowTester();
      // We'll pass a mock wallet client for testing
      const results = await tester.runAllTests(paymentService, address);
      setTestResults(results);
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      setIsRunningTests(false);
    }
  };

  const summary = testResults.length > 0 ? {
    total: testResults.length,
    passed: testResults.filter(r => r.passed).length,
    failed: testResults.filter(r => !r.passed).length,
    passRate: (testResults.filter(r => r.passed).length / testResults.length) * 100,
  } : null;

  return (
    <div className="bg-surface border border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        x402 Payment Flow Testing
      </h3>
      
      {/* Integration Checklist */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-text-primary mb-3">Implementation Checklist</h4>
        <div className="space-y-2">
          {INTEGRATION_CHECKLIST.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-text-primary text-sm font-medium">{item.item}</p>
                <p className="text-text-secondary text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Controls */}
      <div className="mb-4">
        <button
          onClick={runTests}
          disabled={!isConnected || !isReady || isRunningTests}
          className="bg-accent text-background py-2 px-4 rounded-lg font-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          {isRunningTests ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Running Tests...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Run Payment Tests</span>
            </>
          )}
        </button>
        
        {!isConnected && (
          <p className="text-text-secondary text-sm mt-2">
            Connect your wallet to run tests
          </p>
        )}
      </div>

      {/* Test Results Summary */}
      {summary && (
        <div className="mb-4 bg-background rounded-lg p-4">
          <h4 className="text-md font-medium text-text-primary mb-2">Test Summary</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-text-secondary">Total Tests:</span>
              <span className="text-text-primary ml-2">{summary.total}</span>
            </div>
            <div>
              <span className="text-text-secondary">Pass Rate:</span>
              <span className={`ml-2 ${summary.passRate === 100 ? 'text-green-400' : 'text-yellow-400'}`}>
                {summary.passRate.toFixed(1)}%
              </span>
            </div>
            <div>
              <span className="text-text-secondary">Passed:</span>
              <span className="text-green-400 ml-2">{summary.passed}</span>
            </div>
            <div>
              <span className="text-text-secondary">Failed:</span>
              <span className="text-red-400 ml-2">{summary.failed}</span>
            </div>
          </div>
        </div>
      )}

      {/* Detailed Test Results */}
      {testResults.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-md font-medium text-text-primary">Test Results</h4>
          {testResults.map((result, index) => (
            <div
              key={index}
              className={`border rounded-lg p-3 ${
                result.passed 
                  ? 'border-green-700 bg-green-900/20' 
                  : 'border-red-700 bg-red-900/20'
              }`}
            >
              <div className="flex items-start space-x-3">
                {result.passed ? (
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <h5 className="font-medium text-text-primary text-sm">{result.test}</h5>
                  <p className={`text-xs mt-1 ${result.passed ? 'text-green-300' : 'text-red-300'}`}>
                    {result.message}
                  </p>
                  {result.data && (
                    <details className="mt-2">
                      <summary className="text-xs text-text-secondary cursor-pointer hover:text-text-primary">
                        View Details
                      </summary>
                      <pre className="text-xs text-text-secondary mt-1 bg-background p-2 rounded overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Connection Status */}
      <div className="mt-6 pt-4 border-t border-gray-700">
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span className="text-text-secondary">Wallet Connected:</span>
            <span className={isConnected ? 'text-green-400' : 'text-red-400'}>
              {isConnected ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-text-secondary">Payment Service Ready:</span>
            <span className={isReady ? 'text-green-400' : 'text-red-400'}>
              {isReady ? 'Yes' : 'No'}
            </span>
          </div>
          {isConnected && address && (
            <div className="flex justify-between">
              <span className="text-text-secondary">Address:</span>
              <span className="text-text-primary font-mono text-xs">
                {address.slice(0, 6)}...{address.slice(-4)}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}