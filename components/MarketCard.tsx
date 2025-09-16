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
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white">
            {marketData.symbol}
          </h3>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(marketData.price)}
          </p>
        </div>

        <div className="text-right">
          <div className={`flex items-center ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <TrendingDown className="w-4 h-4 mr-1" />
            )}
            <span className="font-medium">
              {formatPercentage(marketData.change24h)}
            </span>
          </div>
          <p className="text-sm text-slate-300">24h Change</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">24h Volume:</span>
          <span className="text-white font-medium">
            {formatCurrency(marketData.volume24h)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Volatility:</span>
          <div className="flex items-center">
            <Activity className="w-3 h-3 text-yellow-500 mr-1" />
            <span className="text-white font-medium">
              {formatPercentage(marketData.volatility * 100)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-600">
        <div className="flex space-x-2">
          <button className="bg-green-600 text-white flex-1 text-sm py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200">
            Buy
          </button>
          <button className="bg-red-600 text-white flex-1 text-sm py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200">
            Sell
          </button>
        </div>
      </div>
    </div>
  );
}
