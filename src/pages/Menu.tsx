import React, { useState, useMemo } from 'react';
import { useMenuData } from '../hooks/useMenuData';
import { bakeryConfig } from '../config/bakeryConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Heart } from 'lucide-react';
import { Image } from '../components/Image';
import { MenuItemDetails } from '../components/MenuItemDetails';

export const Menu: React.FC = () => {
  const { menuItems, categories, loading, error } = useMenuData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  // Filter and search logic
  const filteredItems = useMemo(() => {
    let filtered = menuItems;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [menuItems, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-2xl" style={{ 
              background: bakeryConfig.colors.background,
              backdropFilter: 'blur(20px) saturate(180%)',
              border: `1px solid ${bakeryConfig.colors.border}`
            }}>
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 mr-3" style={{ borderColor: bakeryConfig.colors.text }}></div>
              <span style={{ color: bakeryConfig.colors.text }}>Loading menu...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-2xl" style={{ 
              background: 'rgba(239, 68, 68, 0.1)',
              backdropFilter: 'blur(20px) saturate(180%)',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <span className="mr-2">⚠️</span>
              <span style={{ color: '#ef4444' }}>{error}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-4"
            style={{ 
              color: bakeryConfig.colors.text,
              fontFamily: 'Condiment, cursive'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Menu
          </motion.h1>
          <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: bakeryConfig.colors.border }}></div>
        </div>

        {/* Search and Filter Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <div 
                className="flex items-center px-4 py-3 rounded-2xl"
                style={{ 
                  background: bakeryConfig.colors.background,
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: `1px solid ${bakeryConfig.colors.border}`
                }}
              >
                <Search className="h-5 w-5 mr-3" style={{ color: bakeryConfig.colors.text }} />
                <input
                  type="text"
                  placeholder="Search menu items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none placeholder-gray-400"
                  style={{ color: bakeryConfig.colors.text }}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="h-4 w-4" style={{ color: bakeryConfig.colors.text }} />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-3 rounded-2xl transition-all duration-300"
              style={{ 
                background: showFilters ? bakeryConfig.colors.surface : bakeryConfig.colors.background,
                backdropFilter: 'blur(20px) saturate(180%)',
                border: `1px solid ${bakeryConfig.colors.border}`
              }}
            >
              <Filter className="h-5 w-5 mr-2" style={{ color: bakeryConfig.colors.text }} />
              <span style={{ color: bakeryConfig.colors.text }}>Filters</span>
            </button>
          </div>

          {/* Category Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 overflow-hidden"
              >
                <div 
                  className="p-4 rounded-2xl"
                  style={{ 
                    background: bakeryConfig.colors.background,
                    backdropFilter: 'blur(20px) saturate(180%)',
                    border: `1px solid ${bakeryConfig.colors.border}`
                  }}
                >
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === 'all' ? 'scale-105' : ''
                      }`}
                      style={{
                        background: selectedCategory === 'all' ? bakeryConfig.colors.surface : 'transparent',
                        color: bakeryConfig.colors.text,
                        border: `1px solid ${bakeryConfig.colors.border}`
                      }}
                    >
                      All Items
                    </button>
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                          selectedCategory === category.id ? 'scale-105' : ''
                        }`}
                        style={{
                          background: selectedCategory === category.id ? bakeryConfig.colors.surface : 'transparent',
                          color: bakeryConfig.colors.text,
                          border: `1px solid ${bakeryConfig.colors.border}`
                        }}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p style={{ color: bakeryConfig.colors.text }}>
            {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} found
          </p>
        </motion.div>

        {/* Menu Items by Category */}
        <div className="space-y-8">
          {categories.map((category) => {
            const categoryItems = filteredItems.filter(item => item.category === category.id);
            
            if (categoryItems.length === 0) return null;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Category Header with Divider */}
                <div className="mb-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{category.icon}</span>
                      <h2 
                        className="text-2xl md:text-3xl font-bold"
                        style={{ 
                          color: bakeryConfig.colors.text,
                          fontFamily: 'Condiment, cursive'
                        }}
                      >
                        {category.name}
                      </h2>
                    </div>
                    <div className="flex-1 h-px" style={{ 
                      background: `linear-gradient(90deg, ${bakeryConfig.colors.border} 0%, transparent 100%)` 
                    }}></div>
                    <span 
                      className="text-sm font-medium px-3 py-1 rounded-full"
                      style={{ 
                        background: bakeryConfig.colors.surface,
                        color: bakeryConfig.colors.text,
                        border: `1px solid ${bakeryConfig.colors.border}`
                      }}
                    >
                      {categoryItems.length} item{categoryItems.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                {/* Category Items */}
                <div className="space-y-3">
                  <AnimatePresence>
                    {categoryItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <div 
                          className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
                          style={{ 
                            background: bakeryConfig.colors.surface,
                            backdropFilter: 'blur(20px) saturate(180%)',
                            border: `1px solid ${bakeryConfig.colors.border}`,
                            boxShadow: `0 4px 20px ${bakeryConfig.colors.shadow}`
                          }}
                          onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                        >
                          {/* Left side - Name and Category */}
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="text-lg font-semibold" style={{ 
                                color: bakeryConfig.colors.text,
                                fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                              }}>
                                {item.name}
                              </h3>
                              {item.popular && (
                                <div className="flex items-center">
                                  <Heart className="h-4 w-4 fill-current text-red-500" />
                                </div>
                              )}
                              {!item.available && (
                                <div className="text-xs px-2 py-1 rounded-full" style={{ 
                                  background: 'rgba(239, 68, 68, 0.2)', 
                                  color: '#ef4444' 
                                }}>
                                  Sold Out
                                </div>
                              )}
                            </div>
                            <div className="text-sm opacity-70 capitalize mt-1" style={{ 
                              color: bakeryConfig.colors.text,
                              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            }}>
                              {item.category}
                            </div>
                          </div>

                          {/* Right side - Price */}
                          <div className="text-right">
                            <span className="text-lg font-semibold tracking-wide" style={{ 
                              color: '#ffffff',
                              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                            }}>
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* New Dropdown Layout - Details Left, Image Right */}
                        <AnimatePresence>
                          {expandedItem === item.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div 
                                className="p-6 mt-2 rounded-2xl"
                                style={{ 
                                  background: bakeryConfig.colors.background,
                                  backdropFilter: 'blur(20px) saturate(180%)',
                                  border: `1px solid ${bakeryConfig.colors.border}`,
                                  boxShadow: `0 4px 20px ${bakeryConfig.colors.shadow}`
                                }}
                              >
                                <div className="grid md:grid-cols-2 gap-6 items-start">
                                  {/* Left Side - Enhanced Details */}
                                  <div className="space-y-4">
                                    <MenuItemDetails item={item} />
                                  </div>

                                  {/* Right Side - Image */}
                                  <div className="relative">
                                    <div className="relative h-64 md:h-72 rounded-xl overflow-hidden">
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full transition-transform duration-300 hover:scale-105"
                                        fallbackText="Image not available"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div 
              className="inline-block px-6 py-4 rounded-2xl"
              style={{ 
                background: bakeryConfig.colors.background,
                backdropFilter: 'blur(20px) saturate(180%)',
                border: `1px solid ${bakeryConfig.colors.border}`
              }}
            >
              <p style={{ color: bakeryConfig.colors.text }}>
                No items found matching your search
              </p>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
};