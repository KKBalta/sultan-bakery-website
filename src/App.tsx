import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MeshGradient } from '@paper-design/shaders-react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { TabletMenu } from './pages/TabletMenu';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden">
            {/* Classic Bakery Mesh - White, Black, Brown */}
            <div className="fixed inset-0 z-[-2]" style={{ opacity: 0.6 }}>
              <MeshGradient
                speed={0.3}
                colors={['#ffffff', '#f8f8f8', '#000000', '#2c2c2c', '#8b4513', '#a0522d']}
                style={{ 
                  width: '100vw', 
                  height: '100vh'
                }}
              />
            </div>
            
            {/* Secondary Layer - Rich Browns */}
            <div className="fixed inset-0 z-[-1]" style={{ opacity: 0.4 }}>
              <MeshGradient
                speed={0.5}
                colors={['#f5f5f5', '#e0e0e0', '#1a1a1a', '#404040', '#d2691e', '#cd853f']}
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