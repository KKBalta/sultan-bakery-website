import React from 'react';

const GlassmorphismExample: React.FC = () => {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      <h2 className="text-3xl font-bold text-white mb-8">Glassmorphism Design Examples</h2>
      
      {/* Example 1: Primary Glass Card */}
      <div className="glass-primary glass-hover rounded-2xl p-6 max-w-md">
        <h3 className="text-xl font-semibold text-white mb-4">Primary Glass Card</h3>
        <p className="text-white/80 leading-relaxed">
          This card uses the primary glassmorphism style with hover effects. Perfect for main content areas.
        </p>
      </div>
      
      {/* Example 2: Secondary Glass Card */}
      <div className="glass-secondary glass-hover rounded-xl p-4 max-w-sm">
        <h3 className="text-lg font-semibold text-white mb-3">Secondary Glass</h3>
        <p className="text-white/70 text-sm">
          A more subtle glass effect for secondary content or overlays.
        </p>
      </div>
      
      {/* Example 3: Accent Glass Button */}
      <div className="space-x-4">
        <button className="glass-accent glass-hover px-6 py-3 rounded-full text-white font-medium">
          Accent Button
        </button>
        <button className="glass-primary glass-hover px-6 py-3 rounded-full text-white font-medium">
          Primary Button
        </button>
      </div>
      
      {/* Example 4: Active State */}
      <div className="glass-active rounded-lg p-4 max-w-sm">
        <h3 className="text-lg font-semibold text-black mb-2">Active State</h3>
        <p className="text-black/80 text-sm">
          This shows how the active state looks with higher opacity and black text.
        </p>
      </div>
      
      {/* Example 5: Navigation-like Elements */}
      <div className="glass-primary rounded-2xl p-4 max-w-lg">
        <div className="flex space-x-2 mb-4">
          <button className="glass-secondary glass-hover px-4 py-2 rounded-full text-white text-sm">
            Home
          </button>
          <button className="glass-active px-4 py-2 rounded-full text-black text-sm font-semibold">
            About
          </button>
          <button className="glass-secondary glass-hover px-4 py-2 rounded-full text-white text-sm">
            Contact
          </button>
        </div>
        <p className="text-white/80 text-sm">
          Navigation elements with different states using glassmorphism utilities.
        </p>
      </div>
      
      {/* Example 6: Form Elements */}
      <div className="glass-primary rounded-2xl p-6 max-w-md">
        <h3 className="text-xl font-semibold text-white mb-4">Glass Form</h3>
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Enter your name"
            className="w-full glass-secondary glass-hover px-4 py-3 rounded-lg text-white placeholder-white/60 border-0 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full glass-secondary glass-hover px-4 py-3 rounded-lg text-white placeholder-white/60 border-0 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button className="glass-accent glass-hover w-full py-3 rounded-lg text-white font-medium">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismExample;
