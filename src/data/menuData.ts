export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string; // Changed to dynamic string instead of fixed union type
  available: boolean;
  popular?: boolean;
  calories?: number;
  scale?: string;
  allergens?: string[];
  prepTime?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count?: number; // Number of items in this category
}

export const menuItems: MenuItem[] = [
  // Coffee
  {
    id: 'espresso',
    name: 'Artisan Espresso',
    description: 'Rich, bold espresso shot made from our signature blend',
    price: 3.50,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
    category: 'coffee',
    available: true,
    popular: true,
    calories: 5,
    scale: '2 oz',
    prepTime: '2 min'
  },
  {
    id: 'cappuccino',
    name: 'Classic Cappuccino',
    description: 'Perfectly steamed milk with our signature espresso',
    price: 4.25,
    image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg',
    category: 'coffee',
    available: true
  },
  {
    id: 'latte',
    name: 'Vanilla Latte',
    description: 'Smooth espresso with steamed milk and vanilla syrup',
    price: 4.75,
    image: 'https://images.pexels.com/photos/851555/pexels-photo-851555.jpeg',
    category: 'coffee',
    available: true
  },
  {
    id: 'cold-brew',
    name: 'Cold Brew',
    description: 'Slow-steeped cold brew coffee, smooth and refreshing',
    price: 4.00,
    image: 'https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg',
    category: 'coffee',
    available: false
  },

  // Pastries
  {
    id: 'croissant',
    name: 'Butter Croissant',
    description: 'Flaky, buttery pastry baked fresh daily',
    price: 3.25,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    category: 'pastries',
    available: true,
    popular: true,
    calories: 280,
    scale: 'Large',
    allergens: ['Gluten', 'Dairy'],
    prepTime: '5 min'
  },
  {
    id: 'chocolate-muffin',
    name: 'Double Chocolate Muffin',
    description: 'Rich chocolate muffin with chocolate chips',
    price: 3.75,
    image: 'https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg',
    category: 'pastries',
    available: true
  },
  {
    id: 'cinnamon-roll',
    name: 'Cinnamon Roll',
    description: 'Warm cinnamon roll with cream cheese glaze',
    price: 4.50,
    image: 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg',
    category: 'pastries',
    available: true
  },
  {
    id: 'danish',
    name: 'Fruit Danish',
    description: 'Flaky pastry topped with seasonal fresh fruit',
    price: 3.95,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg',
    category: 'pastries',
    available: true
  },

  // Sandwiches
  {
    id: 'ham-swiss',
    name: 'Ham & Swiss',
    description: 'Artisan ham and Swiss cheese on fresh sourdough',
    price: 8.50,
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    category: 'sandwiches',
    available: true,
    calories: 450,
    scale: '8 inch',
    allergens: ['Gluten', 'Dairy'],
    prepTime: '8 min'
  },
  {
    id: 'turkey-avocado',
    name: 'Turkey Avocado Club',
    description: 'Fresh turkey, avocado, bacon on multigrain bread',
    price: 9.75,
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    category: 'sandwiches',
    available: true,
    popular: true
  },
  {
    id: 'veggie-wrap',
    name: 'Garden Veggie Wrap',
    description: 'Fresh vegetables and hummus in a spinach tortilla',
    price: 7.25,
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    category: 'sandwiches',
    available: true
  },
  {
    id: 'grilled-cheese',
    name: 'Artisan Grilled Cheese',
    description: 'Three-cheese blend grilled to golden perfection',
    price: 6.50,
    image: 'https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg',
    category: 'sandwiches',
    available: false
  }
];

export const defaultCategories: Category[] = [
  { id: 'coffee', name: 'Coffee', icon: '☕' },
  { id: 'pastries', name: 'Pastries', icon: '🥐' },
  { id: 'sandwiches', name: 'Sandwiches', icon: '🥪' }
];

// Legacy export for backward compatibility
export const categories = defaultCategories;