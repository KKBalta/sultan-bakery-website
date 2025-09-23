import React, { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  onError?: () => void;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  fallbackText = 'Image not available',
  onError
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = () => {
    console.log(`Failed to load image: ${src}`);
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}>
        <div className="text-center">
          <div className="text-sm font-medium">{fallbackText}</div>
          <div className="text-xs mt-1 opacity-75">
            Check image URL in Google Sheet
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-600"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
    </div>
  );
};
