import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ChevronDown } from 'lucide-react';

interface ColorPalette {
  name: string;
  colors: string[];
}

interface BackgroundColorPickerProps {
  onColorChange: (colors: string[]) => void;
  isMobile?: boolean;
}

export const BackgroundColorPicker: React.FC<BackgroundColorPickerProps> = ({ onColorChange, isMobile: propIsMobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(propIsMobile || window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [propIsMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        const target = event.target as Element;
        if (!target.closest('.color-picker-container')) {
          setIsOpen(false);
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const colorPalettes: ColorPalette[] = [
    {
      name: "Original Purple",
      colors: ['#1e1b4b', '#312e81', '#3730a3', '#2d1b69', '#1a0b2e', '#3b0764']
    },
    {
      name: "Soft Dark Brown",
      colors: ['#3c2415', '#4a2c1a', '#5d3a1f', '#6b4226', '#4a2c1a', '#3c2415']
    },
    {
      name: "Gold",
      colors: ['#b8860b', '#daa520', '#ffd700', '#ffed4e', '#daa520', '#b8860b']
    },
    {
      name: "Royal Blue",
      colors: ['#000080', '#4169e1', '#1e3a8a', '#1e40af', '#4169e1', '#000080']
    },
    {
      name: "Dark Navy",
      colors: ['#000033', '#000066', '#000080', '#000099', '#000066', '#000033']
    },
    {
      name: "Royal & Midnight",
      colors: ['#191970', '#4169e1', '#000080', '#4169e1', '#191970', '#000080']
    },
    {
      name: "Dark Seas",
      colors: ['#0D1E27', '#1D2D44', '#3E5C76', '#748CA9', '#1D2D44', '#0D1E27']
    },
    {
      name: "Hazy",
      colors: ['#192524', '#3C5759', '#959D90', '#D1EBDB', '#3C5759', '#192524']
    },
    {
      name: "Warm Brown",
      colors: ['#8b4a3a', '#8b4a3a', '#6b2c1b', '#c58f6d', '#8b4a3a', '#6b2c1b']
    }
  ];

  const handleColorSelect = (colors: string[]) => {
    onColorChange(colors);
    setIsOpen(false);
  };

  return (
    <div className="relative color-picker-container">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 rounded-full text-sm font-medium transition-all duration-500 text-white ${
          isMobile ? 'px-3 py-2' : 'px-4 py-2'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(20px) saturate(200%)',
          WebkitBackdropFilter: 'blur(20px) saturate(200%)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Palette className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
        <span className={isMobile ? 'text-xs' : ''}>Colors</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-full mt-2 z-[60] ${
              isMobile 
                ? 'left-0 right-0 w-full max-w-none' 
                : 'right-0 w-80 max-w-[calc(100vw-2rem)]'
            }`}
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              backdropFilter: 'blur(25px) saturate(200%)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: isMobile ? '0' : '16px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              maxHeight: isMobile ? '50vh' : '70vh'
            }}
          >
            <div className={`${isMobile ? 'p-2' : 'p-4'}`}>
              <h3 className="text-white text-sm font-semibold mb-3 text-center">
                Choose Background Color
              </h3>
              <div className={`grid gap-2 max-h-64 overflow-y-auto ${
                isMobile ? 'grid-cols-2' : 'grid-cols-1'
              }`}>
                {colorPalettes.map((palette, index) => (
                  <motion.button
                    key={palette.name}
                    onClick={() => handleColorSelect(palette.colors)}
                    className={`flex items-center rounded-lg text-left transition-all duration-300 hover:bg-white/10 ${
                      isMobile 
                        ? 'space-x-2 p-2 flex-col space-y-1' 
                        : 'space-x-3 p-3'
                    }`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`flex ${isMobile ? 'space-x-1' : 'space-x-1'}`}>
                      {palette.colors.slice(0, 4).map((color, colorIndex) => (
                        <div
                          key={colorIndex}
                          className={`rounded-full border border-white/20 ${
                            isMobile ? 'w-3 h-3' : 'w-4 h-4'
                          }`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <span className={`text-white font-medium ${
                      isMobile ? 'text-xs text-center' : 'text-sm'
                    }`}>
                      {palette.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
