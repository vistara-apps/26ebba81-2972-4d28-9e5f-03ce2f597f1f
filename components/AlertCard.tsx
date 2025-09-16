'use client';

import { AlertTriangle, Clock, TrendingUp, X } from 'lucide-react';
import { Alert } from '../lib/types';
import { getTimeAgo } from '../lib/utils';

interface AlertCardProps {
  alert: Alert;
  onDismiss: (alertId: string) => void;
}

export function AlertCard({ alert, onDismiss }: AlertCardProps) {
  const getAlertIcon = () => {
    switch (alert.type) {
      case 'overtrading':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'optimal_hours':
        return <Clock className="w-5 h-5 text-accent" />;
      case 'pattern':
        return <TrendingUp className="w-5 h-5 text-danger" />;
      case 'performance':
        return <TrendingUp className="w-5 h-5 text-primary" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-text-secondary" />;
    }
  };

  const getPriorityColor = () => {
    switch (alert.priority) {
      case 'high':
        return 'border-l-danger';
      case 'medium':
        return 'border-l-warning';
      case 'low':
        return 'border-l-accent';
      default:
        return 'border-l-gray-600';
    }
  };

  return (
    <div className={`notification-card border-l-4 ${getPriorityColor()} animate-slide-up`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="mt-0.5">
            {getAlertIcon()}
          </div>
          <div className="flex-1">
            <p className="text-text-primary font-medium mb-1">
              {alert.message}
            </p>
            <p className="text-sm text-text-secondary">
              {getTimeAgo(alert.timestamp)}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => onDismiss(alert.alertId)}
          className="p-1 hover:bg-gray-600 rounded transition-colors duration-200"
        >
          <X className="w-4 h-4 text-text-secondary" />
        </button>
      </div>
      
      {alert.type === 'overtrading' && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <button className="cta-secondary text-sm py-2 px-4">
            View Trading Activity
          </button>
        </div>
      )}
      
      {alert.type === 'optimal_hours' && (
        <div className="mt-3 pt-3 border-t border-gray-600">
          <button className="cta-primary text-sm py-2 px-4">
            View Opportunities
          </button>
        </div>
      )}
    </div>
  );
}
