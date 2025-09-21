import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MeshGradient } from '@paper-design/shaders-react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { Gallery } from './pages/Gallery';
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
    <div className="relative min-h-screen overflow-hidden">
            {/* Optimized Single Mesh Background */}
            <div className="fixed inset-0 z-[-1]" style={{ opacity: 0.7 }}>
              <MeshGradient
                speed={reducedMotion ? 0.05 : 0.2}
                colors={['#8b4513', '#a0522d', '#2c2c2c', '#1a1a1a', '#4a4a4a', '#6b6b6b']}
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
          <Route path="/gallery" element={<Layout><Gallery /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />
          
          {/* Full-screen tablet menu without layout */}
          <Route path="/tablet-menu" element={<TabletMenu />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;