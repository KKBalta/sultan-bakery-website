import React, { useState, useEffect } from 'react';
import { getGoogleDriveFallbackUrls } from '../utils/imageUtils';
import { imageCache } from '../utils/imageCache';

interface GoogleDriveImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackText?: string;
  onError?: () => void;
}

export const GoogleDriveImage: React.FC<GoogleDriveImageProps> = ({
  src,
  alt,
  className = '',
  fallbackText = 'Image not available',
  onError
}) => {
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Get fallback URLs if it's a Google Drive URL
  const fallbackUrls = src.includes('drive.google.com') 
    ? getGoogleDriveFallbackUrls(src)
    : [src];

  // Check cache for successful URL first
  const cachedUrl = imageCache.getProcessedUrl(src);
  const initialUrls = cachedUrl ? [cachedUrl, ...fallbackUrls] : fallbackUrls;

  const currentUrl = initialUrls[currentUrlIndex];

  const handleImageError = () => {
    console.log(`Failed to load image: ${currentUrl}`);
    
    // Try next fallback URL
    if (currentUrlIndex < initialUrls.length - 1) {
      setCurrentUrlIndex(prev => prev + 1);
      setIsLoading(true);
    } else {
      // All URLs failed - cache the failure
      imageCache.setFailed(src);
      setHasError(true);
      setIsLoading(false);
      onError?.();
    }
  };

  // Handle redirects for Google Drive images
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    const finalUrl = img.src;
    
    // If the final URL is different from what we requested, cache the working URL
    if (finalUrl !== currentUrl && finalUrl.includes('googleusercontent.com')) {
      console.log(`Image loaded via redirect: ${finalUrl}`);
      imageCache.setProcessedUrl(src, finalUrl);
    } else {
      imageCache.setProcessedUrl(src, currentUrl);
    }
    
    setIsLoading(false);
    setHasError(false);
  };


  // Reset when src changes
  useEffect(() => {
    setCurrentUrlIndex(0);
    setHasError(false);
    setIsLoading(true);
  }, [src]);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-200 text-gray-500 ${className}`}>
        <div className="text-center">
          <div className="text-sm font-medium">{fallbackText}</div>
          {src.includes('drive.google.com') && (
            <div className="text-xs mt-1 opacity-75">
              <div>Google Drive image unavailable</div>
              <div className="mt-1 text-xs">
                <a 
                  href={src} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Check file permissions
                </a>
              </div>
            </div>
          )}
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
        src={currentUrl}
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
