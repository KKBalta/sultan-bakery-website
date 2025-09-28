import { useState, useEffect, useRef, useCallback } from 'react';
import { MenuItem, Category, defaultCategories } from '../data/menuData';
import { 
  getCachedMenuData, 
  getCachedCategories, 
  clearMenuCache, 
  softRefreshMenuData, 
  shouldRefreshCache,
  getCacheAge 
} from '../services/googleSheets';
import { menuItems as fallbackMenuItems } from '../data/menuData'; // Fallback data

interface UseMenuDataReturn {
  menuItems: MenuItem[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  isRefreshing: boolean;
  lastUpdated: Date | null;
  cacheAge: number;
}

export const useMenuData = (): UseMenuDataReturn => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [cacheAge, setCacheAge] = useState(0);
  
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [data, dynamicCategories] = await Promise.all([
        getCachedMenuData(),
        getCachedCategories()
      ]);
      
      // If no data from Google Sheets, use fallback data
      if (data.length === 0) {
        console.warn('No data from Google Sheets, using fallback menu data');
        setMenuItems(fallbackMenuItems);
        setCategories(defaultCategories);
      } else {
        setMenuItems(data);
        setCategories(dynamicCategories);
        setLastUpdated(new Date());
        setCacheAge(getCacheAge());
      }
    } catch (err) {
      console.error('Error loading menu data:', err);
      setError('Failed to load menu data');
      // Use fallback data on error
      setMenuItems(fallbackMenuItems);
      setCategories(defaultCategories);
    } finally {
      setLoading(false);
    }
  };

  // Soft refresh function that runs in background
  const performSoftRefresh = useCallback(async () => {
    if (isRefreshing) return; // Prevent multiple simultaneous refreshes
    
    try {
      setIsRefreshing(true);
      const result = await softRefreshMenuData();
      
      if (result.isNew) {
        setMenuItems(result.data);
        setCategories(result.categories);
        setLastUpdated(new Date());
        console.log('Menu data updated successfully');
      }
      
      setCacheAge(getCacheAge());
    } catch (err) {
      console.error('Error during soft refresh:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing]);

  const refresh = async () => {
    clearMenuCache();
    await fetchData();
  };

  // Set up automatic soft refresh
  useEffect(() => {
    fetchData();
    
    // Set up interval for soft refresh every 5 minutes
    refreshIntervalRef.current = setInterval(() => {
      if (shouldRefreshCache()) {
        performSoftRefresh();
      }
    }, 5 * 60 * 1000); // 5 minutes for production

    // Update cache age every minute
    const cacheAgeInterval = setInterval(() => {
      setCacheAge(getCacheAge());
    }, 60 * 1000); // 1 minute

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
      clearInterval(cacheAgeInterval);
    };
  }, [performSoftRefresh]);

  return {
    menuItems,
    categories,
    loading,
    error,
    refresh,
    isRefreshing,
    lastUpdated,
    cacheAge
  };
};
