'use client';

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

export function PerformanceCard({ performance }: PerformanceCardProps) {
  const isProfit = performance.totalPnL > 0;
  
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-lg p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <DollarSign className="w-5 h-5 text-slate-300 mr-1" />
            {isProfit ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
          </div>
          <p className="text-2xl font-bold text-white">
            {formatCurrency(performance.totalPnL)}
          </p>
          <p className="text-sm text-slate-300">Total P&L</p>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Target className="w-5 h-5 text-slate-300" />
          </div>
          <p className="text-2xl font-bold text-white">
            {formatPercentage(performance.winRate)}
          </p>
          <p className="text-sm text-slate-300">Win Rate</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-600">
        <div className="flex justify-between text-sm">
          <span className="text-slate-300">Total Trades:</span>
          <span className="text-white font-medium">{performance.totalTrades}</span>
        </div>
        <div className="flex justify-between text-sm mt-1">
          <span className="text-slate-300">Avg Trade Size:</span>
          <span className="text-white font-medium">
            {formatCurrency(performance.avgTradeSize)}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <button className="bg-slate-700 text-white w-full text-sm py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors duration-200">
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
}
