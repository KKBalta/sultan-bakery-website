import React from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

interface MeshBackgroundProps {
  className?: string;
  style?: React.CSSProperties;
  opacity?: number;
  speed?: number;
  variant?: 'primary' | 'secondary' | 'hero' | 'sunset' | 'ocean' | 'forest' | 'lavender' | 'warm';
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
      case 'sunset':
        return [
          '#ff6b6b', // Coral Red
          '#ffa726', // Orange
          '#ffeb3b', // Yellow
          '#ff5722', // Deep Orange
          '#e91e63', // Pink
          '#9c27b0'  // Purple
        ];
      case 'ocean':
        return [
          '#006064', // Teal
          '#0097a7', // Light Teal
          '#00bcd4', // Cyan
          '#26c6da', // Light Cyan
          '#4dd0e1', // Very Light Cyan
          '#80deea'  // Pale Cyan
        ];
      case 'forest':
        return [
          '#1b5e20', // Dark Green
          '#2e7d32', // Green
          '#388e3c', // Light Green
          '#4caf50', // Lighter Green
          '#66bb6a', // Very Light Green
          '#81c784'  // Pale Green
        ];
      case 'lavender':
        return [
          '#4a148c', // Deep Purple
          '#6a1b9a', // Purple
          '#8e24aa', // Light Purple
          '#ab47bc', // Lighter Purple
          '#ba68c8', // Very Light Purple
          '#ce93d8'  // Pale Purple
        ];
      case 'warm':
        return [
          '#d84315', // Deep Orange
          '#ff5722', // Orange
          '#ff7043', // Light Orange
          '#ff8a65', // Lighter Orange
          '#ffab91', // Very Light Orange
          '#ffccbc'  // Pale Orange
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
      className={`fixed inset-0 ${className}`}
      style={{ 
        width: '100vw', 
        height: '100vh',
        opacity,
        ...style
      }}
    >
      <MeshGradient
        speed={speed}
        colors={getColors()}
        style={{ 
          width: '100vw', 
          height: '100vh'
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

export const SunsetMeshBackground: React.FC<Omit<MeshBackgroundProps, 'variant'>> = (props) => (
  <MeshBackground {...props} variant="sunset" />
);

export const OceanMeshBackground: React.FC<Omit<MeshBackgroundProps, 'variant'>> = (props) => (
  <MeshBackground {...props} variant="ocean" />
);

export const ForestMeshBackground: React.FC<Omit<MeshBackgroundProps, 'variant'>> = (props) => (
  <MeshBackground {...props} variant="forest" />
);

export const LavenderMeshBackground: React.FC<Omit<MeshBackgroundProps, 'variant'>> = (props) => (
  <MeshBackground {...props} variant="lavender" />
);

export const WarmMeshBackground: React.FC<Omit<MeshBackgroundProps, 'variant'>> = (props) => (
  <MeshBackground {...props} variant="warm" />
);
