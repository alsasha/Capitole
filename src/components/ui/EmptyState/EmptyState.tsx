import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button';
import './EmptyState.scss';

export interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  actionOnClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionLink,
  actionOnClick,
  icon,
  className = ''
}) => {
  const actionElement = actionText && (
    actionLink ? (
      <Link to={actionLink} className="empty-state__action">
        <Button variant="primary" size="large">
          {actionText}
        </Button>
      </Link>
    ) : (
      <Button 
        variant="primary" 
        size="large" 
        onClick={actionOnClick}
        className="empty-state__action"
      >
        {actionText}
      </Button>
    )
  );

  return (
    <div className={`empty-state ${className}`}>
      <div className="empty-state__content">
        {icon && (
          <div className="empty-state__icon">
            {icon}
          </div>
        )}
        <h1 className="empty-state__title">{title}</h1>
        <p className="empty-state__description">{description}</p>
        {actionElement}
      </div>
    </div>
  );
}; 