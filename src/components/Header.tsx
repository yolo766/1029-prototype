import React from 'react';
import { DropletIcon, WavesIcon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-600 rounded-lg blur-sm"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-2 rounded-lg">
                <DropletIcon className="text-white" size={24} />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                AquaSmart
              </h1>
              <p className="text-sm text-gray-600">Smart Water Management</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-blue-600">
            <WavesIcon size={20} />
            <span className="font-medium">AI-Powered Conservation</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;