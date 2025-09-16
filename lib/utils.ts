import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatPercentage(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}%`;
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function generateMockData() {
  return {
    user: {
      userId: 'user_123',
      farcasterId: 'trader_alpha',
      subscriptionTier: 'pro' as const,
      notificationPreferences: {
        overtradingAlerts: true,
        optimalHoursAlerts: true,
        patternAlerts: true,
        performanceFeedback: true,
        preferredTradingPairs: ['BTC/USD', 'ETH/USD', 'SOL/USD'],
      },
    },
    alerts: [
      {
        alertId: 'alert_1',
        userId: 'user_123',
        timestamp: new Date(Date.now() - 1000 * 60 * 15),
        type: 'overtrading' as const,
        message: 'Take a break - you\'re trading on tilt. You\'ve made 5 trades in the last hour.',
        status: 'pending' as const,
        priority: 'high' as const,
      },
      {
        alertId: 'alert_2',
        userId: 'user_123',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: 'optimal_hours' as const,
        message: 'Optimal trading window detected for BTC/USD. High volatility expected.',
        status: 'read' as const,
        priority: 'medium' as const,
      },
    ],
    marketData: {
      symbol: 'BTC/USD',
      price: 67420.50,
      change24h: 2.45,
      volume24h: 28500000000,
      volatility: 0.034,
      timestamp: new Date(),
    },
    performance: {
      totalPnL: 2457.10,
      winRate: 68.5,
      totalTrades: 147,
      avgTradeSize: 1250,
    },
  };
}
