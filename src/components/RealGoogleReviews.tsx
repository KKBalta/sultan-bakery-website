import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { bakeryConfig } from '../config/bakeryConfig';
import { googleReviewsProxy } from '../services/googleReviewsProxy';
import { Avatar } from './Avatar';

interface GoogleReview {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface RealGoogleReviewsProps {
  placeId?: string;
  apiKey?: string;
  maxReviews?: number;
  showProfilePhotos?: boolean;
  showRatings?: boolean;
  showTimestamps?: boolean;
  maxTextLength?: number;
}

export const RealGoogleReviews: React.FC<RealGoogleReviewsProps> = ({
  placeId,
  apiKey,
  maxReviews = 15,
  showProfilePhotos = true,
  showRatings = true,
  showTimestamps = true,
  maxTextLength = 150
}) => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchGoogleReviews = async () => {
      try {
        setLoading(true);
        
        if (!apiKey || !placeId) {
          throw new Error('Google API Key and Place ID are required');
        }

        // Use the proxy service to handle CORS
        const result = await googleReviewsProxy.fetchReviews(placeId, apiKey, maxReviews);
        
        if (result.reviews.length > 0) {
          setReviews(result.reviews);
          setError(result.error); // This might contain a warning about CORS
        } else {
          throw new Error('No reviews found');
        }
      } catch (err) {
        console.error('Error fetching Google reviews:', err);
        setError(err instanceof Error ? err.message : 'Failed to load reviews');
        
        // Fallback to mock data
        setReviews(googleReviewsProxy.getMockReviews(maxReviews));
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleReviews();
  }, [placeId, apiKey, maxReviews]);


