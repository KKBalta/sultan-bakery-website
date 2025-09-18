import React, { useState } from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F7F7' }}>
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <main>{children}</main>
    </div>
  );
};