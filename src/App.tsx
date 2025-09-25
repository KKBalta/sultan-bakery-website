import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MeshGradient } from '@paper-design/shaders-react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { Contact } from './pages/Contact';
import { TabletMenu } from './pages/TabletMenu';
import { useState, useEffect } from 'react';

function App() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    // Check for low-end devices (basic heuristic)
    const isLowEndDevice = navigator.hardwareConcurrency <= 2 || 
                          (navigator as any).deviceMemory <= 4;
    setReducedMotion(prev => prev || isLowEndDevice);
  }, []);

  return (
    <div className="relative min-h-screen">
            {/* Optimized Single Mesh Background */}
            <div className="fixed inset-0 z-[-1]" style={{ opacity: 1.0 }}>
              <MeshGradient
                speed={reducedMotion ? 0.01 : 0.1}
                colors={['#000000', '#1a1a1a', '#2d2d2d', '#ffd700', '#b8860b', '#000000']}
                style={{ 
                  width: '100vw', 
                  height: '100vh'
                }}
              />
            </div>
      
      <Router>
        <Routes>
          {/* Regular website routes with layout */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/menu" element={<Layout><Menu /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          
          {/* Full-screen tablet menu without layout */}
          <Route path="/tablet-menu" element={<TabletMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;