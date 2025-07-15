import React from 'react';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry,
  className = ''
}) => {
  return (
    <div className={`error-message ${className}`}>
      <div className="error-message__icon">⚠️</div>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="error-message__retry-button"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage; 