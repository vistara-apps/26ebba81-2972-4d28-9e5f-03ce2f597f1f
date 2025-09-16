export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress?: string;
  subscriptionTier: 'free' | 'pro' | 'premium';
  notificationPreferences: NotificationPreferences;
  tradingStrategyProfile?: TradingStrategyProfile;
}

export interface NotificationPreferences {
  overtradingAlerts: boolean;
  optimalHoursAlerts: boolean;
  patternAlerts: boolean;
  performanceFeedback: boolean;
  preferredTradingPairs: string[];
}

export interface TradingStrategyProfile {
  riskTolerance: 'low' | 'medium' | 'high';
  tradingStyle: 'scalping' | 'day' | 'swing' | 'position';
  preferredTimeframes: string[];
  maxDailyTrades: number;
}

export interface Trade {
  tradeId: string;
  userId: string;
  timestamp: Date;
  action: 'buy' | 'sell';
  asset: string;
  size: number;
  price: number;
  profitLoss?: number;
  notes?: string;
  patternId?: string;
}

export interface Alert {
  alertId: string;
  userId: string;
  timestamp: Date;
  type: 'overtrading' | 'optimal_hours' | 'pattern' | 'performance';
  message: string;
  status: 'pending' | 'read' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
}

export interface Pattern {
  patternId: string;
  name: string;
  description: string;
  identificationCriteria: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  volatility: number;
  timestamp: Date;
}

export interface AIInsight {
  type: 'overtrading' | 'optimal_hours' | 'pattern' | 'performance';
  confidence: number;
  message: string;
  actionable: boolean;
  data?: any;
}
