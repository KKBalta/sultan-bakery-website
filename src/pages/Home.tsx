import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';

export const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section with Enhanced Ottoman-Inspired Effects */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Glass morphism background - bright like bottom sections */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: bakeryConfig.colors.background,
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderBottom: `1px solid ${bakeryConfig.colors.border}`
          }}
        />
        
        {/* Content Layer */}
        <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
          {/* Animated Title with Ottoman Typography Feel */}
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl" 
            style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              fontFamily: 'Condiment, cursive'
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {bakeryConfig.name}
          </motion.h1>
          
          {/* Animated Tagline with Gold Accent */}
          <motion.p 
            className="text-xl md:text-2xl mb-8 leading-relaxed text-white drop-shadow-lg" 
            style={{ 
              textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
              color: bakeryConfig.colors.text
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {bakeryConfig.tagline}
          </motion.p>
          
          {/* Animated Button with Ottoman Styling */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to="/menu"
                className="relative inline-block px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 overflow-hidden group"
                style={{ 
                  background: bakeryConfig.colors.surface,
                  backdropFilter: 'blur(25px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                  border: `2px solid ${bakeryConfig.colors.border}`,
                  boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`,
                  color: bakeryConfig.colors.text,
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                {/* Animated Background Gradient */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                  style={{ 
                    background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)',
                    backgroundSize: '300% 300%',
                    animation: 'gradientShift 3s ease infinite'
                  }}
                />
                
                {/* Shimmer Effect */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ 
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
                    transform: 'translateX(-100%)',
                    animation: 'shimmer 2s ease-in-out infinite'
                  }}
                />
                
                {/* Pulsing Glow */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${bakeryConfig.colors.text}, ${bakeryConfig.colors.border})`,
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                />
                
                {/* Text with Glow Effect */}
                <span className="relative z-10 group-hover:drop-shadow-lg transition-all duration-300">
                  Explore Our Menu
                </span>
                
                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                      style={{
                        background: '#ffffff',
                        left: `${20 + i * 15}%`,
                        top: `${30 + (i % 2) * 40}%`,
                        animation: `float 3s ease-in-out infinite ${i * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        {/* Glass morphism background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16" 
            style={{ 
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Why Choose {bakeryConfig.name}?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" 
                style={{ backgroundColor: bakeryConfig.secondaryColor }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Clock className="h-10 w-10" style={{ color: bakeryConfig.primaryColor }} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4" style={{ 
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}>Fresh Daily</h3>
              <p className="text-white/90 leading-relaxed" style={{ 
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}>
                Everything is baked fresh every morning using the finest ingredients and traditional recipes.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" 
                style={{ backgroundColor: bakeryConfig.secondaryColor }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Heart className="h-10 w-10" style={{ color: bakeryConfig.primaryColor }} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4" style={{ 
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}>Made with Love</h3>
              <p className="text-white/90 leading-relaxed" style={{ 
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}>
                Our passionate bakers put love and care into every item, creating memorable experiences.
              </p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <motion.div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" 
                style={{ backgroundColor: bakeryConfig.secondaryColor }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Award className="h-10 w-10" style={{ color: bakeryConfig.primaryColor }} />
              </motion.div>
              <h3 className="text-2xl font-bold mb-4" style={{ 
                color: '#ffffff',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}>Award Winning</h3>
              <p className="text-white/90 leading-relaxed" style={{ 
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}>
                Recognized for excellence in taste, quality, and customer service in our community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Items Preview */}
      <section className="py-20 relative">
        {/* Glass morphism background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.h2 
            className="text-4xl font-bold text-center mb-16" 
            style={{ 
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Items
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="rounded-2xl shadow-lg overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
            >
              <motion.img
                src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
                alt="Butter Croissant"
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ 
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}>Butter Croissant</h3>
                <p className="text-white/90 mb-4" style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}>Flaky, buttery pastry baked fresh daily</p>
                <div className="font-bold text-lg" style={{ 
                  color: '#000000',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'
                }}>$3.25</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-2xl shadow-lg overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
            >
              <motion.img
                src="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg"
                alt="Cappuccino"
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ 
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}>Classic Cappuccino</h3>
                <p className="text-white/90 mb-4" style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}>Perfectly steamed milk with our signature espresso</p>
                <div className="font-bold text-lg" style={{ 
                  color: '#000000',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'
                }}>$4.25</div>
              </div>
            </motion.div>
            
            <motion.div 
              className="rounded-2xl shadow-lg overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
            >
              <motion.img
                src="https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg"
                alt="Turkey Avocado Club"
                className="w-full h-48 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ 
                  color: '#ffffff',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}>Turkey Avocado Club</h3>
                <p className="text-white/90 mb-4" style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}>Fresh turkey, avocado, bacon on multigrain bread</p>
                <div className="font-bold text-lg" style={{ 
                  color: '#000000',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)'
                }}>$9.75</div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to="/menu"
                className="inline-block text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg"
                style={{ backgroundColor: bakeryConfig.primaryColor, color: '#000000' }}
              >
                View Full Menu
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};