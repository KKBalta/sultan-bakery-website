import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useMenuData } from '../hooks/useMenuData';
import { bakeryConfig } from '../config/bakeryConfig';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Heart, Star, TrendingUp, Clock, DollarSign, SortAsc, SortDesc, Flame, Ruler, CheckCircle, XCircle, Crown, Utensils, RefreshCw } from 'lucide-react';
import { Image } from '../components/Image';
import { WakeUpLoader } from '../components/WakeUpLoader';

type SortOption = 'popular' | 'price-low' | 'price-high' | 'name' | 'prep-time';

export const TabletMenu: React.FC = () => {
  const { menuItems, categories, loading, error, isRefreshing, lastUpdated, cacheAge, refresh } = useMenuData();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('popular');
  const [showPopularSection, setShowPopularSection] = useState<boolean>(true);
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);
  const [storedScrollPosition, setStoredScrollPosition] = useState<number | null>(null);

  // Debounced search for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);


  // Handle escape key to close zoomed image and preserve scroll position
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomedImage) {
        setZoomedImage(null);
      }
    };

    if (zoomedImage) {
      // Store current scroll position in state
      const scrollY = window.scrollY;
      setStoredScrollPosition(scrollY);
      
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.transition = 'none';
      
      // Disable global smooth scrolling temporarily
      document.documentElement.style.scrollBehavior = 'auto';
    } else {
      // Restore scroll position from state
      
      // Restore body styles immediately
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.transition = '';
      
      if (storedScrollPosition !== null) {
        // Use immediate scroll first
        window.scrollTo(0, storedScrollPosition);
        
        // Clear stored position
        setStoredScrollPosition(null);
        
        // Then restore global smooth scrolling after a delay
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = 'smooth';
        }, 100);
      } else {
        // Restore global smooth scrolling
        document.documentElement.style.scrollBehavior = 'smooth';
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Cleanup on unmount
      document.body.style.overflow = 'unset';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.transition = '';
      document.documentElement.style.scrollBehavior = 'smooth';
    };
  }, [zoomedImage]);

  // Get popular items for featured section
  const popularItems = useMemo(() => {
    return menuItems.filter(item => item.popular && item.available).slice(0, 6);
  }, [menuItems]);

  // Enhanced filter and search logic for 120+ items
  const filteredItems = useMemo(() => {
    let filtered = menuItems;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Enhanced search filter for better performance with 120+ items
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        // Search in ingredients/allergens if available
        (item.ingredients && item.ingredients.some((ingredient: string) => 
          ingredient.toLowerCase().includes(query)
        )) ||
        (item.allergens && item.allergens.some((allergen: string) => 
          allergen.toLowerCase().includes(query)
        ))
      );
    }

    // Smart sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          if (a.popular && !b.popular) return -1;
          if (!a.popular && b.popular) return 1;
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'prep-time':
          const aTime = parseInt(a.prepTime || '0');
          const bTime = parseInt(b.prepTime || '0');
          return aTime - bTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [menuItems, selectedCategory, debouncedSearchQuery, sortBy]);

  // Company Header Component
  const CompanyHeader = () => (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-4">
        <img 
          src="/assets/images/Sultan_Logo.png" 
          alt={bakeryConfig.name}
          className="w-16 h-16 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="text-center">
          <h1 
            className="text-3xl md:text-4xl text-white drop-shadow-lg"
            style={{ 
              fontFamily: 'Merriweather, serif', 
              fontOpticalSizing: 'auto',
              fontWeight: '700',
              fontStyle: 'normal',
              fontVariationSettings: '"wdth" 100',
              lineHeight: '1.2',
              textAlign: 'center'
            }}
          >
            {bakeryConfig.name}
          </h1>
          <p 
            className="text-sm opacity-80"
            style={{ color: bakeryConfig.colors.text }}
          >
            Digital Menu • Fresh Daily • Made with Love
          </p>
          {/* Refresh Status Indicator */}
          <div className="flex items-center justify-center gap-2 mt-2">
            {isRefreshing && (
              <div className="flex items-center gap-1 text-xs opacity-70">
                <RefreshCw className="h-3 w-3 animate-spin" style={{ color: bakeryConfig.colors.text }} />
                <span style={{ color: bakeryConfig.colors.text }}>Updating...</span>
              </div>
            )}
            {lastUpdated && !isRefreshing && (
              <div className="text-xs opacity-50" style={{ color: bakeryConfig.colors.text }}>
                Updated {cacheAge}m ago
              </div>
            )}
          </div>
        </div>
        <div className="w-16 h-16"></div> {/* Spacer to balance the layout */}
      </div>
    </motion.div>
  );

  // Image Zoom Modal Component
  const ImageZoomModal = () => (
    <AnimatePresence mode="wait">
      {zoomedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomedImage(null)}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setZoomedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ 
              duration: 0.25, 
              ease: [0.25, 0.46, 0.45, 0.94],
              opacity: { duration: 0.2 }
            }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute -top-12 right-0 z-10 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/30 transition-all duration-300"
            >
              <X className="h-6 w-6 text-white" />
            </button>
            
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={zoomedImage.src}
                alt={zoomedImage.alt}
                className="w-full h-full max-h-[80vh] object-contain bg-white/5"
                fallbackText="Image not available"
              />
              
              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h3 
                  className="text-xl font-semibold text-white mb-2"
                  style={{ fontFamily: 'Condiment, cursive' }}
                >
                  {zoomedImage.alt}
                </h3>
                <p className="text-white/80 text-sm">
                  Click outside or press ESC to close
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Skip loading screen for tablet menu - show content immediately
  // if (loading) {
  //   return (
  //     <div className="min-h-screen py-8">
  //       <CompanyHeader />
  //       <div className="max-w-7xl mx-auto px-4">
  //         <div className="text-center">
  //           <div className="inline-flex items-center px-6 py-3 rounded-2xl" style={{ 
  //             background: bakeryConfig.colors.background,
  //             backdropFilter: 'blur(20px) saturate(180%)',
  //             border: `1px solid ${bakeryConfig.colors.border}`
  //           }}>
  //             <div className="animate-spin rounded-full h-6 w-6 border-b-2 mr-3" style={{ borderColor: bakeryConfig.colors.text }}></div>
  //             <span style={{ color: bakeryConfig.colors.text }}>Loading menu...</span>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen py-8">
        <CompanyHeader />
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
      <WakeUpLoader duration={2000} onWakeUp={refresh} />
      <CompanyHeader />
      <ImageZoomModal />
      <div className="max-w-7xl mx-auto px-4">

        {/* Popular Items Section */}
        {showPopularSection && popularItems.length > 0 && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6" style={{ color: bakeryConfig.colors.text }} />
                <h2 
                  className="text-2xl text-white drop-shadow-lg"
                  style={{ 
                    fontFamily: 'Merriweather, serif', 
                    fontOpticalSizing: 'auto',
                    fontWeight: '400',
                    fontStyle: 'normal',
                    fontVariationSettings: '"wdth" 100',
                    lineHeight: '1.2'
                  }}
                >
                  Customer Favorites
                </h2>
              </div>
              <button
                onClick={() => setShowPopularSection(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors"
              >
                <X className="h-4 w-4" style={{ color: bakeryConfig.colors.text }} />
              </button>
        </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="relative group cursor-pointer"
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                >
                  <div 
                    className="p-4 rounded-2xl transition-all duration-300 hover:scale-105"
                    style={{ 
                      background: bakeryConfig.colors.surface,
                      backdropFilter: 'blur(20px) saturate(180%)',
                      border: `1px solid ${bakeryConfig.colors.border}`,
                      boxShadow: `0 4px 20px ${bakeryConfig.colors.shadow}`
                    }}
                  >
                    <div 
                      className="relative h-20 w-full rounded-xl overflow-hidden mb-3 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setZoomedImage({ src: item.image, alt: item.name });
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        fallbackText=""
                      />
                      <div className="absolute top-1 right-1">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                      </div>
                      {/* Zoom indicator */}
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                        <div className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold mb-1 truncate" style={{ color: bakeryConfig.colors.text }}>
                      {item.name}
                    </h3>
                    <p className="text-lg font-bold" style={{ color: '#ffffff' }}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Enhanced Search and Filter Bar */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
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
                  placeholder="Search 120+ items..."
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

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="px-4 py-3 rounded-2xl bg-transparent outline-none appearance-none pr-8"
                style={{ 
                  background: bakeryConfig.colors.background,
                  backdropFilter: 'blur(20px) saturate(180%)',
                  border: `1px solid ${bakeryConfig.colors.border}`,
                  color: bakeryConfig.colors.text
                }}
              >
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
                <option value="prep-time">Prep Time</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <SortAsc className="h-4 w-4" style={{ color: bakeryConfig.colors.text }} />
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
              <span style={{ color: bakeryConfig.colors.text }}>Categories</span>
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
                      All Items ({menuItems.length})
                    </button>
                    {categories.map((category) => {
                      const categoryCount = menuItems.filter(item => item.category === category.id).length;
                      return (
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
                          {category.icon} {category.name} ({categoryCount})
                      </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count and Quick Stats */}
        <motion.div 
          className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
          <p style={{ color: bakeryConfig.colors.text }}>
              <span className="font-semibold">{filteredItems.length}</span> item{filteredItems.length !== 1 ? 's' : ''} found
            </p>
            {searchQuery && (
              <span 
                className="text-sm px-2 py-1 rounded-full"
                style={{ 
                  background: bakeryConfig.colors.surface,
                  color: bakeryConfig.colors.text,
                  border: `1px solid ${bakeryConfig.colors.border}`
                }}
              >
                Search: "{searchQuery}"
              </span>
            )}
          </div>
          
          {!showPopularSection && popularItems.length > 0 && (
            <button
              onClick={() => setShowPopularSection(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-full text-sm transition-all duration-300 hover:scale-105"
              style={{ 
                background: bakeryConfig.colors.surface,
                color: bakeryConfig.colors.text,
                border: `1px solid ${bakeryConfig.colors.border}`
              }}
            >
              <TrendingUp className="h-4 w-4" />
              Show Favorites
            </button>
          )}
        </motion.div>

        {/* Menu Items - Optimized Layout for 120+ Items */}
        <div className="space-y-8">
          {selectedCategory === 'all' ? (
            // Show all items in a single optimized list when "All" is selected
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  <div 
                    className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                    style={{ 
                      background: bakeryConfig.colors.surface,
                      backdropFilter: 'blur(20px) saturate(180%)',
                      border: `1px solid ${bakeryConfig.colors.border}`,
                      boxShadow: `0 2px 10px ${bakeryConfig.colors.shadow}`
                    }}
                    onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                  >
                    {/* Left side - Image, Name and Category */}
                    <div className="flex items-center gap-4 flex-1">
                      <div 
                        className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setZoomedImage({ src: item.image, alt: item.name });
                        }}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          fallbackText=""
                        />
                        {item.popular && (
                          <div className="absolute -top-1 -right-1">
                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                          </div>
                        )}
                        {/* Zoom indicator */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold truncate" style={{ 
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
                        <div className="flex items-center gap-2 text-sm opacity-70" style={{ 
                          color: bakeryConfig.colors.text,
                          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                        }}>
                          <span className="capitalize">{item.category}</span>
                          {item.prepTime && (
                            <>
                              <span>•</span>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {item.prepTime}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side - Price */}
                    <div className="text-right flex-shrink-0">
                      <span className="text-lg font-semibold tracking-wide" style={{ 
                        color: '#ffffff',
                        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                      }}>
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Details */}
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
                          className="p-8 mt-2 rounded-2xl"
                          style={{ 
                            background: bakeryConfig.colors.background,
                            backdropFilter: 'blur(20px) saturate(180%)',
                            border: `1px solid ${bakeryConfig.colors.border}`,
                            boxShadow: `0 4px 20px ${bakeryConfig.colors.shadow}`
                          }}
                        >
                          <div className="grid lg:grid-cols-3 gap-8 items-start">
                            {/* Left Side - Enhanced Details (2/3 width) */}
                            <div className="lg:col-span-2 space-y-6">
                              {/* Item Details Section - Optimized Layout */}
                              <div className="space-y-6">
                                {/* Header */}
                                <div>
                                  <h4 
                                    className="text-xl text-white drop-shadow-lg mb-2"
                                    style={{ 
                                      fontFamily: 'Merriweather, serif', 
                                      fontOpticalSizing: 'auto',
                                      fontWeight: '700',
                                      fontStyle: 'normal',
                                      fontVariationSettings: '"wdth" 100',
                                      lineHeight: '1.2'
                                    }}
                                  >
                                    {item.name}
                                  </h4>
                                  {item.prepTime && (
                                    <p className="text-sm opacity-70 flex items-center gap-1" style={{ color: bakeryConfig.colors.text }}>
                                      <Clock className="h-3 w-3" />
                                      {item.prepTime}
                                    </p>
                                  )}
                                </div>
                                
                                {/* Description */}
                                <div>
                                  <p 
                                    className="text-lg leading-relaxed"
                                    style={{ color: bakeryConfig.colors.text }}
                                  >
                                    <span className="font-semibold">Description:</span> {item.description}
                                  </p>
                                </div>

                                {/* Nutritional Info - Enhanced with Better Icons */}
                                <div className="mt-6">
                                  <h5 
                                    className="text-lg font-semibold mb-4"
                                    style={{ color: bakeryConfig.colors.text }}
                                  >
                                    Nutritional Information
                                  </h5>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {item.calories && (
                                      <div 
                                        className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
                                        style={{ 
                                          background: bakeryConfig.colors.surface,
                                          border: `1px solid ${bakeryConfig.colors.border}`
                                        }}
                                      >
                                        <div className="flex items-center justify-center mb-2">
                                          <Flame className="h-6 w-6" style={{ color: '#ff6b35' }} />
                                        </div>
                                        <p className="text-2xl font-bold" style={{ color: bakeryConfig.colors.text }}>
                                          {item.calories}
                                        </p>
                                        <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
                                          Calories
                                        </p>
                                      </div>
                                    )}
                                    {item.scale && (
                                      <div 
                                        className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
                                        style={{ 
                                          background: bakeryConfig.colors.surface,
                                          border: `1px solid ${bakeryConfig.colors.border}`
                                        }}
                                      >
                                        <div className="flex items-center justify-center mb-2">
                                          <Ruler className="h-6 w-6" style={{ color: '#4ade80' }} />
                                        </div>
                                        <p className="text-2xl font-bold" style={{ color: bakeryConfig.colors.text }}>
                                          {item.scale}
                                        </p>
                                        <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
                                          Size
                                        </p>
                                      </div>
                                    )}
                                    <div 
                                      className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
                                      style={{ 
                                        background: bakeryConfig.colors.surface,
                                        border: `1px solid ${bakeryConfig.colors.border}`
                                      }}
                                    >
                                      <div className="flex items-center justify-center mb-2">
                                        {item.available ? (
                                          <CheckCircle className="h-6 w-6" style={{ color: '#22c55e' }} />
                                        ) : (
                                          <XCircle className="h-6 w-6" style={{ color: '#ef4444' }} />
                                        )}
                                      </div>
                                      <p className="text-lg font-bold" style={{ color: bakeryConfig.colors.text }}>
                                        {item.available ? 'Available' : 'Sold Out'}
                                      </p>
                                      <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
                                        Status
                                      </p>
                                    </div>
                                    <div 
                                      className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
                                      style={{ 
                                        background: bakeryConfig.colors.surface,
                                        border: `1px solid ${bakeryConfig.colors.border}`
                                      }}
                                    >
                                      <div className="flex items-center justify-center mb-2">
                                        {item.popular ? (
                                          <Crown className="h-6 w-6" style={{ color: '#fbbf24' }} />
                                        ) : (
                                          <Utensils className="h-6 w-6" style={{ color: bakeryConfig.colors.text }} />
                                        )}
                                      </div>
                                      <p className="text-lg font-bold" style={{ color: bakeryConfig.colors.text }}>
                                        {item.popular ? 'Popular' : 'Regular'}
                                      </p>
                                      <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
                                        Item Type
                                      </p>
                                    </div>
                                  </div>
                                </div>

                              </div>
                            </div>

                            {/* Right Side - Image (1/3 width) */}
                            <div className="relative">
                              <div 
                                className="relative h-80 lg:h-96 rounded-xl overflow-hidden cursor-pointer"
                                onClick={() => setZoomedImage({ src: item.image, alt: item.name })}
                              >
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full transition-transform duration-300 hover:scale-105"
                                  fallbackText="Image not available"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                {/* Zoom indicator */}
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          ) : (
            // Show items by category when a specific category is selected
            categories.map((category) => {
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

                  {/* Category Items - Compact Layout */}
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
                            className="flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.01]"
                          style={{ 
                            background: bakeryConfig.colors.surface,
                            backdropFilter: 'blur(20px) saturate(180%)',
                            border: `1px solid ${bakeryConfig.colors.border}`,
                              boxShadow: `0 2px 10px ${bakeryConfig.colors.shadow}`
                          }}
                          onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                        >
                            {/* Left side - Image, Name and Details */}
                            <div className="flex items-center gap-4 flex-1">
                              <div 
                                className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setZoomedImage({ src: item.image, alt: item.name });
                                }}
                              >
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                  fallbackText=""
                                />
                                {item.popular && (
                                  <div className="absolute -top-1 -right-1">
                                    <Star className="h-3 w-3 fill-current text-yellow-400" />
                                  </div>
                                )}
                                {/* Zoom indicator */}
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                  <div className="p-1 rounded-full bg-white/20 backdrop-blur-sm">
                                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className="text-lg font-semibold truncate" style={{ 
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
                                <div className="flex items-center gap-2 text-sm opacity-70" style={{ 
                              color: bakeryConfig.colors.text,
                              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
                            }}>
                                  {item.prepTime && (
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {item.prepTime}
                                    </div>
                                  )}
                                </div>
                            </div>
                          </div>

                          {/* Right side - Price */}
                            <div className="text-right flex-shrink-0">
                            <span className="text-lg font-semibold tracking-wide" style={{ 
                              color: '#ffffff',
                              fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                            }}>
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                          {/* Expanded Details */}
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
                                  className="p-8 mt-2 rounded-2xl"
                                style={{ 
                                  background: bakeryConfig.colors.background,
                                  backdropFilter: 'blur(20px) saturate(180%)',
                                  border: `1px solid ${bakeryConfig.colors.border}`,
                                  boxShadow: `0 4px 20px ${bakeryConfig.colors.shadow}`
                                }}
                              >
                                  <div className="grid lg:grid-cols-3 gap-8 items-start">
                                    {/* Left Side - Enhanced Details (2/3 width) */}
                                    <div className="lg:col-span-2 space-y-6">
                                      {/* Item Details Section - Optimized Layout */}
                                      <div className="space-y-6">
                                        {/* Header */}
                                        <div>
                                          <h4 
                                            className="text-xl text-white drop-shadow-lg mb-2"
                                            style={{ 
                                              fontFamily: 'Merriweather, serif', 
                                              fontOpticalSizing: 'auto',
                                              fontWeight: '700',
                                              fontStyle: 'normal',
                                              fontVariationSettings: '"wdth" 100',
                                              lineHeight: '1.2'
                                            }}
                                          >
                                            {item.name}
                                          </h4>
                                          {item.prepTime && (
                                            <p className="text-sm opacity-70 flex items-center gap-1" style={{ color: bakeryConfig.colors.text }}>
                                              <Clock className="h-3 w-3" />
                                              {item.prepTime}
                                            </p>
                                          )}
                                        </div>
                                        
                                        {/* Description */}
                                        <div>
                                          <p 
                                            className="text-lg leading-relaxed"
                                            style={{ color: bakeryConfig.colors.text }}
                                          >
                                            <span className="font-semibold">Description:</span> {item.description}
                                          </p>
                                        </div>

                                        {/* Nutritional Info - Enhanced with Better Icons */}
                                        <div className="mt-6">
                                          <h5 
                                            className="text-lg font-semibold mb-4"
                                            style={{ color: bakeryConfig.colors.text }}
                                          >
                                            Nutritional Information
                                          </h5>
                                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {item.calories && (
                                              <div 
                                                className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
                                                style={{ 
                                                  background: bakeryConfig.colors.surface,
                                                  border: `1px solid ${bakeryConfig.colors.border}`
                                                }}
                                              >
                                                <div className="flex items-center justify-center mb-2">
                                                  <Flame className="h-6 w-6" style={{ color: '#ff6b35' }} />
                                                </div>
                                                <p className="text-2xl font-bold" style={{ color: bakeryConfig.colors.text }}>
                                                  {item.calories}
                                                </p>
                                                <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
                                                  Calories
                                                </p>
                                              </div>
                                            )}
                                            {item.scale && (
                                              <div 
                                                className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
                                                style={{ 
                                                  background: bakeryConfig.colors.surface,
                                                  border: `1px solid ${bakeryConfig.colors.border}`
                                                }}
                                              >
                                                <div className="flex items-center justify-center mb-2">
                                                  <Ruler className="h-6 w-6" style={{ color: '#4ade80' }} />
                                                </div>
                                                <p className="text-2xl font-bold" style={{ color: bakeryConfig.colors.text }}>
                                                  {item.scale}
                                                </p>
                                                <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
                                                  Size
                                                </p>
                                              </div>
                                            )}
                                            <div 
                                              className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
                                              style={{ 
                                                background: bakeryConfig.colors.surface,
                                                border: `1px solid ${bakeryConfig.colors.border}`
                                              }}
                                            >
                                              <div className="flex items-center justify-center mb-2">
                                                {item.available ? (
                                                  <CheckCircle className="h-6 w-6" style={{ color: '#22c55e' }} />
                                                ) : (
                                                  <XCircle className="h-6 w-6" style={{ color: '#ef4444' }} />
                                                )}
                                              </div>
                                              <p className="text-lg font-bold" style={{ color: bakeryConfig.colors.text }}>
                                                {item.available ? 'Available' : 'Sold Out'}
                                              </p>
                                              <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
                                                Status
                                              </p>
                                            </div>
                                            <div 
                                              className="p-4 rounded-lg text-center transition-all duration-300 hover:scale-105"
                                              style={{ 
                                                background: bakeryConfig.colors.surface,
                                                border: `1px solid ${bakeryConfig.colors.border}`
                                              }}
                                            >
                                              <div className="flex items-center justify-center mb-2">
                                                {item.popular ? (
                                                  <Crown className="h-6 w-6" style={{ color: '#fbbf24' }} />
                                                ) : (
                                                  <Utensils className="h-6 w-6" style={{ color: bakeryConfig.colors.text }} />
                                                )}
                                              </div>
                                              <p className="text-lg font-bold" style={{ color: bakeryConfig.colors.text }}>
                                                {item.popular ? 'Popular' : 'Regular'}
                                              </p>
                                              <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
                                                Item Type
                                              </p>
                                            </div>
                                          </div>
                                        </div>

                                      </div>
                                  </div>

                                    {/* Right Side - Image (1/3 width) */}
                                  <div className="relative">
                                      <div 
                                        className="relative h-80 lg:h-96 rounded-xl overflow-hidden cursor-pointer"
                                        onClick={() => setZoomedImage({ src: item.image, alt: item.name })}
                                      >
                                      <Image
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full transition-transform duration-300 hover:scale-105"
                                        fallbackText="Image not available"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                      {/* Zoom indicator */}
                                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                                        <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                          </svg>
                                        </div>
                                      </div>
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
            })
          )}
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
              <div className="flex flex-col items-center gap-3">
                <Search className="h-8 w-8 opacity-50" style={{ color: bakeryConfig.colors.text }} />
              <p style={{ color: bakeryConfig.colors.text }}>
                No items found matching your search
              </p>
                <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
                  Try adjusting your filters or search terms
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer for Tablet Menu */}
        <motion.div 
          className="mt-12 pt-8 border-t"
          style={{ borderColor: bakeryConfig.colors.border }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center">
            <p className="text-sm opacity-70" style={{ color: bakeryConfig.colors.text }}>
              {bakeryConfig.name} • Digital Menu • {menuItems.length}+ Items Available
            </p>
            <p className="text-xs opacity-50 mt-2" style={{ color: bakeryConfig.colors.text }}>
              Tap any item for detailed information
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};