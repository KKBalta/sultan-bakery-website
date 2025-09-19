import React, { useState } from 'react';
import { ArrowLeft, Coffee, Heart, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categories } from '../data/menuData';
import { useMenuData } from '../hooks/useMenuData';
import { bakeryConfig } from '../config/bakeryConfig';

export const TabletMenu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('coffee');
  const { menuItems, loading, error, refresh } = useMenuData();

  const filteredItems = menuItems.filter((item: any) => item.category === selectedCategory);

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(to bottom right, ${bakeryConfig.secondaryColor}, ${bakeryConfig.primaryColor})` }}>
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="p-3 rounded-full transition-colors"
                style={{ backgroundColor: bakeryConfig.secondaryColor }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = bakeryConfig.primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = bakeryConfig.secondaryColor}
              >
                <ArrowLeft className="h-6 w-6" style={{ color: '#000000' }} />
              </Link>
              <div className="flex items-center space-x-3">
                <Coffee className="h-10 w-10" style={{ color: bakeryConfig.primaryColor }} />
                <h1 className="text-3xl font-bold" style={{ color: '#000000' }}>{bakeryConfig.name} Menu</h1>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg text-gray-600">Touch to explore our delicious offerings</p>
              <p className="text-sm text-gray-500">Prices include tax</p>
              {loading && (
                <div className="flex items-center justify-end mt-2">
                  <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                  <span className="text-sm text-gray-500">Updating menu...</span>
                </div>
              )}
              {error && (
                <button 
                  onClick={refresh}
                  className="flex items-center justify-end mt-2 text-sm text-red-600 hover:text-red-800"
                >
                  <RefreshCw className="h-4 w-4 mr-1" />
                  Retry
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm shadow-sm z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex justify-center space-x-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-8 py-4 rounded-2xl font-bold text-xl transition-all duration-300 shadow-lg ${
                  selectedCategory === category.id
                    ? 'text-black shadow-xl scale-105'
                    : 'bg-white text-black hover:scale-102'
                }`}
                style={selectedCategory === category.id ? { backgroundColor: '#FFB22C', color: '#000000' } : { color: '#000000' }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = '#F7F7F7';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                <span className="text-2xl mr-3">{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item: any) => (
            <div
              key={item.id}
              className={`bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                !item.available ? 'opacity-50' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4 flex space-x-2">
                  {item.popular && (
                    <div className="px-4 py-2 rounded-full text-sm font-bold flex items-center shadow-lg" style={{ backgroundColor: '#FFB22C', color: '#000000' }}>
                      <Heart className="h-4 w-4 mr-1 fill-current" />
                      Popular
                    </div>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                    item.available
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }`}>
                    {item.available ? 'Available' : 'Sold Out'}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 leading-tight" style={{ color: '#000000' }}>
                  {item.name}
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-4 min-h-[3rem]">
                  {item.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold" style={{ color: '#FFB22C' }}>
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="text-lg text-gray-500 capitalize font-medium bg-gray-100 px-3 py-1 rounded-full">
                    {item.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🍽️</div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#000000' }}>
              No items available in this category
            </h2>
            <p className="text-xl text-gray-600">
              Please check back later or try another category
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-white mt-16">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>
              Questions about our menu?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our friendly staff is here to help you make the perfect choice
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <h3 className="font-bold mb-2 text-lg" style={{ color: '#000000' }}>Location</h3>
                <p className="text-gray-600">{bakeryConfig.address}</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2 text-lg" style={{ color: '#000000' }}>Hours</h3>
                <p className="text-gray-600">{bakeryConfig.hours}</p>
              </div>
              <div className="text-center">
                <h3 className="font-bold mb-2 text-lg" style={{ color: '#000000' }}>Phone</h3>
                <p className="text-gray-600 text-xl font-medium">{bakeryConfig.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};