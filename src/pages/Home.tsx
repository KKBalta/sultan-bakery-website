import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';
import { useMenuData } from '../hooks/useMenuData';
import { ScrollingBand } from '../components/ScrollingBand';
import { RealGoogleReviews } from '../components/RealGoogleReviews';
import { Image } from '../components/Image';

export const Home: React.FC = () => {
  const { menuItems, loading } = useMenuData();
  
  // Get popular items (first 3 popular items)
  const popularItems = menuItems.filter(item => item.popular && item.available).slice(0, 3);
  
  return (
    <div className="-mt-20">
      {/* Hero Section with Enhanced Ottoman-Inspired Effects */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Background with same opacity as other components */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to="/menu"
                className="relative inline-block px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 overflow-hidden group"
                style={{ 
                  background: bakeryConfig.colors.surface,
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
                
                
                {/* Pulsing Glow */}
                <div 
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-500"
                  style={{ 
                    background: `linear-gradient(135deg, ${bakeryConfig.colors.text}, ${bakeryConfig.colors.border})`,
                    animation: 'pulse 2s ease-in-out infinite'
                  }}
                />
                
                {/* Text with Subtle Glow Effect */}
                <span className="relative z-10 group-hover:drop-shadow-lg transition-all duration-300">
                  Explore Our Menu
                </span>
                
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
      </motion.section>

      {/* Where Every Bite Feels Like Home Section */}
      <motion.section 
        className="py-24 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Glass morphism background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Section */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="/src/assets/images/DSCF5820.jpg"
                  alt="Delicious home-style meal"
                  className="w-full h-96 object-cover"
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-8 h-8 rounded-full"
                style={{ backgroundColor: bakeryConfig.primaryColor }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 w-6 h-6 rounded-full"
                style={{ backgroundColor: bakeryConfig.secondaryColor }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{ 
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.h2 
                  className="text-5xl font-bold mb-6" 
                  style={{ 
                    color: '#ffffff',
                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                    fontFamily: 'Condiment, cursive'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  Where Every Bite Feels Like Home
                </motion.h2>
                
                <motion.div
                  className="w-24 h-1 mb-8"
                  style={{ backgroundColor: bakeryConfig.primaryColor }}
                  initial={{ width: 0 }}
                  whileInView={{ width: 96 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </div>

              <motion.p 
                className="text-xl leading-relaxed text-white/90 mb-8" 
                style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Just like your mom used to make, every dish is crafted with love, tradition, and the finest ingredients. 
                We believe that great food isn't just about taste—it's about the memories it creates and the comfort it brings.
              </motion.p>

              <motion.p 
                className="text-lg leading-relaxed text-white/80" 
                style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                From our family recipes passed down through generations to the warm atmosphere that welcomes you in, 
                we're here to make every visit feel like coming home.
              </motion.p>

              {/* Feature highlights */}
              <motion.div 
                className="grid grid-cols-2 gap-6 mt-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: bakeryConfig.primaryColor }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white/90 font-medium">Family Recipes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: bakeryConfig.primaryColor }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <span className="text-white/90 font-medium">Made with Love</span>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: bakeryConfig.primaryColor }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <span className="text-white/90 font-medium">Fresh Daily</span>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: bakeryConfig.primaryColor }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  />
                  <span className="text-white/90 font-medium">Warm Welcome</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Scrolling Band */}
      <ScrollingBand />

      {/* Featured Items Preview */}
      <motion.section 
        className="py-24 relative"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Glass morphism background */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
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
            {loading ? (
              // Loading state
              <>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="rounded-2xl shadow-lg overflow-hidden animate-pulse">
                    <div className="w-full h-48 bg-gray-300"></div>
                    <div className="p-6">
                      <div className="h-6 bg-gray-300 rounded mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded mb-4"></div>
                      <div className="h-5 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </>
            ) : popularItems.length > 0 ? (
              // Dynamic popular items
              popularItems.map((item, index) => (
                <motion.div 
                  key={item.id}
                  className="rounded-2xl shadow-lg overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(25px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
                >
                  <motion.div
                    className="w-full h-48 overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full"
                      fallbackText="Image not available"
                    />
                  </motion.div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2" style={{ 
                      color: '#ffffff',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}>{item.name}</h3>
                    <p className="text-white/90 mb-4" style={{ 
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}>{item.description}</p>
                    <div className="font-bold text-lg" style={{ 
                      color: '#ffffff',
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                    }}>${item.price.toFixed(2)}</div>
                  </div>
                </motion.div>
              ))
            ) : (
              // Fallback if no popular items
              <div className="col-span-3 text-center py-12">
                <p className="text-white/80 text-lg">No featured items available at the moment.</p>
              </div>
            )}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Link
                to="/menu"
                className="relative inline-block px-8 py-4 rounded-full text-lg font-medium transition-all duration-500 overflow-hidden group"
                style={{ 
                  background: bakeryConfig.colors.surface,
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
                  View Full Menu
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Scrolling Band */}
      <ScrollingBand />

      {/* Google Reviews */}
      <RealGoogleReviews 
        placeId={bakeryConfig.googlePlaceId}
        apiKey={bakeryConfig.googleApiKey}
        maxReviews={5}
        showProfilePhotos={true}
        showRatings={true}
        showTimestamps={true}
        maxTextLength={120}
      />
    </div>
  );
};