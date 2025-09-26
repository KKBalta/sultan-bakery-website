import React, { useState } from 'react';
import { 
  LoadingSpinner, 
  FullPageLoading, 
  InlineLoading, 
  ButtonLoading 
} from '../components/LoadingSpinner';
import { useLoading } from '../contexts/LoadingContext';

// Example component showing different loading states
export const LoadingExamples: React.FC = () => {
  const [showFullPage, setShowFullPage] = useState(false);
  const [showInline, setShowInline] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const { showLoading, hideLoading } = useLoading();

  const handleFullPageLoading = () => {
    setShowFullPage(true);
    setTimeout(() => setShowFullPage(false), 3000);
  };

  const handleInlineLoading = () => {
    setShowInline(true);
    setTimeout(() => setShowInline(false), 2000);
  };

  const handleButtonLoading = () => {
    setShowButton(true);
    setTimeout(() => setShowButton(false), 1500);
  };

  const handleContextLoading = () => {
    showLoading('Loading with context...');
    setTimeout(() => hideLoading(), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-white text-center mb-8">
          Loading Component Examples
        </h1>

        {/* Full Page Loading */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Full Page Loading</h2>
          <button
            onClick={handleFullPageLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Show Full Page Loading
          </button>
          {showFullPage && <FullPageLoading text="Loading Sultan Bakery..." />}
        </div>

        {/* Inline Loading */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Inline Loading</h2>
          <button
            onClick={handleInlineLoading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Show Inline Loading
          </button>
          {showInline && <InlineLoading text="Loading content..." />}
        </div>

        {/* Button Loading */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Button Loading</h2>
          <button
            onClick={handleButtonLoading}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            {showButton ? <ButtonLoading /> : 'Show Button Loading'}
          </button>
        </div>

        {/* Context Loading */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Context Loading</h2>
          <button
            onClick={handleContextLoading}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
          >
            Show Context Loading
          </button>
        </div>

        {/* Different Spinner Variants */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Spinner Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="text-white mb-2">Glassmorphism</h3>
              <LoadingSpinner variant="glassmorphism" text="Loading..." />
            </div>
            <div className="text-center">
              <h3 className="text-white mb-2">Simple</h3>
              <LoadingSpinner variant="simple" text="Loading..." />
            </div>
            <div className="text-center">
              <h3 className="text-white mb-2">Minimal</h3>
              <LoadingSpinner variant="minimal" />
            </div>
          </div>
        </div>

        {/* Different Sizes */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Different Sizes</h2>
          <div className="flex justify-center items-center space-x-8">
            <div className="text-center">
              <h3 className="text-white mb-2">Small</h3>
              <LoadingSpinner size="small" variant="simple" />
            </div>
            <div className="text-center">
              <h3 className="text-white mb-2">Medium</h3>
              <LoadingSpinner size="medium" variant="simple" />
            </div>
            <div className="text-center">
              <h3 className="text-white mb-2">Large</h3>
              <LoadingSpinner size="large" variant="simple" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage Examples in Comments:
/*
// 1. Full Page Loading (for route changes, initial app load)
import { FullPageLoading } from './components/LoadingSpinner';
<FullPageLoading text="Loading Sultan Bakery..." />

// 2. Inline Loading (for sections, content areas)
import { InlineLoading } from './components/LoadingSpinner';
<InlineLoading text="Loading menu items..." />

// 3. Button Loading (for form submissions, actions)
import { ButtonLoading } from './components/LoadingSpinner';
<button disabled={isLoading}>
  {isLoading ? <ButtonLoading /> : 'Submit Order'}
</button>

// 4. Custom Spinner
import { LoadingSpinner } from './components/LoadingSpinner';
<LoadingSpinner 
  size="medium" 
  text="Loading..." 
  showLogo={true}
  variant="glassmorphism" 
/>

// 5. Using Loading Context (global loading state)
import { useLoading } from './contexts/LoadingContext';

const MyComponent = () => {
  const { showLoading, hideLoading } = useLoading();
  
  const handleAction = async () => {
    showLoading('Processing your order...');
    try {
      await processOrder();
    } finally {
      hideLoading();
    }
  };
  
  return <button onClick={handleAction}>Process Order</button>;
};

// 6. In your pages (like About.tsx example)
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
  // Load your data
  loadData().then(() => setIsLoading(false));
}, []);

if (isLoading) {
  return <InlineLoading text="Loading page content..." />;
}
*/
