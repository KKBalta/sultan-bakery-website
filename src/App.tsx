import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PrimaryMeshBackground, SecondaryMeshBackground } from './components/MeshBackground';
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
      {/* Global Mesh Gradient Background */}
      <PrimaryMeshBackground 
        className="fixed inset-0 z-[-2]" 
        opacity={0.3} 
        speed={0.2} 
      />
      
      {/* Secondary Layer for Depth */}
      <SecondaryMeshBackground 
        className="fixed inset-0 z-[-1]" 
        opacity={0.2} 
        speed={0.4} 
      />
      
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