import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
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
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#000000' }}>Contact Us</h1>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: bakeryConfig.primaryColor }}></div>
          <p className="text-xl text-gray-600">
            We'd love to hear from you! Get in touch with any questions or feedback.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#000000' }}>Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: bakeryConfig.secondaryColor }}>
                  <MapPin className="h-6 w-6" style={{ color: bakeryConfig.primaryColor }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: '#000000' }}>Address</h3>
                  <p className="text-gray-600">
                    {bakeryConfig.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: bakeryConfig.secondaryColor }}>
                  <Phone className="h-6 w-6" style={{ color: bakeryConfig.primaryColor }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: '#000000' }}>Phone</h3>
                  <p className="text-gray-600">{bakeryConfig.phone}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: bakeryConfig.secondaryColor }}>
                  <Mail className="h-6 w-6" style={{ color: bakeryConfig.primaryColor }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: '#000000' }}>Email</h3>
                  <p className="text-gray-600">{bakeryConfig.email}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full" style={{ backgroundColor: bakeryConfig.secondaryColor }}>
                  <Clock className="h-6 w-6" style={{ color: bakeryConfig.primaryColor }} />
                </div>
                <div>
                  <h3 className="font-bold mb-1" style={{ color: '#000000' }}>Hours</h3>
                  <p className="text-gray-600">
                    {bakeryConfig.hours}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>Special Orders</h3>
              <p className="text-gray-600 leading-relaxed">
                Planning a special event? We'd love to create custom cakes, pastries, and catering 
                packages for your celebration. Please call us at least 48 hours in advance for 
                special orders.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6" style={{ color: '#000000' }}>Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-2 transition-colors"
                  style={{ '--tw-ring-color': bakeryConfig.primaryColor } as React.CSSProperties}
                  onFocus={(e) => e.currentTarget.style.borderColor = bakeryConfig.primaryColor}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-2 transition-colors"
                  onFocus={(e) => e.currentTarget.style.borderColor = bakeryConfig.primaryColor}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-2 transition-colors"
                  onFocus={(e) => e.currentTarget.style.borderColor = bakeryConfig.primaryColor}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-2 transition-colors resize-none"
                  onFocus={(e) => e.currentTarget.style.borderColor = bakeryConfig.primaryColor}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#d1d5db'}
                />
              </div>
              
              <button
                type="submit"
                className="w-full text-white py-3 rounded-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-xl"
                style={{ backgroundColor: bakeryConfig.primaryColor, color: '#000000' }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};