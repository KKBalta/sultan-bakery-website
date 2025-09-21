import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  id: string;
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
}

interface GoogleReviewsProps {
  placeId?: string;
  apiKey?: string;
  maxReviews?: number;
  showProfilePhotos?: boolean;
  showRatings?: boolean;
  showTimestamps?: boolean;
}

// Mock data for development/fallback
const mockReviews: Review[] = [
  {
    id: '1',
    author_name: 'Sarah Johnson',
    profile_photo_url: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    rating: 5,
    relative_time_description: '2 weeks ago',
    text: 'Absolutely amazing bakery! The croissants are buttery and flaky, and the coffee is perfect. The staff is so friendly and welcoming. This place feels like home!',
    time: Date.now() - 14 * 24 * 60 * 60 * 1000
  },
  {
    id: '2',
    author_name: 'Michael Chen',
    profile_photo_url: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg',
    rating: 5,
    relative_time_description: '1 month ago',
    text: 'Best bakery in town! Their sourdough bread is incredible and the pastries are always fresh. The atmosphere is cozy and the service is outstanding.',
    time: Date.now() - 30 * 24 * 60 * 60 * 1000
  },
  {
    id: '3',
    author_name: 'Emily Rodriguez',
    profile_photo_url: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 5,
    relative_time_description: '3 weeks ago',
    text: 'I come here every weekend! The cinnamon rolls are to die for, and the staff remembers my order. It\'s like having a second family. Highly recommend!',
    time: Date.now() - 21 * 24 * 60 * 60 * 1000
  },
  {
    id: '4',
    author_name: 'David Thompson',
    profile_photo_url: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg',
    rating: 4,
    relative_time_description: '1 week ago',
    text: 'Great selection of breads and pastries. The quality is consistently good and the prices are reasonable. The only reason I didn\'t give 5 stars is the limited seating.',
    time: Date.now() - 7 * 24 * 60 * 60 * 1000
  },
  {
    id: '5',
    author_name: 'Lisa Park',
    profile_photo_url: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
    rating: 5,
    relative_time_description: '2 months ago',
    text: 'This bakery is a hidden gem! The artisan breads are incredible and the coffee is always perfect. The owner is so passionate about quality. Love this place!',
    time: Date.now() - 60 * 24 * 60 * 60 * 1000
  }
];

export const GoogleReviews: React.FC<GoogleReviewsProps> = ({
  placeId,
  apiKey,
  maxReviews = 5,
  showProfilePhotos = true,
  showRatings = true,
  showTimestamps = true
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        
        // If no API key or place ID provided, use mock data
        if (!apiKey || !placeId) {
          console.log('Using mock reviews data for development');
          setReviews(mockReviews.slice(0, maxReviews));
          setLoading(false);
          return;
        }

        // Fetch real Google reviews
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        
        if (data.status === 'OK' && data.result.reviews) {
          setReviews(data.result.reviews.slice(0, maxReviews));
        } else {
          throw new Error('No reviews found or API error');
        }
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError('Failed to load reviews');
        // Fallback to mock data
        setReviews(mockReviews.slice(0, maxReviews));
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
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
                      {showProfilePhotos && review.profile_photo_url && (
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="w-12 h-12 rounded-full mr-4 object-cover"
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
                    <p 
                      className="leading-relaxed" 
                      style={{ 
                        color: 'rgba(255, 255, 255, 0.9)',
                        textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                      }}
                    >
                      "{review.text}"
                    </p>
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
                  {showProfilePhotos && review.profile_photo_url && (
                    <img
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
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
                <p 
                  className="leading-relaxed" 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.9)',
                    textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  "{review.text}"
                </p>
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

        {error && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p 
              className="text-sm opacity-75" 
              style={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
              }}
            >
              Showing sample reviews. Connect your Google Places API for live reviews.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
