import React from 'react';
import { motion } from 'framer-motion';
import { bakeryConfig } from '../config/bakeryConfig';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen -mt-20">
      {/* Single Unified Section - Full Size */}
      <motion.section 
        className="py-24 relative"
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Where Tradition Meets Innovation
            </motion.p>
            
            <motion.div
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: bakeryConfig.primaryColor }}
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Story Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
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
                  src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
                  alt="Bakery interior"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2 
                className="text-4xl font-bold mb-6" 
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
                Crafting Sweet Memories Since 2015
              </motion.h2>
              
              <motion.p 
                className="text-lg leading-relaxed text-white/90" 
                style={{ 
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                {bakeryConfig.name} began as a dream shared by two passionate bakers who believed that 
                great food brings people together. What started in a small kitchen has grown into 
                a beloved community gathering place.
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
                {bakeryConfig.tagline}
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
              {[
                {
                  title: "Quality First",
                  description: "We source the best ingredients and never compromise on quality.",
                  icon: "⭐"
                },
                {
                  title: "Community Focus",
                  description: "We're more than a bakery - we're a place where neighbors become friends.",
                  icon: "🤝"
                },
                {
                  title: "Sustainable Practices",
                  description: "We believe in caring for our environment through responsible sourcing.",
                  icon: "🌱"
                },
                {
                  title: "Innovation & Tradition",
                  description: "We honor classic recipes while creating new flavors and experiences.",
                  icon: "✨"
                }
              ].map((value, index) => (
                <motion.div 
                  key={value.title}
                  className="text-center p-6"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="text-4xl mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    {value.icon}
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