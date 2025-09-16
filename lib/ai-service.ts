import OpenAI from 'openai';
import { AIInsight, Trade, Alert } from './types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

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
    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          {
            role: 'system',
            content: 'You are AlphaFlow AI, a professional trading coach. Provide concise, actionable trading advice. Keep responses under 100 words and focus on risk management and discipline.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 'I\'m here to help with your trading decisions. What would you like to know?';
    } catch (error) {
      console.error('AI response error:', error);
      return 'I\'m experiencing some technical difficulties. Please try again later.';
    }
  }
}

export const aiCoach = new AITradingCoach();
