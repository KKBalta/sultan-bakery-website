import { MenuItem, Category } from '../data/menuData';
import { bakeryConfig } from '../config/bakeryConfig';

// Get Google Sheet ID from config
const SHEET_ID = bakeryConfig.googleSheetId;
const RANGE = 'A1:J'; // All data from A1 to J column (Name, Description, Price, Category, Available, Calori, Size, Image URL, Popular, ID)

// Parse CSV text into array of arrays
const parseCSV = (csvText: string): string[][] => {
  const lines = csvText.trim().split('\n');
  return lines.map(line => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  });
};

// Parse menu data from Google Sheets
const parseMenuData = (values: string[][]): MenuItem[] => {
  if (!values || values.length <= 1) {
    return [];
  }

  // Skip header row (index 0) and process data rows
  return values.slice(1)
    .filter(row => row.length >= 7 && row[0]) // Ensure we have all required columns and name exists
    .map((row, index) => {
      // Column order: Name, Description, Price, Category, Available, Calori, Size, Image URL, Popular, ID
      const [name, description, price, category, available, calories, scale, image, popular, id] = row;
      
      return {
        id: id || `item-${index}`,
        name: name || 'Unnamed Item',
        description: description || '',
        price: parseFloat(price) || 0,
        image: image || 'https://via.placeholder.com/400x300?text=No+Image',
        category: category?.toLowerCase() || 'uncategorized',
        available: available?.toLowerCase() === 'true' || available === '1',
        popular: popular?.toLowerCase() === 'true' || popular === '1',
        calories: calories ? parseInt(calories) : undefined,
        scale: scale || undefined,
        allergens: undefined, // Not in your current sheet
        prepTime: undefined   // Not in your current sheet
      };
    });
};

// Fetch menu data from Google Sheets
export const fetchMenuData = async (): Promise<MenuItem[]> => {
  try {
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=Sheet1&range=${RANGE}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const csvText = await response.text();
    const values = parseCSV(csvText);
    
    return parseMenuData(values);
  } catch (error) {
    console.error('Error fetching menu data from Google Sheets:', error);
    return [];
  }
};

// Extract unique categories from menu items
export const extractCategories = (menuItems: MenuItem[]): Category[] => {
  const categoryMap = new Map<string, { name: string; count: number; icon: string }>();
  
  // Default category icons mapping
  const defaultIcons: Record<string, string> = {
    'coffee': '☕',
    'pastries': '🥐',
    'sandwiches': '🥪',
    'desserts': '🍰',
    'drinks': '🥤',
    'breakfast': '🍳',
    'lunch': '🍽️',
    'dinner': '🍴',
    'snacks': '🍿',
    'salads': '🥗',
    'soups': '🍲',
    'bread': '🍞',
    'cakes': '🎂',
    'cookies': '🍪',
    'muffins': '🧁',
    'uncategorized': '📦'
  };

  // Count items per category
  menuItems.forEach(item => {
    const categoryId = item.category.toLowerCase();
    const categoryName = item.category.charAt(0).toUpperCase() + item.category.slice(1);
    
    if (categoryMap.has(categoryId)) {
      const existing = categoryMap.get(categoryId)!;
      existing.count++;
    } else {
      categoryMap.set(categoryId, {
        name: categoryName,
        count: 1,
        icon: defaultIcons[categoryId] || '📦'
      });
    }
  });

  // Convert to Category array and sort by count (most items first)
  return Array.from(categoryMap.entries())
    .map(([id, data]) => ({
      id,
      name: data.name,
      icon: data.icon,
      count: data.count
    }))
    .sort((a, b) => (b.count || 0) - (a.count || 0));
};

// Cache management
let menuCache: { data: MenuItem[]; categories: Category[]; timestamp: number } | null = null;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes - increased for better performance
const SOFT_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes for production

export const getCachedMenuData = async (): Promise<MenuItem[]> => {
  const now = Date.now();
  
  // Return cached data if it's still fresh
  if (menuCache && (now - menuCache.timestamp) < CACHE_DURATION) {
    return menuCache.data;
  }

  // Fetch fresh data
  const data = await fetchMenuData();
  const categories = extractCategories(data);
  menuCache = { data, categories, timestamp: now };
  
  return data;
};

// New function to get cached categories
export const getCachedCategories = async (): Promise<Category[]> => {
  const now = Date.now();
  
  // Return cached data if it's still fresh
  if (menuCache && (now - menuCache.timestamp) < CACHE_DURATION) {
    return menuCache.categories;
  }

  // Fetch fresh data
  const data = await fetchMenuData();
  const categories = extractCategories(data);
  menuCache = { data, categories, timestamp: now };
  
  return categories;
};

// Clear cache (useful for testing or manual refresh)
export const clearMenuCache = () => {
  menuCache = null;
};

// Soft refresh - fetch new data in background without clearing cache
export const softRefreshMenuData = async (): Promise<{ data: MenuItem[]; categories: Category[]; isNew: boolean }> => {
  try {
    const freshData = await fetchMenuData();
    const freshCategories = extractCategories(freshData);
    const now = Date.now();
    
    // Check if data has actually changed
    const isNew = !menuCache || 
      JSON.stringify(menuCache.data) !== JSON.stringify(freshData) ||
      JSON.stringify(menuCache.categories) !== JSON.stringify(freshCategories);
    
    // Update cache with fresh data
    menuCache = { data: freshData, categories: freshCategories, timestamp: now };
    
    return { data: freshData, categories: freshCategories, isNew };
  } catch (error) {
    console.error('Error during soft refresh:', error);
    // Return cached data if available, otherwise empty arrays
    return { 
      data: menuCache?.data || [], 
      categories: menuCache?.categories || [], 
      isNew: false 
    };
  }
};

// Check if cache needs refresh
export const shouldRefreshCache = (): boolean => {
  if (!menuCache) return true;
  const now = Date.now();
  return (now - menuCache.timestamp) > SOFT_REFRESH_INTERVAL;
};

// Get cache age in minutes
export const getCacheAge = (): number => {
  if (!menuCache) return 0;
  return Math.floor((Date.now() - menuCache.timestamp) / (1000 * 60));
};
