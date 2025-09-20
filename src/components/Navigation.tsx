import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <motion.nav 
      className="sticky top-0 z-50"
      style={{ 
        background: 'rgba(0, 0, 0, 0.15)',
        backdropFilter: 'blur(25px) saturate(200%)',
        WebkitBackdropFilter: 'blur(25px) saturate(200%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
        borderRadius: '0 0 24px 24px',
        marginTop: '12px'
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Animated Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-2 rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
              >
                <Coffee className="h-6 w-6 text-white" />
              </motion.div>
              <span 
                className="text-2xl font-bold text-white"
                style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)' }}
              >
                {bakeryConfig.name}
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`px-5 py-3 rounded-full text-sm font-medium transition-all duration-500 relative overflow-hidden ${
                    location.pathname === item.path
                      ? 'text-black'
                      : 'text-white hover:text-white'
                  }`}
                  style={{
                    background: location.pathname === item.path 
                      ? 'rgba(255, 255, 255, 0.35)' 
                      : 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                    border: location.pathname === item.path 
                      ? '1px solid rgba(255, 255, 255, 0.4)' 
                      : '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: location.pathname === item.path 
                      ? '0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                      : '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    color: location.pathname === item.path ? '#000000' : '#ffffff',
                    fontWeight: location.pathname === item.path ? '600' : '500',
                    textShadow: location.pathname === item.path ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {location.pathname === item.path && (
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: 'rgba(255, 193, 7, 0.2)' }}
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Link
                to="/tablet-menu"
                className="px-5 py-3 rounded-full text-sm font-medium transition-all duration-500 text-white"
                style={{ 
                  background: 'rgba(255, 107, 107, 0.25)',
                  backdropFilter: 'blur(20px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                  border: '1px solid rgba(255, 107, 107, 0.35)',
                  boxShadow: '0 12px 40px rgba(255, 107, 107, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  fontWeight: '500',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                Tablet Menu
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-full text-white transition-all duration-500"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(20px) saturate(200%)',
                WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className="md:hidden"
          initial={false}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            background: 'rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(25px) saturate(200%)',
            WebkitBackdropFilter: 'blur(25px) saturate(200%)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.15)',
            overflow: 'hidden',
            borderRadius: '0 0 24px 24px'
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : -20
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-500 ${
                    location.pathname === item.path
                      ? 'text-black'
                      : 'text-white hover:text-white'
                  }`}
                  style={{
                    background: location.pathname === item.path 
                      ? 'rgba(255, 255, 255, 0.35)' 
                      : 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(20px) saturate(200%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                    border: location.pathname === item.path 
                      ? '1px solid rgba(255, 255, 255, 0.4)' 
                      : '1px solid rgba(255, 255, 255, 0.25)',
                    boxShadow: location.pathname === item.path 
                      ? '0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)' 
                      : '0 4px 16px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                    fontWeight: location.pathname === item.path ? '600' : '500',
                    textShadow: location.pathname === item.path ? 'none' : '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ 
                opacity: isMenuOpen ? 1 : 0,
                x: isMenuOpen ? 0 : -20
              }}
              transition={{ duration: 0.3, delay: 0.6 }}
            >
              <Link
                to="/tablet-menu"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white px-4 py-3 rounded-lg text-base font-medium transition-all duration-500"
                style={{ 
                  background: 'rgba(255, 107, 107, 0.25)',
                  backdropFilter: 'blur(20px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(200%)',
                  border: '1px solid rgba(255, 107, 107, 0.35)',
                  boxShadow: '0 8px 24px rgba(255, 107, 107, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                  fontWeight: '500',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                Tablet Menu
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};