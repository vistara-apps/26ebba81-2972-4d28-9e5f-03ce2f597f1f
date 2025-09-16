'use client';

import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../lib/utils';

interface MarketCardProps {
  marketData: {
    symbol: string;
    price: number;
    change24h: number;
    volume24h: number;
    volatility: number;
  };
}

export function MarketCard({ marketData }: MarketCardProps) {
  const isPositive = marketData.change24h > 0;
  
  return (
    <div className="notification-card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">
            {marketData.symbol}
          </h3>
          <p className="text-2xl font-bold text-text-primary">
            {formatCurrency(marketData.price)}
          </p>
        </div>
        
        <div className="text-right">
          <div className={`flex items-center ${isPositive ? 'text-success' : 'text-danger'}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span className="font-medium">
              {formatPercentage(marketData.change24h)}
            </span>
          </div>
          <p className="text-sm text-text-secondary">24h Change</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">24h Volume:</span>
          <span className="text-text-primary font-medium">
            {formatCurrency(marketData.volume24h)}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-text-secondary">Volatility:</span>
          <div className="flex items-center">
            <Activity className="w-3 h-3 text-warning mr-1" />
            <span className="text-text-primary font-medium">
              {formatPercentage(marketData.volatility * 100)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-600">
        <div className="flex space-x-2">
          <button className="cta-primary flex-1 text-sm py-2">
            Buy
          </button>
          <button className="cta-secondary flex-1 text-sm py-2">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}
