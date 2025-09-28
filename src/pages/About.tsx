import React, { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';
import { Star, Users, Leaf, Sparkles } from 'lucide-react';

export const About: React.FC = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Performance optimizations
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    // Check for mobile device
    setIsMobile(window.innerWidth < 768);
    
    // Check for low-end devices
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                          (navigator as any).deviceMemory <= 4;
    setReducedMotion(prev => prev || isLowEndDevice);
  }, []);
  
  // Memoize values array to prevent recreation on every render
  const values = useMemo(() => [
    {
      title: "Quality First",
      description: "We source the best ingredients and never compromise on quality.",
      icon: Star
    },
    {
      title: "Community Focus",
      description: "We're more than a bakery - we're a place where neighbors become friends.",
      icon: Users
    },
    {
      title: "Sustainable Practices",
      description: "We believe in caring for our environment through responsible sourcing.",
      icon: Leaf
    },
    {
      title: "Innovation & Tradition",
      description: "We honor classic recipes while creating new flavors and experiences.",
      icon: Sparkles
    }
  ], []);

  return (
    <div className="min-h-screen -mt-20">
      {/* Single Unified Section - Full Size - Optimized for Mobile */}
      <motion.section 
        className="py-24 relative"
        style={{
          background: isMobile ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.05)',
          backdropFilter: isMobile ? 'blur(10px) saturate(120%)' : 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: isMobile ? 'blur(10px) saturate(120%)' : 'blur(20px) saturate(180%)',
        }}
        initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl" 
              style={{ 
                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                fontFamily: 'Condiment, cursive'
              }}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.1 : 0.2 }}
              viewport={{ once: true }}
            >
              Our Story
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 leading-relaxed text-white drop-shadow-lg" 
              style={{ 
                textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
                color: bakeryConfig.colors.text
              }}
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.2 : 0.4 }}
              viewport={{ once: true }}
            >
              Where Tradition Meets Innovation
            </motion.p>
            
            <motion.div
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: bakeryConfig.primaryColor }}
              initial={reducedMotion ? { width: 96 } : { width: 0 }}
              whileInView={{ width: 96 }}
              transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.3 : 0.6 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Story Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Image Section */}
            <motion.div
              className="relative"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.4 : 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={reducedMotion ? {} : { scale: 1.02 }}
                transition={reducedMotion ? {} : { duration: 0.3 }}
              >
                <img
                  src="/src/assets/images/DSC06486.webp"
                  alt="Sultan Bakery showcase"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="space-y-8"
              initial={reducedMotion ? { opacity: 0 } : { opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.1 : 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-bold mb-6" 
                style={{ 
                  color: '#ffffff',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                  fontFamily: 'Condiment, cursive'
                }}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.2 : 0.3 }}
                viewport={{ once: true }}
              >
                Crafting Sweet Memories Since 2015
              </motion.h2>
              
              <motion.p 
                className="text-lg leading-relaxed text-white/90" 
                style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.3 : 0.4 }}
                viewport={{ once: true }}
              >
                {bakeryConfig.name} represents the exciting expansion of our beloved Fresh Bakery Products, 
                originally founded in Paterson, New Jersey. Building on decades of artisanal excellence 
                and community trust, we're proud to bring our time-honored recipes and warm hospitality 
                to new neighborhoods across the state.
              </motion.p>

              <motion.p 
                className="text-lg leading-relaxed text-white/80" 
                style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.4 : 0.5 }}
                viewport={{ once: true }}
              >
                From our flagship location in Paterson to this new chapter, we remain committed to 
                crafting exceptional baked goods using traditional techniques passed down through 
                generations. Every croissant, every loaf of bread, and every custom cake carries 
                the same dedication to quality that made Fresh Bakery Products a New Jersey institution.
              </motion.p>

              <motion.p 
                className="text-lg leading-relaxed text-white/80" 
                style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.4 : 0.8, delay: isMobile ? 0.5 : 0.6 }}
                viewport={{ once: true }}
              >
                As we continue our state-wide expansion, we invite you to experience the authentic 
                taste of New Jersey's finest bakery tradition. Whether you're a longtime customer 
                from Paterson or discovering us for the first time, welcome to the {bakeryConfig.name} family.
              </motion.p>
            </motion.div>
          </div>

          {/* Values Grid */}
          <div className="mb-20">
            <motion.h2 
              className="text-4xl font-bold text-center mb-16" 
              style={{ 
                color: '#ffffff',
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                fontFamily: 'Condiment, cursive'
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Our Values
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div 
                  key={value.title}
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0.05 * (index + 1) : 0.1 * (index + 1) }}
                  viewport={{ once: true }}
                  whileHover={reducedMotion ? {} : { y: -5 }}
                >
                  <motion.div
                    className="flex justify-center mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: isMobile ? 0.3 : 0.5, delay: isMobile ? 0.1 * (index + 1) : 0.2 * (index + 1) }}
                    viewport={{ once: true }}
                    whileHover={reducedMotion ? {} : { scale: 1.2, rotate: 10 }}
                  >
                    <value.icon 
                      className="w-12 h-12 text-yellow-400" 
                      style={{ 
                        filter: 'drop-shadow(0 4px 8px rgba(255, 215, 0, 0.3))'
                      }}
                    />
                  </motion.div>
                  
                  <h3 
                    className="text-lg font-bold mb-3" 
                    style={{ 
                      color: '#ffffff',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {value.title}
                  </h3>
                  
                  <p 
                    className="text-sm leading-relaxed" 
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.9)',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};