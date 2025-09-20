// Color palette interface
export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  text: string;
  textSecondary: string;
  background: string;
  surface: string;
  border: string;
  shadow: string;
}

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
  colors: ColorPalette;
  enableMultiDomain: boolean;
  defaultDomain: string;
}

// Export the config instance using Vite's import.meta.env
export const bakeryConfig: BakeryConfig = {
  name: import.meta.env.VITE_REACT_APP_BAKERY_NAME || 'Sweet Moments Bakery',
  tagline: import.meta.env.VITE_REACT_APP_BAKERY_TAGLINE || 'Freshly baked pastries, coffee, and warm memories made daily',
  address: import.meta.env.VITE_REACT_APP_BAKERY_ADDRESS || '123 Baker Street, Sweet Town, ST 12345',
  phone: import.meta.env.VITE_REACT_APP_BAKERY_PHONE || '(555) 123-CAKE',
  hours: import.meta.env.VITE_REACT_APP_BAKERY_HOURS || 'Mon-Sat: 6am-8pm • Sun: 7am-6pm',
  email: import.meta.env.VITE_REACT_APP_BAKERY_EMAIL || 'hello@sweetmoments.com',
  googleSheetId: import.meta.env.VITE_REACT_APP_GOOGLE_SHEET_ID || '16qy6axjONcGfzX7eQ4MMvrongq0UtjmdBY_Y1VeyoC8',
  primaryColor: import.meta.env.VITE_REACT_APP_PRIMARY_COLOR || '#FFB22C',
  secondaryColor: import.meta.env.VITE_REACT_APP_SECONDARY_COLOR || '#F7F7F7',
  colors: {
    primary: import.meta.env.VITE_REACT_APP_COLOR_PRIMARY || '#000000',
    secondary: import.meta.env.VITE_REACT_APP_COLOR_SECONDARY || '#ffffff',
    accent: import.meta.env.VITE_REACT_APP_COLOR_ACCENT || '#ffffff',
    text: import.meta.env.VITE_REACT_APP_COLOR_TEXT || '#ffffff',
    textSecondary: import.meta.env.VITE_REACT_APP_COLOR_TEXT_SECONDARY || '#000000',
    background: import.meta.env.VITE_REACT_APP_COLOR_BACKGROUND || 'rgba(255, 255, 255, 0.12)',
    surface: import.meta.env.VITE_REACT_APP_COLOR_SURFACE || 'rgba(255, 255, 255, 0.15)',
    border: import.meta.env.VITE_REACT_APP_COLOR_BORDER || 'rgba(255, 255, 255, 0.2)',
    shadow: import.meta.env.VITE_REACT_APP_COLOR_SHADOW || 'rgba(0, 0, 0, 0.2)'
  },
  enableMultiDomain: import.meta.env.VITE_REACT_APP_ENABLE_MULTI_DOMAIN === 'true',
  defaultDomain: import.meta.env.VITE_REACT_APP_DEFAULT_DOMAIN || 'localhost'
};
