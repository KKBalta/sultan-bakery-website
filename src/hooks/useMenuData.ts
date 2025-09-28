import { useState, useEffect } from 'react';
import { MenuItem, Category, defaultCategories } from '../data/menuData';
import { getCachedMenuData, getCachedCategories, clearMenuCache } from '../services/googleSheets';
import { menuItems as fallbackMenuItems } from '../data/menuData'; // Fallback data

interface UseMenuDataReturn {
  menuItems: MenuItem[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useMenuData = (): UseMenuDataReturn => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
