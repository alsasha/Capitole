import React from 'react';
import './ErrorMessage.scss';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Error',
  message,
  onRetry,
  showRetry = false,
  className = ''
}) => {
  return (
    <div className={`error-message ${className}`}>
      <div className="error-message__content">
        <div className="error-message__icon">⚠️</div>
        <h3 className="error-message__title">{title}</h3>
        <p className="error-message__text">{message}</p>
        {showRetry && onRetry && (
          <button 
            onClick={onRetry}
            className="error-message__retry-button"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage; 