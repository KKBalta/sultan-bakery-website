import React from 'react';
import { getInitials, getGradientColor, getProxyImageUrl } from '../utils/imageUtils';

interface AvatarProps {
  name: string;
  profilePhotoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  name, 
  profilePhotoUrl, 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base'
  };

  const initials = getInitials(name);
  const gradient = getGradientColor(name);
  const proxyUrl = profilePhotoUrl ? getProxyImageUrl(profilePhotoUrl) : null;

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = event.target as HTMLImageElement;
    const parent = target.parentElement;
    
    if (parent) {
      parent.innerHTML = `
        <div class="w-full h-full flex items-center justify-center text-white font-bold ${sizeClasses[size].split(' ')[1]}" 
             style="background: ${gradient};">
          ${initials}
        </div>
      `;
    }
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-300 flex items-center justify-center ${className}`}>
      {proxyUrl ? (
        <img
          src={proxyUrl}
          alt={name}
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <div 
          className="w-full h-full flex items-center justify-center text-white font-bold"
          style={{ background: gradient }}
        >
          {initials}
        </div>
      )}
    </div>
  );
};
