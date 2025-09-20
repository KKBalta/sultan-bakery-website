import React from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

interface MeshBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  speed?: number;
  variant?: 'primary' | 'secondary' | 'hero';
}

export const MeshBackground: React.FC<MeshBackgroundProps> = ({
  className = '',
  style = {},
  opacity = 0.3,
  speed = 0.2,
  variant = 'primary'
}) => {
  const getColors = () => {
    switch (variant) {
      case 'primary':
        return [
          '#1a237e', // Deep Indigo (Sultan Ahmed Mosque blue)
          '#3949ab', // Royal Blue
          '#ffc107', // Ottoman Gold
          '#ff8f00', // Warm Gold
          '#d32f2f', // Terracotta Red
          '#8d6e63'  // Warm Brown
        ];
      case 'secondary':
        return [
          '#ffffff', // Cream/White (mosque background)
          '#ffc107', // Gold calligraphy
          '#1a237e', // Deep blue patterns
          '#d32f2f', // Red accents
          '#8d6e63', // Brown details
          '#f5f5dc'  // Light cream
        ];
      case 'hero':
        return [
          '#1a237e', // Deep Indigo
          '#ffc107', // Ottoman Gold
          '#d32f2f', // Terracotta Red
          '#ffffff', // Cream
          '#3949ab', // Royal Blue
          '#ff8f00'  // Warm Gold
        ];
      default:
        return [
          '#1a237e',
          '#3949ab',
          '#ffc107',
          '#ff8f00',
          '#d32f2f',
          '#8d6e63'
        ];
    }
  };

  return (
    <div 
      className={`absolute inset-0 ${className}`}
      style={{ 
        width: '100%', 
        height: '100%',
        opacity,
        ...style
      }}
    >
      <MeshGradient
        speed={speed}
        colors={getColors()}
        style={{ 
          width: '100%', 
          height: '100%'
        }}
      />
    </div>
  );
};

// Pre-configured variants for easy use
export const PrimaryMeshBackground: React.FC<Omit<MeshBackgroundProps, 'variant'>> = (props) => (
  <MeshBackground {...props} variant="primary" />
);

export const SecondaryMeshBackground: React.FC<Omit<MeshBackgroundProps, 'variant'>> = (props) => (
  <MeshBackground {...props} variant="secondary" />
);

export const HeroMeshBackground: React.FC<Omit<MeshBackgroundProps, 'variant'>> = (props) => (
  <MeshBackground {...props} variant="hero" />
);
