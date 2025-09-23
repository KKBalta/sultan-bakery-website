import React from 'react';
import { motion } from 'framer-motion';

interface BandItem {
  text: string;
}

const bandItems: BandItem[] = [
  { text: "Made in NJ" },
  { text: "Baked Fresh Daily" },
  { text: "Shipped Same-Day" },
  { text: "15 Years of Homemade" },
  { text: "Made with Love" },
  { text: "Artisan Coffee" },
  { text: "Fresh Pastries" },
  { text: "Custom Cakes" },
  { text: "Daily Bread" },
  { text: "Master Bakers" },
];

export const ScrollingBand: React.FC = () => {
  return (
    <motion.section 
      className="py-16 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
    >
      {/* Glass morphism background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
        }}
      />
      
      <div className="relative z-10 flex items-center justify-center h-full">
        {/* Scrolling container */}
        <div className="flex overflow-hidden w-full">
          <motion.div
            className="flex items-center"
            animate={{
              x: [0, -100 * bandItems.length]
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {/* First set */}
            {bandItems.map((item, index) => (
              <React.Fragment key={`first-${index}`}>
                <div className="flex items-center justify-center px-12">
                  <span 
                    className="font-bold text-xl whitespace-nowrap"
                    style={{ 
                      color: '#ffffff',
                      fontFamily: 'Condiment, cursive',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {item.text}
                  </span>
                </div>
                {index < bandItems.length - 1 && (
                  <div className="flex items-center justify-center px-6">
                    <span 
                      className="font-bold text-xl"
                      style={{ 
                        color: '#ffffff',
                        fontFamily: 'Condiment, cursive',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      &
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
            
            {/* Second set for seamless loop */}
            {bandItems.map((item, index) => (
              <React.Fragment key={`second-${index}`}>
                <div className="flex items-center justify-center px-12">
                  <span 
                    className="font-bold text-xl whitespace-nowrap"
                    style={{ 
                      color: '#ffffff',
                      fontFamily: 'Condiment, cursive',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {item.text}
                  </span>
                </div>
                {index < bandItems.length - 1 && (
                  <div className="flex items-center justify-center px-6">
                    <span 
                      className="font-bold text-xl"
                      style={{ 
                        color: '#ffffff',
                        fontFamily: 'Condiment, cursive',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      &
                    </span>
                  </div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
