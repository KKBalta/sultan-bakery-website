import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';
import { useMenuData } from '../hooks/useMenuData';
import { ScrollingBand } from '../components/ScrollingBand';
import { RealGoogleReviews } from '../components/RealGoogleReviews';
import { Image } from '../components/Image';

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
        
        {/* Mobile Layout - 4 Corner Images */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden lg:hidden">
          
          {/* Floating Particle Background - Optimized */}
          {particleCount > 0 && (
            <div className="absolute inset-0">
              {[...Array(particleCount)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={reducedMotion ? {} : {
                    y: [0, -30, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={reducedMotion ? {} : {
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Top Left Image */}
          <motion.div
            className="absolute top-12 left-2 w-52 h-52 md:top-16 md:left-8 md:w-64 md:h-64 rounded-2xl overflow-hidden opacity-100"
            style={{
              background: bakeryConfig.colors.surface,
              backdropFilter: 'blur(25px) saturate(200%)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%)',
              border: `1px solid ${bakeryConfig.colors.border}`,
              boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
            }}
            initial={reducedMotion ? { opacity: 0, scale: 0.8 } : { opacity: 0, scale: 0.8, rotate: -15 }}
            animate={reducedMotion ? { 
              opacity: 1, 
              scale: 1
            } : { 
              opacity: 1, 
              scale: 1, 
              rotate: [-8, -5, -8]
            }}
            transition={reducedMotion ? { 
              duration: 0.8, 
              delay: 0.3
            } : { 
              duration: 0.8, 
              delay: 0.3,
              rotate: {
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <video
              src="https://res.cloudinary.com/djdp7vvpm/video/upload/v1759248698/laurasanibel_take_one_piece_with_fork_--ar_5191_--video_1_4ff601cf-1d72-4002-b49f-7e255ec6ec7a_0_uddpqa.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Top Right Image */}
          <motion.div
            className="absolute top-12 right-2 w-52 h-52 md:top-16 md:right-8 md:w-64 md:h-64 rounded-2xl overflow-hidden opacity-100"
            style={{
              background: bakeryConfig.colors.surface,
              backdropFilter: 'blur(25px) saturate(200%)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%)',
              border: `1px solid ${bakeryConfig.colors.border}`,
              boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
            }}
            initial={reducedMotion ? { opacity: 0, scale: 0.8 } : { opacity: 0, scale: 0.8, rotate: 15 }}
            animate={reducedMotion ? { 
              opacity: 1, 
              scale: 1
            } : { 
              opacity: 1, 
              scale: 1, 
              rotate: [8, 5, 8]
            }}
            transition={reducedMotion ? { 
              duration: 0.8, 
              delay: 0.4
            } : { 
              duration: 0.8, 
              delay: 0.4,
              rotate: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <img
              src="/src/assets/images/main.webp"
              alt="Main bakery showcase"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom Left Image */}
          <motion.div
            className="absolute bottom-12 left-2 w-52 h-52 md:bottom-16 md:left-8 md:w-64 md:h-64 rounded-2xl overflow-hidden opacity-100"
            style={{
              background: bakeryConfig.colors.surface,
              backdropFilter: 'blur(25px) saturate(200%)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%)',
              border: `1px solid ${bakeryConfig.colors.border}`,
              boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
            }}
            initial={reducedMotion ? { opacity: 0, scale: 0.8 } : { opacity: 0, scale: 0.8, rotate: -10 }}
            animate={reducedMotion ? { 
              opacity: 1, 
              scale: 1
            } : { 
              opacity: 1, 
              scale: 1, 
              rotate: [-6, -3, -6]
            }}
            transition={reducedMotion ? { 
              duration: 0.8, 
              delay: 0.5
            } : { 
              duration: 0.8, 
              delay: 0.5,
              rotate: {
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <video
              src="https://res.cloudinary.com/djdp7vvpm/video/upload/v1759248515/tyler_86524_creamy_spinach_and_marsala_sauce_being_drag_by_a__bd48f50d-2c35-42f9-b3dd-6ebdb7467623_0_kqorsa.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Bottom Right Image */}
          <motion.div
            className="absolute bottom-12 right-2 w-52 h-52 md:bottom-16 md:right-8 md:w-64 md:h-64 rounded-2xl overflow-hidden opacity-100"
            style={{
              background: bakeryConfig.colors.surface,
              backdropFilter: 'blur(25px) saturate(200%)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%)',
              border: `1px solid ${bakeryConfig.colors.border}`,
              boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`
            }}
            initial={reducedMotion ? { opacity: 0, scale: 0.8 } : { opacity: 0, scale: 0.8, rotate: 10 }}
            animate={reducedMotion ? { 
              opacity: 1, 
              scale: 1
            } : { 
              opacity: 1, 
              scale: 1, 
              rotate: [6, 3, 6]
            }}
            transition={reducedMotion ? { 
              duration: 0.8, 
              delay: 0.6
            } : { 
              duration: 0.8, 
              delay: 0.6,
              rotate: {
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <video
              src="https://res.cloudinary.com/djdp7vvpm/video/upload/v1759247913/domates-salatalik_zstele.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>

        </div>

        {/* Desktop Layout - Parallax 3D Gallery */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden" style={{ perspective: '1000px' }}>
          
          {/* Enhanced Floating Particles for Desktop - Optimized */}
          {desktopParticleCount > 0 && (
            <div className="absolute inset-0">
              {[...Array(desktopParticleCount)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={reducedMotion ? {} : {
                    y: [0, -50, 0],
                    opacity: [0.1, 0.9, 0.1],
                    x: [0, Math.random() * 20 - 10, 0],
                  }}
                  transition={reducedMotion ? {} : {
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}

          {/* Layer 1: Background Images (Slowest Parallax) */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 1 }}
            animate={reducedMotion ? {} : {
              y: [0, -20, 0],
              rotateX: [0, 2, 0],
              rotateY: [0, 1, 0],
            }}
            transition={reducedMotion ? {} : {
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Background Image 1 */}
            <motion.div
              className="absolute top-20 left-20 w-64 h-64 rounded-3xl overflow-hidden opacity-100"
              style={{
                background: bakeryConfig.colors.surface,
                backdropFilter: 'blur(15px) saturate(150%)',
                border: `1px solid ${bakeryConfig.colors.border}`,
                boxShadow: `0 8px 32px ${bakeryConfig.colors.shadow}`
              }}
              animate={reducedMotion ? {} : {
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={reducedMotion ? {} : {
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <video
                src="https://res.cloudinary.com/djdp7vvpm/video/upload/v1759248698/laurasanibel_take_one_piece_with_fork_--ar_5191_--video_1_4ff601cf-1d72-4002-b49f-7e255ec6ec7a_0_uddpqa.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Background Image 2 */}
            <motion.div
              className="absolute bottom-20 right-20 w-56 h-56 rounded-3xl overflow-hidden opacity-100"
              style={{
                background: bakeryConfig.colors.surface,
                backdropFilter: 'blur(15px) saturate(150%)',
                border: `1px solid ${bakeryConfig.colors.border}`,
                boxShadow: `0 8px 32px ${bakeryConfig.colors.shadow}`
              }}
              animate={{
                rotate: [0, -3, 0],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            >
              <img
                src="/src/assets/images/DSC06491-optimized.webp"
                alt="Delicious bakery item"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Background Image 3 */}
            <motion.div
              className="absolute top-1/2 right-20 w-48 h-48 rounded-3xl overflow-hidden opacity-100"
              style={{
                background: bakeryConfig.colors.surface,
                backdropFilter: 'blur(15px) saturate(150%)',
                border: `1px solid ${bakeryConfig.colors.border}`,
                boxShadow: `0 8px 32px ${bakeryConfig.colors.shadow}`
              }}
              animate={{
                rotate: [0, 4, 0],
                scale: [1, 1.04, 1],
              }}
              transition={{
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3
              }}
            >
              <video
                src="https://res.cloudinary.com/djdp7vvpm/video/upload/v1759248515/tyler_86524_creamy_spinach_and_marsala_sauce_being_drag_by_a__bd48f50d-2c35-42f9-b3dd-6ebdb7467623_0_kqorsa.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Layer 2: Middle Images (Medium Parallax) */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 2 }}
            animate={{
              y: [0, -30, 0],
              rotateX: [0, 3, 0],
              rotateY: [0, 2, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            {/* Middle Image 1 */}
            <motion.div
              className="absolute top-32 right-32 w-72 h-72 rounded-3xl overflow-hidden opacity-100"
              style={{
                background: bakeryConfig.colors.surface,
                backdropFilter: 'blur(20px) saturate(180%)',
                border: `1px solid ${bakeryConfig.colors.border}`,
                boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
              }}
              animate={{
                rotate: [0, 8, 0],
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 14,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            >
              <img
                src="/src/assets/images/main.webp"
                alt="Main bakery showcase"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Middle Image 2 */}
            <motion.div
              className="absolute bottom-32 left-32 w-60 h-60 rounded-3xl overflow-hidden opacity-100"
              style={{
                background: bakeryConfig.colors.surface,
                backdropFilter: 'blur(20px) saturate(180%)',
                border: `1px solid ${bakeryConfig.colors.border}`,
                boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
              }}
              animate={{
                rotate: [0, -6, 0],
                scale: [1, 1.06, 1],
              }}
              transition={{
                duration: 16,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5
              }}
            >
              <img
                src="https://res.cloudinary.com/djdp7vvpm/image/upload/v1758665186/samples/food/pot-mussels.jpg"
                alt="Delicious pot mussels"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Middle Image 3 */}
            <motion.div
              className="absolute bottom-1/4 left-1/4 w-52 h-52 rounded-3xl overflow-hidden opacity-100"
              style={{
                background: bakeryConfig.colors.surface,
                backdropFilter: 'blur(20px) saturate(180%)',
                border: `1px solid ${bakeryConfig.colors.border}`,
                boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
              }}
              animate={{
                rotate: [0, 7, 0],
                scale: [1, 1.07, 1],
              }}
              transition={{
                duration: 17,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.2
              }}
            >
              <video
                src="https://res.cloudinary.com/djdp7vvpm/video/upload/v1759247913/domates-salatalik_zstele.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Layer 3: Foreground Images (Fastest Parallax) */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 3 }}
            animate={{
              y: [0, -40, 0],
              rotateX: [0, 4, 0],
              rotateY: [0, 3, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            {/* Foreground Image 1 */}
            <motion.div
              className="absolute top-16 left-1/2 transform -translate-x-1/2 w-80 h-80 rounded-3xl overflow-hidden opacity-100"
              style={{
                background: bakeryConfig.colors.surface,
                backdropFilter: 'blur(25px) saturate(200%)',
                border: `2px solid ${bakeryConfig.colors.border}`,
                boxShadow: `0 16px 50px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
              }}
              animate={{
                rotate: [0, 12, 0],
                scale: [1, 1.1, 1],
                rotateX: [0, 5, 0],
                rotateY: [0, 3, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <img
                src="https://res.cloudinary.com/djdp7vvpm/image/upload/v1758665546/DSCF5707_sy4dat.jpg"
                alt="Delicious short ribs with vegetables"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Foreground Image 2 */}
            <motion.div
              className="absolute bottom-16 right-1/3 w-64 h-64 rounded-3xl overflow-hidden opacity-100"
              style={{
                background: bakeryConfig.colors.surface,
                backdropFilter: 'blur(25px) saturate(200%)',
                border: `2px solid ${bakeryConfig.colors.border}`,
                boxShadow: `0 16px 50px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.2)`
              }}
              animate={{
                rotate: [0, -10, 0],
                scale: [1, 1.12, 1],
                rotateX: [0, -4, 0],
                rotateY: [0, -2, 0],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.5
              }}
            >
              <img
                src="/src/assets/images/DSC06486.webp"
                alt="Delicious dessert"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Layer 4: Floating Accent Images */}
          <motion.div
            className="absolute inset-0"
            style={{ zIndex: 4 }}
            animate={{
              y: [0, -50, 0],
              rotateX: [0, 5, 0],
              rotateY: [0, 4, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
          >
            {/* Floating Accent 1 */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-48 h-48 rounded-2xl overflow-hidden opacity-100"
              style={{
                background: bakeryConfig.colors.surface,
                backdropFilter: 'blur(30px) saturate(220%)',
                border: `1px solid ${bakeryConfig.colors.border}`,
                boxShadow: `0 20px 60px ${bakeryConfig.colors.shadow}, inset 0 1px 0 rgba(255, 255, 255, 0.3)`
              }}
              animate={{
                rotate: [0, 15, 0],
                scale: [1, 1.15, 1],
                y: [0, -20, 0],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8
              }}
            >
              <img
                src="/src/assets/images/DSCF5820.jpg"
                alt="Fresh bakery goods"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

        </div>
        
        {/* Content Layer */}
        <div className="text-center max-w-4xl mx-auto px-4 relative z-10 transform lg:-translate-y-8 lg:md:-translate-y-12">
          {/* Animated Logo */}
          <motion.div
            className="flex justify-center lg:mt-3"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <img
                src="/src/assets/images/Sultan_Logo.png"
                alt="Sultan Bakery & Cafe Logo"
                className="w-[32rem] h-[32rem] md:w-[36rem] md:h-[36rem] lg:w-[40rem] lg:h-[40rem] xl:w-[44rem] xl:h-[44rem] 2xl:w-[48rem] 2xl:h-[48rem] object-contain drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.3))',
                }}
              />
              {/* Subtle glow effect - Optimized */}
              {!reducedMotion && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
                    filter: 'blur(20px)',
                  }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </motion.div>
          </motion.div>
          
          {/* Animated Tagline with Gold Accent */}
          <motion.p 
            className="text-xl md:text-2xl leading-relaxed text-white drop-shadow-lg -mt-32" 
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