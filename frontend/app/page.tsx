import React from 'react';

// Simple SVG Placeholder for the Navigation Icons
const PlaceholderIcon = ({ className = "w-6 h-6" }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Simple 'X' shape as a placeholder */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Component to represent the Main Image Placeholder
const ImagePlaceholder = () => (
  <div className="w-full h-48 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-lg shadow-inner mb-6">
    {/* Large 'X' placeholder as seen in the wireframe */}
    <PlaceholderIcon className="w-20 h-20 text-gray-500" />
  </div>
);


const HomePage = () => {
  return (
    // Outer container for the entire page, centered and limiting width for mobile feel
    <div className="min-h-screen bg-gray-100 flex justify-center p-4 pt-8 pb-20">
      
      {/* Content wrapper with max width for mobile design */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-xl overflow-hidden">
        
        {/* Main Content Area */}
        <div className="p-4 sm:p-6 space-y-6">

          {/* Frame 1 Header / Top Section */}
          <h1 className="text-xl font-bold text-gray-800 border-b pb-2">
            Frame 1 (Prototype Home)
          </h1>

          {/* Top Image Placeholder */}
          <ImagePlaceholder />

          {/* INSTRUCTIONS Section */}
          <section className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 uppercase">
              Instructions
            </h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p>Welcome to the prototype! This is the main screen for user interaction and guidance.</p>
              <ul className="list-disc list-inside ml-2">
                <li>Feature A: Detailed steps for using the application.</li>
                <li>Feature B: Tips and tricks for an optimal experience.</li>
              </ul>
              <p className="text-blue-600 font-medium cursor-pointer hover:underline">
                [Tap here for full guide]
              </p>
            </div>
          </section>

          {/* ABOUT Section */}
          <section className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
            <h2 className="text-lg font-semibold text-gray-700 mb-3 uppercase">
              About
            </h2>
            <div className="text-sm text-gray-600 space-y-2">
              <p>This application is designed to link our Next.js frontend with our Python/Flask backend, focusing on real-time data visualization (like the /map page).</p>
              <p>Prototype Version: 0.1 Beta</p>
              <p className="text-purple-600 font-medium cursor-pointer hover:underline">
                [View Legal Information]
              </p>
            </div>
          </section>

        </div>

        {/* Sticky Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-300 shadow-2xl rounded-t-xl z-10">
          <div className="flex justify-around items-center h-14">
            
            {/* Nav Item 1 */}
            <a href="/" className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition-colors">
              <PlaceholderIcon />
              <span className="text-xs">Home</span>
            </a>

            {/* Nav Item 2 (Link to your new /map page) */}
            <a href="/map" className="flex flex-col items-center text-gray-500 hover:text-blue-800 transition-colors">
              <PlaceholderIcon />
              <span className="text-xs">Map</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HomePage;
