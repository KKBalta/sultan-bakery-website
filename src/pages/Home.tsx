import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Heart, Award } from 'lucide-react';
import { bakeryConfig } from '../config/bakeryConfig';

export const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center" style={{ background: `linear-gradient(to bottom right, ${bakeryConfig.secondaryColor}, ${bakeryConfig.primaryColor})` }}>
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: '#000000' }}>
            {bakeryConfig.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed" style={{ color: '#000000' }}>
            {bakeryConfig.tagline}
          </p>
          <div className="space-y-4 md:space-y-0 md:space-x-4 md:flex md:justify-center">
            <Link
              to="/menu"
              className="inline-block text-white px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ backgroundColor: bakeryConfig.primaryColor, color: '#000000' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              View Menu
            </Link>
            <Link
              to="/tablet-menu"
              className="inline-block bg-white border-2 px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              style={{ color: '#000000', borderColor: bakeryConfig.primaryColor }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = bakeryConfig.primaryColor}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
            >
              Tablet Menu
            </Link>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <img
            src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
            alt="Fresh baked goods"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#000000' }}>
            Why Choose {bakeryConfig.name}?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: bakeryConfig.secondaryColor }}>
                <Clock className="h-10 w-10" style={{ color: bakeryConfig.primaryColor }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Fresh Daily</h3>
              <p className="text-gray-600 leading-relaxed">
                Everything is baked fresh every morning using the finest ingredients and traditional recipes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: bakeryConfig.secondaryColor }}>
                <Heart className="h-10 w-10" style={{ color: bakeryConfig.primaryColor }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Made with Love</h3>
              <p className="text-gray-600 leading-relaxed">
                Our passionate bakers put love and care into every item, creating memorable experiences.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: bakeryConfig.secondaryColor }}>
                <Award className="h-10 w-10" style={{ color: bakeryConfig.primaryColor }} />
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Award Winning</h3>
              <p className="text-gray-600 leading-relaxed">
                Recognized for excellence in taste, quality, and customer service in our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Preview */}
      <section className="py-20" style={{ backgroundColor: bakeryConfig.secondaryColor }}>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16" style={{ color: '#000000' }}>
            Featured Items
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
                alt="Butter Croissant"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>Butter Croissant</h3>
                <p className="text-gray-600 mb-4">Flaky, buttery pastry baked fresh daily</p>
                <div className="font-bold text-lg" style={{ color: bakeryConfig.primaryColor }}>$3.25</div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg"
                alt="Cappuccino"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>Classic Cappuccino</h3>
                <p className="text-gray-600 mb-4">Perfectly steamed milk with our signature espresso</p>
                <div className="font-bold text-lg" style={{ color: bakeryConfig.primaryColor }}>$4.25</div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg"
                alt="Turkey Avocado Club"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>Turkey Avocado Club</h3>
                <p className="text-gray-600 mb-4">Fresh turkey, avocado, bacon on multigrain bread</p>
                <div className="font-bold text-lg" style={{ color: bakeryConfig.primaryColor }}>$9.75</div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/menu"
              className="inline-block text-white px-8 py-4 rounded-full text-lg font-medium transition-colors duration-300 shadow-lg"
              style={{ backgroundColor: bakeryConfig.primaryColor, color: '#000000' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              View Full Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};