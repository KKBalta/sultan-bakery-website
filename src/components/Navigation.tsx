import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Detect mobile device and reduced motion preference
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show navbar when scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Hide navbar when scrolling down (but not at the very top)
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkDevice);
    };
  }, [lastScrollY]);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/contact', label: 'Contact' }
  ];

  // Optimized styles for mobile vs desktop
  const navStyle = {
    background: isMobile 
      ? `linear-gradient(135deg, rgba(255, 215, 0, 0.08) 0%, rgba(184, 134, 11, 0.04) 50%, rgba(255, 215, 0, 0.08) 100%), ${bakeryConfig.colors.background}`
      : `linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(184, 134, 11, 0.05) 50%, rgba(255, 215, 0, 0.1) 100%), ${bakeryConfig.colors.background}`,
    backdropFilter: isMobile ? 'blur(15px) saturate(150%)' : 'blur(25px) saturate(200%)',
    WebkitBackdropFilter: isMobile ? 'blur(15px) saturate(150%)' : 'blur(25px) saturate(200%)',
    borderBottom: `1px solid ${bakeryConfig.colors.border}`,
    boxShadow: isMobile 
      ? '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      : '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
    borderRadius: '0 0 24px 24px',
    margin: '0 20px',
    paddingTop: 'env(safe-area-inset-top, 0px)'
  };

  return (
    <motion.nav 
      className="fixed top-0 left-0 right-0 z-50"
      style={navStyle}
      initial={reducedMotion ? false : { y: -100, opacity: 0 }}
      animate={{ 
        y: isVisible ? 0 : (reducedMotion ? 0 : -100), 
        opacity: isVisible ? 1 : (reducedMotion ? 1 : 0)
      }}
      transition={reducedMotion ? { duration: 0 } : { 
        duration: isMobile ? 0.2 : 0.3, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-12 md:h-16">
          {/* Mobile: Centered Logo, Desktop: Left Logo */}
          <div className="md:block absolute left-1/2 transform -translate-x-1/2 md:relative md:left-auto md:transform-none">
            <Link to="/" className="flex items-center">
                 <span 
                   className="text-2xl font-bold text-white drop-shadow-lg"
                   style={{ fontFamily: 'Condiment, cursive', marginTop: '7px' }}
                 >
                 {bakeryConfig.name}
               </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={reducedMotion ? false : { opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`px-3 py-1.5 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-500 relative overflow-hidden ${
                    location.pathname === item.path
                      ? 'text-black'
                      : 'text-white hover:text-white'
                  }`}
                  style={{
                    background: location.pathname === item.path 
                      ? 'rgba(0, 0, 0, 0.2)' 
                      : 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                    border: location.pathname === item.path 
                      ? '1px solid rgba(255, 255, 255, 0.4)' 
                      : '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: location.pathname === item.path 
                      ? '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                      : '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    color: location.pathname === item.path ? '#ffffff' : '#ffffff',
                    fontWeight: location.pathname === item.path ? '600' : '500',
                    textShadow: location.pathname === item.path ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
                      layoutId="activeTab"
                      transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.4, delay: 0.6 }}
            >
              <Link
                to="/tablet-menu"
                className="px-3 py-1.5 md:px-5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all duration-500 text-white"
                style={{ 
                  background: bakeryConfig.colors.background,
                  backdropFilter: 'blur(20px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                  border: `1px solid ${bakeryConfig.colors.border}`,
                  boxShadow: `0 12px 40px ${bakeryConfig.colors.shadow}, inset 0 1px 0 ${bakeryConfig.colors.border}`,
                  fontWeight: '500',
                  color: bakeryConfig.colors.textSecondary
                }}
              >
                Tablet Menu
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden ml-auto">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 md:p-3 rounded-full text-white transition-all duration-500"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: isMobile ? 'blur(15px) saturate(150%)' : 'blur(20px) saturate(200%)',
                WebkitBackdropFilter: isMobile ? 'blur(15px) saturate(150%)' : 'blur(20px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}
              whileHover={reducedMotion ? {} : { scale: 1.05 }}
              whileTap={reducedMotion ? {} : { scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-5 w-5 md:h-6 md:w-6" /> : <Menu className="h-5 w-5 md:h-6 md:w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation - Elegant Glassmorphism Design */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.25 : 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.05) 100%)',
            backdropFilter: isMobile ? 'blur(20px) saturate(180%)' : 'blur(25px) saturate(200%)',
            WebkitBackdropFilter: isMobile ? 'blur(20px) saturate(180%)' : 'blur(25px) saturate(200%)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            borderRadius: '0 0 24px 24px'
          }}
        >
          <div className="px-4 py-4">
            {/* Navigation Items - Seamless Design */}
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={reducedMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0,
                    y: isMenuOpen ? 0 : (reducedMotion ? 0 : 10)
                  }}
                  transition={reducedMotion ? { duration: 0 } : { duration: isMobile ? 0.2 : 0.3, delay: index * 0.08 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                      location.pathname === item.path
                        ? 'text-white'
                        : 'text-white/90 hover:text-white'
                    }`}
                    style={{
                      background: location.pathname === item.path 
                        ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(184, 134, 11, 0.1) 100%)' 
                        : 'rgba(255, 255, 255, 0.05)',
                      backdropFilter: isMobile ? 'blur(15px) saturate(180%)' : 'blur(20px) saturate(200%)',
                      WebkitBackdropFilter: isMobile ? 'blur(15px) saturate(180%)' : 'blur(20px) saturate(200%)',
                      border: location.pathname === item.path 
                        ? '1px solid rgba(255, 215, 0, 0.2)' 
                        : '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: location.pathname === item.path 
                        ? '0 8px 24px rgba(255, 215, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)' 
                        : '0 4px 16px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                      fontWeight: location.pathname === item.path ? '600' : '500'
                    }}
                  >
                    {/* Subtle hover effect */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                        opacity: 0
                      }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};