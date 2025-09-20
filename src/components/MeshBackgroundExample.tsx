import React from 'react';
import { PrimaryMeshBackground, SecondaryMeshBackground, HeroMeshBackground } from './MeshBackground';
import { MeshGradient } from '@paper-design/shaders-react';

const MeshBackgroundExample: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-3xl font-bold text-white">Mesh Background Examples</h2>
      
      {/* Example 1: Primary Mesh Background */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-xl">
        <PrimaryMeshBackground 
          opacity={0.5} 
          speed={0.1} 
          className="absolute inset-0" 
        />
        <div className="relative z-10 flex items-center justify-center h-full text-white text-2xl font-semibold">
          Primary Mesh (Opacity 0.5, Speed 0.1)
        </div>
      </div>
      
      {/* Example 2: Secondary Mesh Background */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-xl">
        <SecondaryMeshBackground 
          opacity={0.7} 
          speed={0.3} 
          className="absolute inset-0" 
        />
        <div className="relative z-10 flex items-center justify-center h-full text-white text-2xl font-semibold">
          Secondary Mesh (Opacity 0.7, Speed 0.3)
        </div>
      </div>
      
      {/* Example 3: Hero Mesh Background */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-xl">
        <HeroMeshBackground 
          opacity={0.6} 
          speed={0.5} 
          className="absolute inset-0" 
        />
        <div className="relative z-10 flex items-center justify-center h-full text-white text-2xl font-semibold">
          Hero Mesh (Opacity 0.6, Speed 0.5)
        </div>
      </div>
      
      {/* Example 4: Custom Mesh Background */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-xl">
        <div className="absolute inset-0">
          <MeshGradient
            speed={0.8}
            colors={['#FF00FF', '#00FFFF', '#FFFF00']}
            style={{ width: '100%', height: '100%', opacity: 0.4 }}
          />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full text-white text-2xl font-semibold">
          Custom Mesh (Pink, Cyan, Yellow)
        </div>
      </div>
    </div>
  );
};

export default MeshBackgroundExample;