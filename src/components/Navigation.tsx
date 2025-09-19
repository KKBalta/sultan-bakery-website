import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Coffee, Menu, X } from 'lucide-react';
import { bakeryConfig } from '../config/bakeryConfig';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/menu', label: 'Menu' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" style={{ backgroundColor: bakeryConfig.secondaryColor }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8" style={{ color: bakeryConfig.primaryColor }} />
            <span className="text-2xl font-bold" style={{ color: '#000000' }}>{bakeryConfig.name}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'text-black'
                    : 'text-gray-700 hover:text-black'
                }`}
                style={location.pathname === item.path ? { backgroundColor: bakeryConfig.primaryColor, color: '#000000' } : {}}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/tablet-menu"
              className="text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              style={{ backgroundColor: bakeryConfig.primaryColor, color: '#000000' }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              Tablet Menu
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-black"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200" style={{ borderColor: bakeryConfig.primaryColor }}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-black'
                      : 'text-gray-700 hover:text-black'
                  }`}
                  style={location.pathname === item.path ? { backgroundColor: bakeryConfig.primaryColor, color: '#000000' } : {}}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/tablet-menu"
                onClick={() => setIsMenuOpen(false)}
                className="block text-white px-3 py-2 rounded-md text-base font-medium transition-colors"
                style={{ backgroundColor: bakeryConfig.primaryColor, color: '#000000' }}
              >
                Tablet Menu
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};