  const nextReviews = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
  };

  const prevReviews = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(reviews.length / 3)) % Math.ceil(reviews.length / 3));
  };

  const getCurrentReviews = () => {
    const startIndex = currentIndex * 3;
    return reviews.slice(startIndex, startIndex + 3);
  };

  const getCurrentMobileReview = () => {
    return reviews[currentIndex] || reviews[0];
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews(prev => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  const renderReviewText = (review: GoogleReview) => {
    const isExpanded = expandedReviews.has(review.id);
    const shouldTruncate = review.text.length > maxTextLength;
    
    if (!shouldTruncate || isExpanded) {
      return (
        <p 
          className="leading-relaxed" 
          style={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
          }}
        >
          "{review.text}"
        </p>
      );
    }

    return (
      <div>
        <p 
          className="leading-relaxed" 
          style={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
          }}
        >
          "{review.text.substring(0, maxTextLength)}..."
        </p>
        <button
          onClick={() => toggleReviewExpansion(review.id)}
          className="mt-2 text-sm font-medium hover:underline"
          style={{ 
            color: bakeryConfig.primaryColor,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
          }}
        >
          Read more
        </button>
      </div>
    );
  };


  if (loading) {
    return (
      <motion.section 
        className="py-24 relative"
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.2)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-white/20 rounded-lg mb-8 mx-auto w-64"></div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white/10 rounded-2xl p-6">
                    <div className="h-4 bg-white/20 rounded mb-4"></div>
                    <div className="h-4 bg-white/20 rounded mb-4"></div>
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
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
        <motion.h2 
          className="text-4xl font-bold text-center mb-6" 
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
          What Our Customers Say
        </motion.h2>
        
        
        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Arrows - Hidden on mobile */}
          <motion.button
            onClick={prevReviews}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(25px) saturate(200%)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          <motion.button
            onClick={nextReviews}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(25px) saturate(200%)',
              WebkitBackdropFilter: 'blur(25px) saturate(200%)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
            }}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </motion.button>

          {/* Mobile: Single Review with Swipe Navigation */}
          <div className="md:hidden">
            <div className="flex items-center justify-center mb-6">
              <motion.button
                onClick={() => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center mr-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(25px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.button>

              <span 
                className="text-sm font-medium" 
                style={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                {currentIndex + 1} of {reviews.length}
              </span>

              <motion.button
                onClick={() => setCurrentIndex((prev) => (prev + 1) % reviews.length)}
                className="w-10 h-10 rounded-full flex items-center justify-center ml-4"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(25px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                }}
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            <motion.div 
              key={currentIndex}
              className="rounded-2xl p-6 mx-4"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(25px) saturate(200%)',
                WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const review = getCurrentMobileReview();
                return (
                  <>
                    {/* Review Header */}
                    <div className="flex items-center mb-4">
                      {showProfilePhotos && (
                        <Avatar
                          name={review.author_name}
                          profilePhotoUrl={review.profile_photo_url}
                          size="md"
                          className="mr-4"
                        />
                      )}
                      <div className="flex-1">
                        <h3 
                          className="font-bold text-lg" 
                          style={{ 
                            color: '#ffffff',
                            textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                          }}
                        >
                          {review.author_name}
                        </h3>
                        {showTimestamps && (
                          <p 
                            className="text-sm opacity-75" 
                            style={{ 
                              color: 'rgba(255, 255, 255, 0.8)',
                              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                            }}
                          >
                            {review.relative_time_description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Rating */}
                    {showRatings && (
                      <div className="flex items-center mb-4">
                        {renderStars(review.rating)}
                      </div>
                    )}

                    {/* Review Text */}
                    {renderReviewText(review)}
                  </>
                );
              })()}
            </motion.div>
          </div>

          {/* Desktop: 3 Reviews Grid */}
          <div className="hidden md:grid grid-cols-3 gap-8 px-8">
            {getCurrentReviews().map((review, index) => (
              <motion.div 
                key={review.id}
                className="rounded-2xl p-6 h-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(25px) saturate(200%)',
                  WebkitBackdropFilter: 'blur(25px) saturate(200%)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
              >
                {/* Review Header */}
                <div className="flex items-center mb-4">
                  {showProfilePhotos && (
                    <Avatar
                      name={review.author_name}
                      profilePhotoUrl={review.profile_photo_url}
                      size="md"
                      className="mr-4"
                    />
                  )}
                  <div className="flex-1">
                    <h3 
                      className="font-bold text-lg" 
                      style={{ 
                        color: '#ffffff',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      {review.author_name}
                    </h3>
                    {showTimestamps && (
                      <p 
                        className="text-sm opacity-75" 
                        style={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                          textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                        }}
                      >
                        {review.relative_time_description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Rating */}
                {showRatings && (
                  <div className="flex items-center mb-4">
                    {renderStars(review.rating)}
                  </div>
                )}

                {/* Review Text */}
                {renderReviewText(review)}
              </motion.div>
            ))}
          </div>

          {/* Dots Indicator - Different for mobile vs desktop */}
          <div className="flex justify-center mt-8 space-x-2">
            {/* Mobile: Show dots for each individual review */}
            <div className="md:hidden flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            
            {/* Desktop: Show dots for each set of 3 reviews */}
            <div className="hidden md:flex space-x-2">
              {Array.from({ length: Math.ceil(reviews.length / 3) }, (_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Error/Info Message */}
        {error && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div 
              className="inline-block p-4 rounded-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <p 
                className="text-sm mb-2" 
                style={{ 
                  color: 'rgba(255, 255, 255, 0.9)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                {error.includes('API Key') ? 'Google API setup required' : 'Showing sample reviews'}
              </p>
              <p 
                className="text-xs opacity-75" 
                style={{ 
                  color: 'rgba(255, 255, 255, 0.7)',
                  textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                }}
              >
                {error.includes('API Key') 
                  ? 'Add VITE_REACT_APP_GOOGLE_API_KEY and VITE_REACT_APP_GOOGLE_PLACE_ID to your .env file'
                  : 'Connect your Google Places API for live reviews'
                }
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
