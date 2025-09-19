import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { Gallery } from './pages/Gallery';
import { Contact } from './pages/Contact';
import { TabletMenu } from './pages/TabletMenu';

function App() {
  return (
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
  );
}

export default App;