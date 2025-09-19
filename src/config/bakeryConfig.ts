// Bakery configuration from environment variables
export interface BakeryConfig {
  name: string;
  tagline: string;
  address: string;
  phone: string;
  hours: string;
  email: string;
  googleSheetId: string;
  primaryColor: string;
  secondaryColor: string;
  enableMultiDomain: boolean;
  defaultDomain: string;
}

// Export the config instance using Vite's import.meta.env
export const bakeryConfig: BakeryConfig = {
  name: import.meta.env.VITE_REACT_APP_BAKERY_NAME || 'Sweet Moments Bakery',
  tagline: import.meta.env.VITE_REACT_APP_BAKERY_TAGLINE || 'Freshly baked pastries, artisan coffee, and warm memories made daily',
  address: import.meta.env.VITE_REACT_APP_BAKERY_ADDRESS || '123 Baker Street, Sweet Town, ST 12345',
  phone: import.meta.env.VITE_REACT_APP_BAKERY_PHONE || '(555) 123-CAKE',
  hours: import.meta.env.VITE_REACT_APP_BAKERY_HOURS || 'Mon-Sat: 6am-8pm • Sun: 7am-6pm',
  email: import.meta.env.VITE_REACT_APP_BAKERY_EMAIL || 'hello@sweetmoments.com',
  googleSheetId: import.meta.env.VITE_REACT_APP_GOOGLE_SHEET_ID || '16qy6axjONcGfzX7eQ4MMvrongq0UtjmdBY_Y1VeyoC8',
  primaryColor: import.meta.env.VITE_REACT_APP_PRIMARY_COLOR || '#FFB22C',
  secondaryColor: import.meta.env.VITE_REACT_APP_SECONDARY_COLOR || '#F7F7F7',
  enableMultiDomain: import.meta.env.VITE_REACT_APP_ENABLE_MULTI_DOMAIN === 'true',
  defaultDomain: import.meta.env.VITE_REACT_APP_DEFAULT_DOMAIN || 'localhost'
};
