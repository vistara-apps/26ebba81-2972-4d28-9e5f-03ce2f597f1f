'use client';

import { useState } from 'react';
import { Bot, TrendingUp, Shield, Clock, X } from 'lucide-react';

interface WelcomeCardProps {
  onDismiss: () => void;
}

export function WelcomeCard({ onDismiss }: WelcomeCardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: <Bot className="w-8 h-8 text-accent" />,
      title: "Welcome to AlphaFlow AI",
      description: "Your personal AI trading coach that helps you make smarter trading decisions and avoid common pitfalls.",
    },
    {
      icon: <Shield className="w-8 h-8 text-warning" />,
      title: "Overtrading Prevention",
      description: "Get real-time alerts when you're trading too frequently or showing signs of emotional trading.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Optimal Trading Hours",
      description: "Discover the best times to trade based on market conditions and your personal trading patterns.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-success" />,
      title: "Pattern Recognition",
      description: "Learn from your trading history and get insights to improve your performance over time.",
    },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onDismiss();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="notification-card relative animate-slide-up">
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 touch-target hover:bg-gray-600 active:bg-gray-500 rounded-lg transition-colors duration-200"
      >
        <X className="w-4 h-4 text-text-secondary" />
      </button>

      <div className="text-center py-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center">
          {steps[currentStep].icon}
        </div>
        
        <h3 className="card-title">{steps[currentStep].title}</h3>
        <p className="text-text-secondary mb-6 leading-relaxed">
          {steps[currentStep].description}
        </p>

        {/* Progress indicators */}
        <div className="flex justify-center space-x-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentStep ? 'bg-accent' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex space-x-3">
          {currentStep > 0 && (
            <button
              onClick={prevStep}
              className="cta-secondary flex-1 text-sm"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className="cta-primary flex-1 text-sm"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}