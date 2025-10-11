import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';

interface WakeUpLoaderProps {
  duration?: number; // Duration in milliseconds
  onWakeUp?: () => void; // Optional callback when wake up is detected
}

export const WakeUpLoader: React.FC<WakeUpLoaderProps> = ({ duration = 2000, onWakeUp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Show loader on initial page load
    if (isInitialLoad) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsInitialLoad(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad, duration]);

  useEffect(() => {
    let wakeUpTimer: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible (iPad woke up or tab became active)
        setIsVisible(true);
        
        // Refresh menu data when waking up
        if (!isInitialLoad) {
          console.log('WakeUpLoader: Triggering menu refresh on visibility change');
          if (onWakeUp) onWakeUp();
        }
        
        // Hide loader after specified duration
        wakeUpTimer = setTimeout(() => {
          setIsVisible(false);
        }, duration);
      } else {
        // Page became hidden, clear any pending timer
        if (wakeUpTimer) {
          clearTimeout(wakeUpTimer);
        }
      }
    };

    const handleFocus = () => {
      // Additional trigger for when window gains focus
      if (!isInitialLoad) {
        setIsVisible(true);
        
        // Refresh menu data when gaining focus
        if (refresh) {
          console.log('WakeUpLoader: Triggering menu refresh');
          refresh();
        }
        
        wakeUpTimer = setTimeout(() => {
          setIsVisible(false);
        }, duration);
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      // Handle back/forward cache restoration
      if (event.persisted && !isInitialLoad) {
        setIsVisible(true);
        
        // Refresh menu data when page is restored from cache
        if (refresh) {
          console.log('WakeUpLoader: Triggering menu refresh');
          refresh();
        }
        
        wakeUpTimer = setTimeout(() => {
          setIsVisible(false);
        }, duration);
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('pageshow', handlePageShow);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('pageshow', handlePageShow);
      if (wakeUpTimer) {
        clearTimeout(wakeUpTimer);
      }
    };
  }, [duration, isInitialLoad, onWakeUp]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          <div className="text-center">
            {/* Bigger Logo */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="/assets/images/Sultan_Logo.png"
                alt="Sultan Bakery"
                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain mx-auto"
                style={{
                  filter: 'drop-shadow(0 8px 32px rgba(255, 215, 0, 0.3))'
                }}
              />
            </motion.div>

            {/* Loading Text */}
            <motion.h1
              className="text-2xl md:text-3xl font-bold text-white mb-4"
              style={{ 
                fontFamily: 'Condiment, cursive',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Loading Sultan Bakery...
            </motion.h1>

            {/* Loading Spinner */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="relative w-16 h-16">
                {/* Outer Ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-transparent border-t-white/60 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Middle Ring */}
                <motion.div
                  className="absolute inset-2 border-3 border-transparent border-r-yellow-400 rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Inner Ring */}
                <motion.div
                  className="absolute inset-4 border-2 border-transparent border-b-white/40 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              </div>
            </motion.div>

            {/* Loading Dots */}
            <motion.div
              className="flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-yellow-400 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.4, 1, 0.4]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Alternative simpler version with just a spinner (no text)
export const SimpleWakeUpLoader: React.FC<WakeUpLoaderProps> = ({ duration = 2000, onWakeUp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (isInitialLoad) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsInitialLoad(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad, duration]);

  useEffect(() => {
    let wakeUpTimer: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        setIsVisible(true);
        
        // Refresh menu data when waking up
        if (!isInitialLoad) {
          console.log('WakeUpLoader: Triggering menu refresh');
          if (onWakeUp) onWakeUp();
        }
        
        wakeUpTimer = setTimeout(() => {
          setIsVisible(false);
        }, duration);
      } else {
        if (wakeUpTimer) {
          clearTimeout(wakeUpTimer);
        }
      }
    };

    const handleFocus = () => {
      if (!isInitialLoad) {
        setIsVisible(true);
        
        // Refresh menu data when gaining focus
        console.log('WakeUpLoader: Triggering menu refresh on focus');
        if (onWakeUp) onWakeUp();
        
        wakeUpTimer = setTimeout(() => {
          setIsVisible(false);
        }, duration);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      if (wakeUpTimer) {
        clearTimeout(wakeUpTimer);
      }
    };
  }, [duration, isInitialLoad, onWakeUp]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
