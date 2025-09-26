import { useState, useEffect } from 'react';

interface UsePageLoadingOptions {
  minimumLoadingTime?: number; // Minimum time to show loading (in ms)
  waitForImages?: boolean; // Wait for all images to load
  waitForFonts?: boolean; // Wait for fonts to load
}

export const usePageLoading = (options: UsePageLoadingOptions = {}) => {
  const {
    minimumLoadingTime = 1000,
    waitForImages = true,
    waitForFonts = true
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    let loadedImages = 0;
    let totalImages = 0;
    let fontsLoaded = false;
    let domContentLoaded = false;

    const updateProgress = () => {
      let progress = 0;
      
      // DOM content loaded (30% of progress)
      if (domContentLoaded) progress += 30;
      
      // Images loaded (50% of progress)
      if (totalImages > 0) {
        progress += (loadedImages / totalImages) * 50;
      } else if (waitForImages) {
        progress += 50; // No images to wait for
      }
      
      // Fonts loaded (20% of progress)
      if (fontsLoaded || !waitForFonts) progress += 20;
      
      setLoadingProgress(Math.min(progress, 100));
    };

    const checkIfComplete = () => {
      const elapsedTime = Date.now() - startTime;
      const isComplete = 
        domContentLoaded &&
        (!waitForImages || loadedImages >= totalImages) &&
        (!waitForFonts || fontsLoaded) &&
        elapsedTime >= minimumLoadingTime;

      if (isComplete) {
        // Add a small delay for smooth transition
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      }
    };

    // Check DOM content loaded
    if (document.readyState === 'complete') {
      domContentLoaded = true;
    } else {
      const handleDOMContentLoaded = () => {
        domContentLoaded = true;
        updateProgress();
        checkIfComplete();
      };
      
      document.addEventListener('DOMContentLoaded', handleDOMContentLoaded);
    }

    // Check images
    if (waitForImages) {
      const images = document.querySelectorAll('img');
      totalImages = images.length;
      
      if (totalImages === 0) {
        loadedImages = 0;
      } else {
        images.forEach((img) => {
          if (img.complete) {
            loadedImages++;
          } else {
            img.addEventListener('load', () => {
              loadedImages++;
              updateProgress();
              checkIfComplete();
            });
            img.addEventListener('error', () => {
              loadedImages++;
              updateProgress();
              checkIfComplete();
            });
          }
        });
      }
    }

    // Check fonts
    if (waitForFonts && 'fonts' in document) {
      document.fonts.ready.then(() => {
        fontsLoaded = true;
        updateProgress();
        checkIfComplete();
      });
    } else {
      fontsLoaded = true;
    }

    // Initial progress update
    updateProgress();
    checkIfComplete();

    // Fallback: Hide loading after maximum time
    const maxLoadingTime = Math.max(minimumLoadingTime, 5000);
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, maxLoadingTime);

    return () => {
      clearTimeout(fallbackTimer);
    };
  }, [minimumLoadingTime, waitForImages, waitForFonts]);

  return { isLoading, loadingProgress };
};
