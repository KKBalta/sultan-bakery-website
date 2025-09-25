import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Navigation } from 'lucide-react';
import { bakeryConfig } from '../config/bakeryConfig';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen -mt-20">
      {/* Hero Section */}
      <motion.section 
        className="relative py-24"
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
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
              Contact Us
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
              Visit Us or Get in Touch
            </motion.p>
            
            <motion.div
              className="w-24 h-1 mx-auto"
              style={{ backgroundColor: '#ffd700' }}
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            />
          </div>

          {/* Google Maps Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3017.1234567890!2d-74.2378401!3d40.9248702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c303006f0ce46d%3A0x54928a98d787ab1c!2sSultan%20Bakery%20%26%20Cafe!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sultan Bakery & Cafe Location"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </motion.div>

          {/* Contact Information and Form */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-8 text-white" 
                style={{ 
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                  fontFamily: 'Condiment, cursive'
                }}
              >
                Visit Our Bakery
              </h2>
              
              <div className="space-y-8">
                <motion.div 
                  className="flex items-start space-x-4 p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 rounded-full bg-yellow-400/20">
                    <MapPin className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-white text-lg">Address</h3>
                    <p className="text-white/90 leading-relaxed">
                      {bakeryConfig.address}
                    </p>
                    <a 
                      href="https://www.google.com/maps/place/Sultan+Bakery+%26+Cafe/@40.9248702,-74.2378401,17z/data=!3m1!4b1!4m6!3m5!1s0x89c303006f0ce46d:0x54928a98d787ab1c!8m2!3d40.9248662!4d-74.2352652!16s%2Fg%2F11xdr5gfdp?entry=ttu&g_ep=EgoyMDI1MDkyMi4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                    >
                      <Navigation className="h-4 w-4 mr-1" />
                      Get Directions
                    </a>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 rounded-full bg-yellow-400/20">
                    <Phone className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-white text-lg">Phone</h3>
                    <p className="text-white/90">{bakeryConfig.phone}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 rounded-full bg-yellow-400/20">
                    <Mail className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-white text-lg">Email</h3>
                    <p className="text-white/90">{bakeryConfig.email}</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-start space-x-4 p-6 rounded-2xl"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(20px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="p-3 rounded-full bg-yellow-400/20">
                    <Clock className="h-6 w-6 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2 text-white text-lg">Hours</h3>
                    <p className="text-white/90 leading-relaxed">
                      {bakeryConfig.hours}
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div 
                className="mt-12 p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 215, 0, 0.1)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold mb-4 text-white">Special Orders</h3>
                <p className="text-white/90 leading-relaxed">
                  Planning a special event? We'd love to create custom cakes, pastries, and catering 
                  packages for your celebration. Please call us at least 48 hours in advance for 
                  special orders.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="p-8 rounded-3xl"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(25px) saturate(200%)',
                WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
              }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold mb-8 text-white" 
                style={{ 
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
                  fontFamily: 'Condiment, cursive'
                }}
              >
                Send us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#ffd700';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#ffd700';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#ffd700';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    placeholder="(555) 123-4567"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg transition-all duration-300 resize-none"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      backdropFilter: 'blur(10px)'
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#ffd700';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    }}
                    placeholder="Tell us about your special order or any questions..."
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2"
                  style={{ 
                    background: 'linear-gradient(135deg, #ffd700 0%, #b8860b 100%)',
                    color: '#000000',
                    boxShadow: '0 8px 24px rgba(255, 215, 0, 0.3)'
                  }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};