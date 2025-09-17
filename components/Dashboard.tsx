'use client';

import { useState, useEffect, useCallback } from 'react';
import { AlertCard } from './AlertCard';
import { PerformanceCard } from './PerformanceCard';
import { MarketCard } from './MarketCard';
import { AIChat } from './AIChat';
import { WelcomeCard } from './WelcomeCard';
import { generateMockData } from '../lib/utils';
import { Alert, User } from '../lib/types';

export function Dashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [performance, setPerformance] = useState<any>(null);
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      try {
        const mockData = generateMockData();
        setAlerts(mockData.alerts);
        setUser(mockData.user);
        setPerformance(mockData.performance);
        setMarketData(mockData.marketData);
        
        // Show welcome for new users (simulate first visit check)
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
          setShowWelcome(true);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDismissAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.alertId !== alertId));
  }, []);

  const handleDismissWelcome = useCallback(() => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
  }, []);

  if (loading) {
    return (
      <div className="px-4 py-6 w-full max-w-screen-sm mx-auto space-y-6 min-h-screen">
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-6 bg-surface rounded-lg animate-pulse-soft w-32"></div>
            <div className="h-32 bg-surface rounded-lg animate-pulse-soft"></div>
          </div>
          <div className="space-y-3">
            <div className="h-6 bg-surface rounded-lg animate-pulse-soft w-28"></div>
            <div className="h-24 bg-surface rounded-lg animate-pulse-soft"></div>
          </div>
          <div className="space-y-3">
            <div className="h-6 bg-surface rounded-lg animate-pulse-soft w-36"></div>
            <div className="h-24 bg-surface rounded-lg animate-pulse-soft"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 w-full max-w-screen-sm mx-auto space-y-6 min-h-screen">
      {/* Welcome Card for new users */}
      {showWelcome && (
        <WelcomeCard onDismiss={handleDismissWelcome} />
      )}

      {/* Active Alerts */}
      <section aria-labelledby="alerts-heading">
        <h2 id="alerts-heading" className="section-title">Active Alerts</h2>
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
            <div className="notification-card text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">All Clear!</h3>
              <p className="text-text-secondary mb-4">
                No active alerts - you're trading within healthy parameters
              </p>
              <p className="text-sm text-text-secondary">
                The AI coach will notify you when patterns need attention
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Performance Overview */}
      {performance && (
        <section aria-labelledby="performance-heading">
          <h2 id="performance-heading" className="section-title">Performance</h2>
          <PerformanceCard performance={performance} />
        </section>
      )}

      {/* Market Data */}
      {marketData && (
        <section aria-labelledby="market-heading">
          <h2 id="market-heading" className="section-title">Market Overview</h2>
          <MarketCard marketData={marketData} />
        </section>
      )}

      {/* AI Chat */}
      <section aria-labelledby="chat-heading">
        <h2 id="chat-heading" className="section-title">AI Coach</h2>
        <AIChat />
      </section>

      {/* Subscription CTA */}
      {user?.subscriptionTier === 'free' && (
        <section className="frame-gradient rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Upgrade to Pro
          </h3>
          <p className="text-text-secondary mb-4">
            Get real-time alerts, advanced pattern recognition, and personalized insights
          </p>
          <button className="cta-primary w-full">
            Upgrade for $19/month
          </button>
        </section>
      )}
    </div>
  );
}
