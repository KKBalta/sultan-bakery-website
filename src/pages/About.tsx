import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#000000' }}>Our Story</h1>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#FFB22C' }}></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <img
              src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
              alt="Bakery interior"
              className="rounded-2xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6" style={{ color: '#000000' }}>
              Crafting Sweet Memories Since 2015
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Sweet Moments began as a dream shared by two passionate bakers who believed that 
              great food brings people together. What started in a small kitchen has grown into 
              a beloved community gathering place.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We're committed to using only the finest ingredients, traditional techniques, and 
              innovative flavors to create pastries, coffee, and meals that make every moment special.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ color: '#000000' }}>Our Values</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>Quality First</h3>
              <p className="text-gray-600 leading-relaxed">
                We source the best ingredients and never compromise on quality, ensuring every bite is exceptional.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>Community Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                We're more than a bakery - we're a place where neighbors become friends and memories are made.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>Sustainable Practices</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe in caring for our environment through responsible sourcing and minimal waste practices.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>Innovation & Tradition</h3>
              <p className="text-gray-600 leading-relaxed">
                We honor classic recipes while constantly creating new flavors and experiences for our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};