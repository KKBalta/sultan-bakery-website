import React, { useState } from 'react';
import { categories } from '../data/menuData';
import { useMenuData } from '../hooks/useMenuData';

export const Menu: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { menuItems, loading, error, refresh } = useMenuData();

  const filteredItems = selectedCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6" style={{ color: '#000000' }}>Our Menu</h1>
          <div className="w-24 h-1 mx-auto" style={{ backgroundColor: '#FFB22C' }}></div>
          
          {/* Loading and Error States */}
          {loading && (
            <div className="mt-8">
              <div className="inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                Loading menu from Google Sheets...
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-8">
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-800 rounded-lg">
                <span className="mr-2">⚠️</span>
                {error}
                <button 
                  onClick={refresh}
                  className="ml-2 underline hover:no-underline"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'text-black'
                  : 'text-gray-700'
              }`}
              style={selectedCategory === 'all' ? { backgroundColor: '#FFB22C', color: '#000000' } : {}}
              onMouseEnter={(e) => {
                if (selectedCategory !== 'all') {
                  e.currentTarget.style.backgroundColor = '#F7F7F7';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== 'all') {
                  e.currentTarget.style.backgroundColor = '';
                }
              }}
            >
              All Items
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'text-black'
                    : 'text-gray-700'
                }`}
                style={selectedCategory === category.id ? { backgroundColor: '#FFB22C', color: '#000000' } : {}}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = '#F7F7F7';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = '';
                  }
                }}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                !item.available ? 'opacity-60' : ''
              }`}
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                {item.popular && (
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: '#FFB22C', color: '#000000' }}>
                    Popular
                  </div>
                )}
                {!item.available && (
                  <div className="absolute top-4 right-4 bg-gray-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Unavailable
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#000000' }}>{item.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold" style={{ color: '#FFB22C' }}>
                    ${item.price.toFixed(2)}
                  </span>
                  <div className="text-sm text-gray-500 capitalize">
                    {item.category}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};