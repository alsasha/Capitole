import React, { useState } from 'react';
import './SafeImage.scss';

interface SafeImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  onError?: () => void;
  onLoad?: () => void;
  [key: string]: any; // Allow other img attributes
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackSrc = '/placeholder-movie.jpg',
  className = '',
  onError,
  onLoad,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    if (!hasError && imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
      setHasError(true);
    } else {
      setIsLoading(false);
      onError?.();
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  // Reset state when src changes
  React.useEffect(() => {
    setImageSrc(src);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  return (
    <div className={`safe-image ${className} ${isLoading ? 'safe-image--loading' : ''}`}>
      {isLoading && (
        <div className="safe-image__loading">
          <div className="safe-image__spinner"></div>
        </div>
      )}
      <img
        src={imageSrc}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        className={`safe-image__img ${isLoading ? 'safe-image__img--hidden' : ''}`}
        {...props}
      />
    </div>
  );
};

export default SafeImage; 