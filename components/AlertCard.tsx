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
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'optimal_hours':
        return <Clock className="w-5 h-5 text-green-500" />;
      case 'pattern':
        return <TrendingUp className="w-5 h-5 text-red-500" />;
      case 'performance':
        return <TrendingUp className="w-5 h-5 text-blue-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getPriorityColor = () => {
    switch (alert.priority) {
      case 'high':
        return 'border-l-red-500';
      case 'medium':
        return 'border-l-yellow-500';
      case 'low':
        return 'border-l-green-500';
      default:
        return 'border-l-slate-600';
    }
  };

  return (
    <div className={`bg-slate-800 border border-slate-600 rounded-lg p-4 border-l-4 ${getPriorityColor()}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="mt-0.5">
            {getAlertIcon()}
          </div>
          <div className="flex-1">
            <p className="text-white font-medium mb-1">
              {alert.message}
            </p>
            <p className="text-sm text-slate-300">
              {getTimeAgo(alert.timestamp)}
            </p>
          </div>
        </div>

        <button
          onClick={() => onDismiss(alert.alertId)}
          className="p-1 hover:bg-slate-700 rounded transition-colors duration-200"
        >
          <X className="w-4 h-4 text-slate-300" />
        </button>
      </div>

      {alert.type === 'overtrading' && (
        <div className="mt-3 pt-3 border-t border-slate-600">
          <button className="bg-slate-700 text-white text-sm py-2 px-4 rounded-lg hover:bg-slate-600 transition-colors duration-200">
            View Trading Activity
          </button>
        </div>
      )}

      {alert.type === 'optimal_hours' && (
        <div className="mt-3 pt-3 border-t border-slate-600">
          <button className="bg-blue-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            View Opportunities
          </button>
        </div>
      )}
    </div>
  );
}
