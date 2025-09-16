# AlphaFlow AI - Your AI Trading Coach

A Base Mini App that serves as an AI-powered trading coach for crypto traders, helping them make smarter trading decisions through intelligent notifications and insights.

## Features

- **AI-Powered Overtrading Prevention**: Monitors trading activity and sends timely notifications to prevent impulsive trading
- **Optimal Trading Hours Alerts**: Identifies and notifies users of the most opportune times to trade
- **Trading Pattern Identification**: Analyzes past behavior to identify and prevent recurring losing patterns
- **Actionable Performance Feedback**: Provides personalized insights for continuous improvement
- **Real-time AI Chat**: Interactive AI coach for instant trading advice

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit)
- **Wallet Integration**: OnchainKit
- **AI**: OpenAI API (via OpenRouter)
- **Styling**: Tailwind CSS
- **TypeScript**: Full type safety

## Getting Started

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key  
   - `OPENAI_API_KEY`: Your OpenAI API key

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open in Base App**: Navigate to `http://localhost:3000` in Base App or compatible Farcaster client

## Architecture

### Core Components

- **Dashboard**: Main interface showing alerts, performance, and market data
- **AlertCard**: Displays AI-generated trading alerts with actionable insights
- **PerformanceCard**: Shows trading performance metrics and analytics
- **MarketCard**: Real-time market data and trading opportunities
- **AIChat**: Interactive chat interface with the AI trading coach

### AI Services

- **Overtrading Analysis**: Monitors trade frequency and identifies concerning patterns
- **Optimal Hours Detection**: Analyzes market conditions to identify high-probability trading windows
- **Pattern Recognition**: Identifies recurring losing patterns like revenge trading
- **Performance Feedback**: Provides personalized insights based on trading history

### Data Models

- **User**: Profile, preferences, and subscription information
- **Trade**: Individual trade records with P&L tracking
- **Alert**: AI-generated notifications and recommendations
- **Pattern**: Identified trading patterns and risk assessments

## Subscription Tiers

- **Free**: Limited alerts and basic insights
- **Pro ($19/mo)**: Enhanced AI analysis and more frequent alerts
- **Premium ($49/mo)**: Real-time optimal hour alerts and personalized pattern identification

## Base Mini App Integration

This app is built specifically for the Base ecosystem:

- **MiniKit Integration**: Seamless wallet connection and transaction handling
- **OnchainKit Components**: Native Base identity and wallet components
- **Social Features**: Built for sharing and discovery within Base App
- **Mobile-First**: Optimized for mobile trading on the go

## Development

### Project Structure

```
app/                 # Next.js App Router
├── layout.tsx      # Root layout with providers
├── page.tsx        # Main dashboard page
├── providers.tsx   # MiniKit and OnchainKit providers
└── globals.css     # Global styles and Tailwind

components/         # React components
├── Dashboard.tsx   # Main dashboard component
├── AlertCard.tsx   # Alert display component
├── AIChat.tsx      # AI chat interface
└── ...

lib/               # Utilities and services
├── types.ts       # TypeScript type definitions
├── utils.ts       # Helper functions
└── ai-service.ts  # AI integration service
```

### Key Features Implementation

1. **Real-time Alerts**: AI analyzes trading patterns and market conditions
2. **Performance Tracking**: Comprehensive analytics and feedback loops
3. **Social Integration**: Built for Base App's social trading environment
4. **Mobile Optimization**: Touch-friendly interface for mobile trading

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions:
- Create an issue on GitHub
- Join our Discord community
- Follow us on Farcaster: @alphaflow

---

**Trade Smarter, Not Harder** with AlphaFlow AI 🚀
