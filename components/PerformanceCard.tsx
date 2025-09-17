'use client';

import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../lib/utils';

interface PerformanceCardProps {
  performance: {
    totalPnL: number;
    winRate: number;
    totalTrades: number;
    avgTradeSize: number;
  };
}

export const PerformanceCard = React.memo(function PerformanceCard({ performance }: PerformanceCardProps) {
  const isProfit = performance.totalPnL > 0;
  
  return (
    <div className="notification-card">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="w-5 h-5 text-text-secondary mr-1" />
            {isProfit ? (
              <TrendingUp className="w-4 h-4 text-success" />
            ) : (
              <TrendingDown className="w-4 h-4 text-danger" />
            )}
          </div>
          <p className="metric-value">
            {formatCurrency(performance.totalPnL)}
          </p>
          <p className="metric-label">Total P&L</p>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-text-secondary" />
          </div>
          <p className="metric-value">
            {formatPercentage(performance.winRate)}
          </p>
          <p className="metric-label">Win Rate</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Total Trades:</span>
          <span className="text-text-primary font-medium">{performance.totalTrades}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-text-secondary">Avg Trade Size:</span>
          <span className="text-text-primary font-medium">
            {formatCurrency(performance.avgTradeSize)}
          </span>
        </div>
      </div>
      
      <div className="mt-4">
        <button className="cta-secondary w-full text-sm">
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
});
