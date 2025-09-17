'use client';

import { useAccount } from 'wagmi';
import { Bot, Settings, Wallet } from 'lucide-react';

export function Header() {
  const { address, isConnected } = useAccount();
  
  return (
    <header className="bg-surface border-b border-gray-700 px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-background" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-primary">AlphaFlow AI</h1>
            <p className="text-xs text-text-secondary">AI Trading Coach</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isConnected && address && (
            <span className="text-sm text-text-secondary">
              {address.slice(0, 6)}...{address.slice(-4)}
            </span>
          )}
          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors duration-200">
            <Settings className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
      </div>
    </header>
  );
}
