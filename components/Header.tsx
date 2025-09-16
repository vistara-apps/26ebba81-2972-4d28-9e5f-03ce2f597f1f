'use client';

import { Bot, Settings } from 'lucide-react';

export function Header() {
  
  return (
    <header className="bg-slate-800 border-b border-slate-600 px-4 py-3">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">AlphaFlow AI</h1>
            <p className="text-xs text-slate-300">AI Trading Coach</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-300">
            Trader
          </span>
          <button className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200">
            <Settings className="w-5 h-5 text-slate-300" />
          </button>
        </div>
      </div>
    </header>
  );
}
