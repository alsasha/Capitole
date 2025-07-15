import React from 'react';
import './LoadingSpinner.scss';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  text = 'Loading...',
  className = ''
}) => {
  return (
    <div className={`loading-spinner loading-spinner--${size} ${className}`}>
      <div className="loading-spinner__spinner"></div>
      {text && <p className="loading-spinner__text">{text}</p>}
    </div>
  );
};

export default LoadingSpinner; 