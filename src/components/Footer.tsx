import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Mail, Heart } from 'lucide-react';
import { bakeryConfig } from '../config/bakeryConfig';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Handle location click - redirect to Google Maps
  const handleLocationClick = () => {
    const encodedAddress = encodeURIComponent(bakeryConfig.address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  // Handle phone click - redirect to phone app
  const handlePhoneClick = () => {
    const phoneNumber = bakeryConfig.phone.replace(/\D/g, ''); // Remove non-digits
    const phoneUrl = `tel:${phoneNumber}`;
    window.location.href = phoneUrl;
  };

  // Handle email click - redirect to email client
  const handleEmailClick = () => {
    const emailUrl = `mailto:${bakeryConfig.email}`;
    window.location.href = emailUrl;
  };

  return (
    <footer className="relative">
      {/* Glassmorphism Background */}
      <div 
        className="absolute inset-0"
        style={{
          background: bakeryConfig.colors.surface,
          backdropFilter: 'blur(25px) saturate(200%)',
          WebkitBackdropFilter: 'blur(25px) saturate(200%)',
          borderTop: `1px solid ${bakeryConfig.colors.border}`,
          boxShadow: `0 -8px 32px ${bakeryConfig.colors.shadow}`
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ 
                color: bakeryConfig.colors.text,
                fontFamily: 'Condiment, cursive'
              }}
            >
              {bakeryConfig.name}
            </h3>
            <p 
              className="text-sm leading-relaxed mb-6 opacity-80"
              style={{ color: bakeryConfig.colors.text }}
            >
              {bakeryConfig.tagline}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={handleLocationClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <MapPin className="h-4 w-4 transition-colors duration-300 group-hover:text-yellow-400" style={{ color: bakeryConfig.colors.text }} />
                <span 
                  className="text-sm transition-colors duration-300 group-hover:text-yellow-400"
                  style={{ color: bakeryConfig.colors.text }}
                >
                  {bakeryConfig.address}
                </span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={handlePhoneClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="h-4 w-4 transition-colors duration-300 group-hover:text-yellow-400" style={{ color: bakeryConfig.colors.text }} />
                <span 
                  className="text-sm transition-colors duration-300 group-hover:text-yellow-400"
                  style={{ color: bakeryConfig.colors.text }}
                >
                  {bakeryConfig.phone}
                </span>
              </motion.div>
              
              <motion.div 
                className="flex items-center space-x-3 cursor-pointer group"
                onClick={handleEmailClick}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Mail className="h-4 w-4 transition-colors duration-300 group-hover:text-yellow-400" style={{ color: bakeryConfig.colors.text }} />
                <span 
                  className="text-sm transition-colors duration-300 group-hover:text-yellow-400"
                  style={{ color: bakeryConfig.colors.text }}
                >
                  {bakeryConfig.email}
                </span>
              </motion.div>
              
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4" style={{ color: bakeryConfig.colors.text }} />
                <span 
                  className="text-sm"
                  style={{ color: bakeryConfig.colors.text }}
                >
                  {bakeryConfig.hours}
                </span>
              </div>
            </div>
          </motion.div>


          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 
              className="text-lg font-semibold mb-4"
              style={{ color: bakeryConfig.colors.text }}
            >
              Our Services
            </h4>
            <ul className="space-y-2">
              <li>
                <span 
                  className="text-sm"
                  style={{ color: bakeryConfig.colors.text }}
                >
                  Fresh Daily Pastries
                </span>
              </li>
              <li>
                <span 
                  className="text-sm"
                  style={{ color: bakeryConfig.colors.text }}
                >
                  Artisan Coffee
                </span>
              </li>
              <li>
                <span 
                  className="text-sm"
                  style={{ color: bakeryConfig.colors.text }}
                >
                  Custom Cakes
                </span>
              </li>
              <li>
                <span 
                  className="text-sm"
                  style={{ color: bakeryConfig.colors.text }}
                >
                  Catering Services
                </span>
              </li>
              <li>
                <span 
                  className="text-sm"
                  style={{ color: bakeryConfig.colors.text }}
                >
                  Online Ordering
                </span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t"
          style={{ borderColor: bakeryConfig.colors.border }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span 
                className="text-sm"
                style={{ color: bakeryConfig.colors.text }}
              >
                © {currentYear} {bakeryConfig.name}. Made with
              </span>
              <Heart className="h-4 w-4 fill-current text-red-500" />
              <span 
                className="text-sm"
                style={{ color: bakeryConfig.colors.text }}
              >
                for our community.
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link
                to="/tablet-menu"
                className="text-sm transition-colors duration-300 hover:opacity-80"
                style={{ color: bakeryConfig.colors.text }}
              >
                Tablet Menu
              </Link>
              <span 
                className="text-sm opacity-60"
                style={{ color: bakeryConfig.colors.text }}
              >
                Privacy Policy
              </span>
              <span 
                className="text-sm opacity-60"
                style={{ color: bakeryConfig.colors.text }}
              >
                Terms of Service
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};
