// Google Reviews Proxy Service
// This service handles CORS issues by using a proxy approach

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

// Mock data for development/fallback
const mockReviews: GoogleReview[] = [
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

export class GoogleReviewsProxy {
  private static instance: GoogleReviewsProxy;
  private cache: Map<string, { data: GoogleReview[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours (more frequent updates)
  private readonly MAX_CACHE_SIZE = 10; // Limit cache size

  public static getInstance(): GoogleReviewsProxy {
    if (!GoogleReviewsProxy.instance) {
      GoogleReviewsProxy.instance = new GoogleReviewsProxy();
    }
    return GoogleReviewsProxy.instance;
  }

  /**
   * Fetch Google Reviews using CORS proxy
   */
  async fetchReviews(
    placeId: string,
    apiKey: string,
    maxReviews: number = 5
  ): Promise<{ reviews: GoogleReview[]; error: string | null }> {
    try {
      // Check cache first
      const cached = this.getCachedReviews(placeId);
      if (cached) {
        console.log('Using cached Google reviews');
        return { reviews: cached.slice(0, maxReviews), error: null };
      }

      // Validate inputs
      if (!placeId || !apiKey) {
        throw new Error('Place ID and API Key are required');
      }

      // Try multiple proxy methods
      const reviews = await this.fetchWithProxy(placeId, apiKey, maxReviews);
      
      // Cache the results
      this.setCachedReviews(placeId, reviews);
      
      return { reviews, error: null };
    } catch (error) {
      console.error('Error fetching Google reviews:', error);
      
      // Return mock data as fallback
      return {
        reviews: mockReviews.slice(0, maxReviews),
        error: 'CORS blocked - using sample reviews. For production, use a backend proxy.'
      };
    }
  }

  /**
   * Try multiple proxy methods to fetch reviews
   */
  private async fetchWithProxy(
    placeId: string,
    apiKey: string,
    maxReviews: number
  ): Promise<GoogleReview[]> {
    const proxies = [
      // Method 1: CORS Anywhere (for development)
      `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`,
      
      // Method 2: AllOrigins (alternative CORS proxy)
      `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`)}`,
      
      // Method 3: ThingProxy (another CORS proxy)
      `https://thingproxy.freeboard.io/fetch/https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=reviews&key=${apiKey}`
    ];

    for (const proxyUrl of proxies) {
      try {
        console.log('Trying proxy:', proxyUrl.split('/')[2]);
        const response = await fetch(proxyUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Handle AllOrigins response format
        const responseData = data.contents ? JSON.parse(data.contents) : data;

        if (responseData.status === 'OK' && responseData.result?.reviews) {
          console.log('Successfully fetched reviews via proxy');
          return this.transformReviews(responseData.result.reviews.slice(0, maxReviews));
        } else {
          throw new Error(`Google API Error: ${responseData.status} - ${responseData.error_message || 'Unknown error'}`);
        }
      } catch (error) {
        console.log('Proxy failed, trying next one...', error);
        continue;
      }
    }

    throw new Error('All proxy methods failed');
  }

  /**
   * Transform Google API response to our format
   */
  private transformReviews(googleReviews: any[]): GoogleReview[] {
    return googleReviews.map((review: any) => ({
      id: review.time?.toString() || Math.random().toString(),
      author_name: review.author_name,
      author_url: review.author_url,
      profile_photo_url: review.profile_photo_url,
      rating: review.rating,
      relative_time_description: review.relative_time_description,
      text: review.text,
      time: review.time
    }));
  }

  /**
   * Get cached reviews if they exist and are not expired
   */
  private getCachedReviews(placeId: string): GoogleReview[] | null {
    // First check memory cache
    const cached = this.cache.get(placeId);
    if (cached) {
      const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
      if (isExpired) {
        this.cache.delete(placeId);
      } else {
        return cached.data;
      }
    }

    // Then check localStorage
    try {
      const stored = localStorage.getItem(`google_reviews_${placeId}`);
      if (stored) {
        const cacheData = JSON.parse(stored);
        const isExpired = Date.now() - cacheData.timestamp > this.CACHE_DURATION;
        
        if (!isExpired) {
          // Restore to memory cache
          this.cache.set(placeId, {
            data: cacheData.data,
            timestamp: cacheData.timestamp
          });
          return cacheData.data;
        } else {
          // Remove expired data
          localStorage.removeItem(`google_reviews_${placeId}`);
        }
      }
    } catch (error) {
      console.warn('Could not read from localStorage:', error);
    }

    return null;
  }

  /**
   * Cache reviews with timestamp and manage cache size
   */
  private setCachedReviews(placeId: string, reviews: GoogleReview[]): void {
    // Manage cache size - remove oldest entries if cache is full
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }

    this.cache.set(placeId, {
      data: reviews,
      timestamp: Date.now()
    });

    // Also store in localStorage for persistence across sessions
    try {
      const cacheData = {
        data: reviews,
        timestamp: Date.now(),
        placeId
      };
      localStorage.setItem(`google_reviews_${placeId}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Could not save to localStorage:', error);
    }
  }

  /**
   * Clear cache (useful for testing or manual refresh)
   */
  public clearCache(placeId?: string): void {
    if (placeId) {
      this.cache.delete(placeId);
    } else {
      this.cache.clear();
    }
  }

  /**
   * Get mock reviews for development
   */
  public getMockReviews(maxReviews: number = 5): GoogleReview[] {
    return mockReviews.slice(0, maxReviews);
  }
}

// Export singleton instance
export const googleReviewsProxy = GoogleReviewsProxy.getInstance();
