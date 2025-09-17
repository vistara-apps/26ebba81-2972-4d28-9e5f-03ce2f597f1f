'use client';

import { useState, useEffect } from 'react';
import { AlertCard } from './AlertCard';
import { PerformanceCard } from './PerformanceCard';
import { MarketCard } from './MarketCard';
import { AIChat } from './AIChat';
import { PaymentModal } from './PaymentModal';
import { PaymentTestPanel } from './PaymentTestPanel';
import { generateMockData } from '../lib/utils';
import { Alert, User } from '../lib/types';

export function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        const mockData = generateMockData();
        setAlerts(mockData.alerts);
        setUser(mockData.user);
        setPerformance(mockData.performance);
        setMarketData(mockData.marketData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.alertId !== alertId));
  };

  if (loading) {
    return (
      <div className="px-4 py-6 max-w-lg mx-auto space-y-4">
        <div className="animate-pulse">
          <div className="h-32 bg-surface rounded-lg mb-4"></div>
          <div className="h-24 bg-surface rounded-lg mb-4"></div>
          <div className="h-24 bg-surface rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 max-w-lg mx-auto space-y-6">
      {/* Active Alerts */}
      <section>
        <h2 className="text-xl font-semibold text-text-primary mb-4">Active Alerts</h2>
        <div className="space-y-3">
          {alerts.length > 0 ? (
            alerts.map(alert => (
              <AlertCard
                key={alert.alertId}
                alert={alert}
                onDismiss={handleDismissAlert}
              />
            ))
          ) : (
            <div className="notification-card text-center py-8">
              <p className="text-text-secondary">No active alerts</p>
              <p className="text-sm text-text-secondary mt-1">
                You're trading within healthy parameters
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Performance Overview */}
      {performance && (
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Performance</h2>
          <PerformanceCard performance={performance} />
        </section>
      )}

      {/* Market Data */}
      {marketData && (
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Market Overview</h2>
          <MarketCard marketData={marketData} />
        </section>
      )}

      {/* AI Chat */}
      <section>
        <h2 className="text-xl font-semibold text-text-primary mb-4">AI Coach</h2>
        <AIChat />
      </section>

      {/* Payment Test Panel - Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <section>
          <h2 className="text-xl font-semibold text-text-primary mb-4">Payment Testing</h2>
          <PaymentTestPanel />
        </section>
      )}

      {/* Subscription CTA */}
      {user?.subscriptionTier === 'free' && (
        <section className="frame-gradient rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Upgrade to Pro
          </h3>
          <p className="text-text-secondary mb-4">
            Get real-time alerts, advanced pattern recognition, and personalized insights
          </p>
          <button 
            onClick={() => setShowPaymentModal(true)}
            className="cta-primary w-full"
          >
            Upgrade for $19/month
          </button>
        </section>
      )}

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        planName="Pro"
        amount="19.00"
        description="Monthly subscription for real-time alerts, advanced pattern recognition, and personalized insights"
      />
    </div>
  );
}
