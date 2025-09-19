import { MenuItem } from '../data/menuData';
import { bakeryConfig } from '../config/bakeryConfig';

// Get Google Sheet ID from config
const SHEET_ID = bakeryConfig.googleSheetId;
const RANGE = 'A1:H'; // All data from A1 to H column

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
      const [name, description, price, category, available, image, popular, id] = row;
      
      return {
        id: id || `item-${index}`,
        name: name || 'Unnamed Item',
        description: description || '',
        price: parseFloat(price) || 0,
        image: image || 'https://via.placeholder.com/400x300?text=No+Image',
        category: (category?.toLowerCase() as 'coffee' | 'pastries' | 'sandwiches') || 'coffee',
        available: available?.toLowerCase() === 'true' || available === '1',
        popular: popular?.toLowerCase() === 'true' || popular === '1'
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

// Cache management
let menuCache: { data: MenuItem[]; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getCachedMenuData = async (): Promise<MenuItem[]> => {
  const now = Date.now();
  
  // Return cached data if it's still fresh
  if (menuCache && (now - menuCache.timestamp) < CACHE_DURATION) {
    return menuCache.data;
  }

  // Fetch fresh data
  const data = await fetchMenuData();
  menuCache = { data, timestamp: now };
  
  return data;
};

// Clear cache (useful for testing or manual refresh)
export const clearMenuCache = () => {
  menuCache = null;
};
