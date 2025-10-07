import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * whenever the route changes. This ensures users start at the top when navigating
 * between different pages.
 * 
 * Excludes tablet-menu route to preserve scroll position for better UX.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Skip scroll-to-top for tablet menu to preserve user's scroll position
    if (pathname === '/tablet-menu') {
      return;
    }

    // Check if there's a zoom modal open (by checking for fixed body position)
    const isModalOpen = document.body.style.position === 'fixed';
    
    if (isModalOpen) {
      return;
    }

    // Add a small delay to ensure any modal operations are complete
    const timer = setTimeout(() => {
      // Final check for modal state
      const isModalStillOpen = document.body.style.position === 'fixed';
      
      if (!isModalStillOpen && pathname !== '/tablet-menu') {
        // Immediate scroll to top without smooth behavior to override CSS
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // This component doesn't render anything
};
