// Test utility for dynamic categories
import { extractCategories } from '../services/googleSheets';
import { MenuItem } from '../data/menuData';

// Test data with various categories
const testMenuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Espresso',
    description: 'Rich coffee',
    price: 3.50,
    image: 'test.jpg',
    category: 'coffee',
    available: true
  },
  {
    id: '2',
    name: 'Cappuccino',
    description: 'Milk coffee',
    price: 4.25,
    image: 'test.jpg',
    category: 'coffee',
    available: true
  },
  {
    id: '3',
    name: 'Croissant',
    description: 'Buttery pastry',
    price: 3.25,
    image: 'test.jpg',
    category: 'pastries',
    available: true
  },
  {
    id: '4',
    name: 'Chocolate Cake',
    description: 'Rich dessert',
    price: 5.50,
    image: 'test.jpg',
    category: 'desserts',
    available: true
  },
  {
    id: '5',
    name: 'Green Smoothie',
    description: 'Healthy drink',
    price: 4.75,
    image: 'test.jpg',
    category: 'drinks',
    available: true
  },
  {
    id: '6',
    name: 'Unknown Item',
    description: 'Mystery food',
    price: 2.00,
    image: 'test.jpg',
    category: 'mystery_category',
    available: true
  }
];

// Test the category extraction
export const testDynamicCategories = () => {
  console.log('🧪 Testing Dynamic Categories...');
  
  const categories = extractCategories(testMenuItems);
  
  console.log('📊 Extracted Categories:', categories);
  
  // Expected results:
  // - coffee: 2 items
  // - pastries: 1 item  
  // - desserts: 1 item
  // - drinks: 1 item
  // - mystery_category: 1 item (with default icon)
  
  const expectedCategories = ['coffee', 'pastries', 'desserts', 'drinks', 'mystery_category'];
  const actualCategories = categories.map(c => c.id);
  
  console.log('✅ Categories found:', actualCategories);
  console.log('🎯 Expected categories:', expectedCategories);
  
  // Check if all expected categories are present
  const allFound = expectedCategories.every(expected => 
    actualCategories.includes(expected)
  );
  
  console.log(allFound ? '✅ All categories found!' : '❌ Some categories missing');
  
  // Check category counts
  const coffeeCategory = categories.find(c => c.id === 'coffee');
  console.log('☕ Coffee items:', coffeeCategory?.count, '(expected: 2)');
  
  return {
    success: allFound && coffeeCategory?.count === 2,
    categories,
    testData: testMenuItems
  };
};

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  // Browser environment - can be called from console
  (window as any).testDynamicCategories = testDynamicCategories;
  console.log('🔧 Test function available: testDynamicCategories()');
}
