import { useState, useEffect } from 'react';
import { MenuItem, categories } from '../data/menuData';
import { getCachedMenuData, clearMenuCache } from '../services/googleSheets';
import { menuItems as fallbackMenuItems } from '../data/menuData'; // Fallback data

interface UseMenuDataReturn {
  menuItems: MenuItem[];
  categories: typeof categories;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useMenuData = (): UseMenuDataReturn => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getCachedMenuData();
      
      // If no data from Google Sheets, use fallback data
      if (data.length === 0) {
        console.warn('No data from Google Sheets, using fallback menu data');
        setMenuItems(fallbackMenuItems);
      } else {
        setMenuItems(data);
      }
    } catch (err) {
      console.error('Error loading menu data:', err);
      setError('Failed to load menu data');
      // Use fallback data on error
      setMenuItems(fallbackMenuItems);
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    clearMenuCache();
    await fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    menuItems,
    categories,
    loading,
    error,
    refresh
  };
};
