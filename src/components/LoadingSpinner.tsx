import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  text?: string;
  showLogo?: boolean;
  variant?: 'glassmorphism' | 'simple' | 'minimal';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'medium',
  text = 'Loading...',
  showLogo = false,
  variant = 'glassmorphism'
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
  }, []);

  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizes = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  if (variant === 'simple') {
    return (
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className={`${sizeClasses[size]} border-4 border-white/20 border-t-white rounded-full animate-spin`} />
        {text && <p className={`${textSizes[size]} text-white/80`}>{text}</p>}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center space-x-2">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" />
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
      </div>
    );
  }

  // Glassmorphism variant (default)
  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      {/* Glassmorphism Container */}
      <motion.div
        className="relative"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: `1px solid ${bakeryConfig.colors.border}`,
          borderRadius: '24px',
          padding: '32px',
          boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo (if enabled) */}
        {showLogo && (
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src="/src/assets/images/Sultan_Logo.png"
              alt="Sultan Bakery"
              className="w-16 h-16 object-contain mx-auto"
              style={{
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
              }}
            />
          </motion.div>
        )}

        {/* Animated Spinner */}
        <motion.div
          className="relative mx-auto"
          style={{ width: sizeClasses[size], height: sizeClasses[size] }}
        >
          {/* Outer Ring */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-white/60 rounded-full"
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Middle Ring */}
          <motion.div
            className="absolute inset-1 border-3 border-transparent border-r-yellow-400 rounded-full"
            animate={reducedMotion ? {} : { rotate: -360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Inner Ring */}
          <motion.div
            className="absolute inset-2 border-2 border-transparent border-b-white/40 rounded-full"
            animate={reducedMotion ? {} : { rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
          />

          {/* Center Dot */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"
            animate={reducedMotion ? {} : {
              scale: [1, 1.5, 1],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Loading Text */}
        {text && (
          <motion.p
            className={`${textSizes[size]} text-white/90 text-center mt-6 font-medium`}
            style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {text}
          </motion.p>
        )}

        {/* Animated Dots */}
        <motion.div
          className="flex justify-center space-x-1 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-white/60 rounded-full"
              animate={reducedMotion ? {} : {
                scale: [1, 1.2, 1],
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
      </motion.div>
    </div>
  );
};

// Full Page Loading Component - Enhanced
export const FullPageLoading: React.FC<{ text?: string }> = ({ text = 'Loading Sultan Bakery...' }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)'
    }}>
      <div className="text-center">
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/src/assets/images/Sultan_Logo.png"
            alt="Sultan Bakery"
            className="w-96 h-96 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] object-contain mx-auto"
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
          {text}
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
    </div>
  );
};

// Inline Loading Component
export const InlineLoading: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center py-8">
      <LoadingSpinner
        size="medium"
        text={text}
        variant="glassmorphism"
      />
    </div>
  );
};

// Button Loading Component
export const ButtonLoading: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <LoadingSpinner size="small" variant="minimal" />
      <span className="text-sm text-white/80">Loading...</span>
    </div>
  );
};
