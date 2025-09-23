import React from 'react';
import { Clock, Zap, Scale, AlertTriangle } from 'lucide-react';
import { MenuItem } from '../data/menuData';
import { bakeryConfig } from '../config/bakeryConfig';

interface MenuItemDetailsProps {
  item: MenuItem;
  className?: string;
}

export const MenuItemDetails: React.FC<MenuItemDetailsProps> = ({
  item,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Description */}
      <div>
        <p 
          className="text-sm leading-relaxed opacity-90"
          style={{ 
            color: bakeryConfig.colors.text,
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}
        >
          <span className="font-bold">Details:</span> {item.description}
        </p>
      </div>

      {/* Nutrition & Info Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Calories */}
        {item.calories && (
          <div className="flex items-center space-x-2">
            <Zap className="h-4 w-4" style={{ color: bakeryConfig.primaryColor }} />
            <div>
              <div className="text-xs font-medium opacity-75" style={{ color: bakeryConfig.colors.text }}>
                Calories
              </div>
              <div className="text-sm font-bold" style={{ color: bakeryConfig.colors.text }}>
                {item.calories} cal
              </div>
            </div>
          </div>
        )}

        {/* Scale/Size */}
        {item.scale && (
          <div className="flex items-center space-x-2">
            <Scale className="h-4 w-4" style={{ color: bakeryConfig.primaryColor }} />
            <div>
              <div className="text-xs font-medium opacity-75" style={{ color: bakeryConfig.colors.text }}>
                Size
              </div>
              <div className="text-sm font-bold" style={{ color: bakeryConfig.colors.text }}>
                {item.scale}
              </div>
            </div>
          </div>
        )}

        {/* Prep Time - Only show if available */}
        {item.prepTime && (
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4" style={{ color: bakeryConfig.primaryColor }} />
            <div>
              <div className="text-xs font-medium opacity-75" style={{ color: bakeryConfig.colors.text }}>
                Prep Time
              </div>
              <div className="text-sm font-bold" style={{ color: bakeryConfig.colors.text }}>
                {item.prepTime}
              </div>
            </div>
          </div>
        )}

        {/* Allergens - Only show if available */}
        {item.allergens && item.allergens.length > 0 && (
          <div className="flex items-start space-x-2 col-span-2">
            <AlertTriangle className="h-4 w-4 mt-0.5" style={{ color: '#f59e0b' }} />
            <div>
              <div className="text-xs font-medium opacity-75" style={{ color: bakeryConfig.colors.text }}>
                Allergens
              </div>
              <div className="text-sm" style={{ color: bakeryConfig.colors.text }}>
                {item.allergens.join(', ')}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Badge */}
      <div className="pt-2">
        <span 
          className="text-xs px-3 py-1 rounded-full capitalize"
          style={{ 
            background: bakeryConfig.colors.surface,
            color: bakeryConfig.colors.text,
            border: `1px solid ${bakeryConfig.colors.border}`
          }}
        >
          {item.category === 'coffee' && '☕'} 
          {item.category === 'pastries' && '🥐'} 
          {item.category === 'sandwiches' && '🥪'} 
          {item.category}
        </span>
      </div>
    </div>
  );
};
