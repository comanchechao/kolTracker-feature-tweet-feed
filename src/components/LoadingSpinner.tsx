import React from 'react';
import { Icon } from '@iconify/react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'text-main-accent',
  text,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <Icon
        icon="eos-icons:loading"
        className={`${sizeClasses[size]} ${color} animate-spin`}
      />
      {text && (
        <span className="mt-2 font-tiktok text-sm text-main-light-text">
          {text}
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;