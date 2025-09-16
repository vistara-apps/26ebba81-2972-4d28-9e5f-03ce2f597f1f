import { AIInsight, Trade, Alert } from './types';

export class AITradingCoach {
  async analyzeOvertrading(trades: Trade[]): Promise<AIInsight> {
    const recentTrades = trades.filter(
      trade => Date.now() - trade.timestamp.getTime() < 3600000 // Last hour
    );

    if (recentTrades.length >= 5) {
      return {
        type: 'overtrading',
        confidence: 0.85,
        message: 'Take a break - you\'re trading on tilt. You\'ve made 5 trades in the last hour.',
        actionable: true,
        data: { tradeCount: recentTrades.length, timeframe: '1h' },
      };
    }

    return {
      type: 'overtrading',
      confidence: 0.2,
      message: 'Trading frequency looks healthy.',
      actionable: false,
    };
  }

  async identifyOptimalHours(marketData: any[]): Promise<AIInsight> {
    // Simulate AI analysis of market data
    const currentHour = new Date().getHours();
    const isOptimalTime = currentHour >= 9 && currentHour <= 11; // Market open hours

    if (isOptimalTime) {
      return {
        type: 'optimal_hours',
        confidence: 0.78,
        message: 'Optimal trading window detected. High volatility and volume expected.',
        actionable: true,
        data: { timeframe: '2h', expectedVolatility: 'high' },
      };
    }

    return {
      type: 'optimal_hours',
      confidence: 0.3,
      message: 'Current market conditions are average for trading.',
      actionable: false,
    };
  }

  async analyzePatterns(trades: Trade[]): Promise<AIInsight> {
    const lossingTrades = trades.filter(trade => (trade.profitLoss || 0) < 0);
    const recentLosses = lossingTrades.slice(-3);

    if (recentLosses.length >= 3) {
      return {
        type: 'pattern',
        confidence: 0.72,
        message: 'Detected potential revenge trading pattern. Consider taking a break.',
        actionable: true,
        data: { pattern: 'revenge_trading', consecutiveLosses: 3 },
      };
    }

    return {
      type: 'pattern',
      confidence: 0.4,
      message: 'No concerning patterns detected in recent trades.',
      actionable: false,
    };
  }

  async generatePerformanceFeedback(trades: Trade[]): Promise<AIInsight> {
    const winRate = trades.filter(t => (t.profitLoss || 0) > 0).length / trades.length;
    
    if (winRate < 0.4) {
      return {
        type: 'performance',
        confidence: 0.8,
        message: 'Your win rate has dropped below 40%. Consider reviewing your strategy.',
        actionable: true,
        data: { winRate: winRate * 100, suggestion: 'strategy_review' },
      };
    }

    return {
      type: 'performance',
      confidence: 0.6,
      message: `Good performance! Win rate: ${(winRate * 100).toFixed(1)}%`,
      actionable: false,
      data: { winRate: winRate * 100 },
    };
  }

  async generateAIResponse(message: string): Promise<string> {
    // Mock AI responses for demo purposes
    const responses = [
      "Remember, discipline is key in trading. Stick to your strategy and avoid emotional decisions.",
      "Market timing is crucial. Consider the current volatility and your risk tolerance before entering trades.",
      "Always use stop-loss orders to protect your capital. Risk management comes before profits.",
      "Study your past trades to identify patterns. Learning from mistakes is how you improve.",
      "Patience is a trader's best friend. Wait for the right opportunities rather than forcing trades.",
      "Diversification helps manage risk. Don't put all your capital in one position.",
      "Keep a trading journal to track your decisions and outcomes. This helps with continuous improvement.",
      "Market conditions change. What worked yesterday might not work today. Stay adaptable.",
    ];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return a random response or a contextual one based on message content
    if (message.toLowerCase().includes('risk')) {
      return "Risk management is paramount. Never risk more than 1-2% of your capital on any single trade.";
    } else if (message.toLowerCase().includes('profit') || message.toLowerCase().includes('loss')) {
      return "Focus on the process, not just profits. Consistent, disciplined trading leads to long-term success.";
    } else {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
}

export const aiCoach = new AITradingCoach();
