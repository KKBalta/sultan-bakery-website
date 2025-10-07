import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';
import { useMenuData } from '../hooks/useMenuData';
import { ScrollingBand } from '../components/ScrollingBand';
import { RealGoogleReviews } from '../components/RealGoogleReviews';
import { Image } from '../components/Image';

// Simple Hero Carousel Component
const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Different content for mobile vs desktop
  const mobileContent = [
    {
      type: 'video',
      src: "https://res.cloudinary.com/djdp7vvpm/video/upload/v1759248698/laurasanibel_take_one_piece_with_fork_--ar_5191_--video_1_4ff601cf-1d72-4002-b49f-7e255ec6ec7a_0_uddpqa.mp4",
      alt: "Fresh food preparation"
    },
    {
      type: 'video',
      src: "https://res.cloudinary.com/djdp7vvpm/video/upload/v1759248515/tyler_86524_creamy_spinach_and_marsala_sauce_being_drag_by_a__bd48f50d-2c35-42f9-b3dd-6ebdb7467623_0_kqorsa.mp4",
      alt: "Creamy spinach and marsala sauce"
    },
    {
      type: 'video',
      src: "https://res.cloudinary.com/djdp7vvpm/video/upload/v1759876714/hamid_massghati_photorealistic_cinematic_5s_video_of_Mini_Mar_a7275d7d-b98f-49f6-92e6-64abfadd1fdd_0_gmsjmg.mp4",
      alt: "Photorealistic cinematic bakery video"
    }
  ];

  const desktopContent = [
    {
      type: 'image',
      src: "/src/assets/images/main.webp",
      alt: "Fresh bakery goods"
    },
    {
      type: 'image',
      src: "/src/assets/images/DSC06491-optimized.webp",
      alt: "Delicious pastries"
    },
    {
      type: 'image',
      src: "/src/assets/images/DSC06486.webp",
      alt: "Artisan bread and desserts"
    },
    {
      type: 'image',
      src: "/src/assets/images/DSCF5820.jpg",
      alt: "Fresh ingredients and bakery items"
    }
  ];

  const content = isMobile ? mobileContent : desktopContent;

  useEffect(() => {
    if (reducedMotion) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 5000); // Change content every 5 seconds

    return () => clearInterval(interval);
  }, [content.length, reducedMotion]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {content[currentIndex].type === 'video' ? (
            <video
              src={content[currentIndex].src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={content[currentIndex].src}
              alt={content[currentIndex].alt}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export const Home: React.FC = () => {
  const { menuItems, loading } = useMenuData();
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
  
  // Memoize expensive calculations
  const popularItems = useMemo(() => 
    menuItems.filter(item => item.popular && item.available).slice(0, 3),
    [menuItems]
  );
  
  // Optimize particle count based on device performance
  const particleCount = useMemo(() => {
    if (reducedMotion) return 0;
    if (isMobile) return 10; // Reduced for mobile
    return 20; // Desktop
  }, [reducedMotion, isMobile]);
  
  const desktopParticleCount = useMemo(() => {
    if (reducedMotion) return 0;
    if (isMobile) return 15; // Reduced for mobile
    return 30; // Desktop
  }, [reducedMotion, isMobile]);
  
  return (
    <div className="-mt-20">
      {/* Minimalistic Hero Section with Carousel */}
      <motion.section 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Background with subtle overlay */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
          }}
        />
        
        {/* Simple Image Carousel */}
            <div className="absolute inset-0">
          <HeroCarousel />
        </div>
        
        {/* Minimalistic Content Layer */}
        <div className="text-center max-w-4xl mx-auto px-4 relative z-10">
          {/* Simple Logo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="/src/assets/images/Sultan_Logo.png"
                alt="Sultan Bakery & Cafe Logo"
              className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                style={{
                filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.5))',
              }}
            />
          </motion.div>
          
          {/* Simple Tagline */}
          <motion.p 
            className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-8" 
            style={{ 
              textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
              fontFamily: 'Merriweather, serif'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {bakeryConfig.tagline}
          </motion.p>
          
          {/* Simple Button */}
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                to="/menu"
              className="inline-block px-8 py-4 rounded-full text-lg font-medium text-white bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300"
                style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                  Explore Our Menu
              </Link>
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
                  src="/src/assets/images/DSC06491-optimized.webp"
                  alt="Delicious home-style meal"
                  className="w-full h-96 object-cover"
                />
                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
              
              {/* Floating decorative elements - Optimized */}
              {!reducedMotion && (
                <>
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
                </>
              )}
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
                    animate={reducedMotion ? {} : { scale: [1, 1.2, 1] }}
                    transition={reducedMotion ? {} : { duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white/90 font-medium">Family Recipes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: bakeryConfig.primaryColor }}
                    animate={reducedMotion ? {} : { scale: [1, 1.2, 1] }}
                    transition={reducedMotion ? {} : { duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <span className="text-white/90 font-medium">Made with Love</span>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: bakeryConfig.primaryColor }}
                    animate={reducedMotion ? {} : { scale: [1, 1.2, 1] }}
                    transition={reducedMotion ? {} : { duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <span className="text-white/90 font-medium">Fresh Daily</span>
                </div>
                <div className="flex items-center space-x-3">
                  <motion.div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: bakeryConfig.primaryColor }}
                    animate={reducedMotion ? {} : { scale: [1, 1.2, 1] }}
                    transition={reducedMotion ? {} : { duration: 2, repeat: Infinity, delay: 1.5 }}
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
                    <p className="text-white/90" style={{ 
                      textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                    }}>{item.description}</p>
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
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.6), rgba(255,255,255,0.8))',
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