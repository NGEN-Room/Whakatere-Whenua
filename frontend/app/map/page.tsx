import React, { useState, useEffect, useCallback } from 'react';

// --- Utility Icons ---
const PlaceholderIcon = ({ className = "w-6 h-6", children }) => (
  <svg 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {children}
  </svg>
);

const SearchIcon = () => (
    <PlaceholderIcon className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></PlaceholderIcon>
);

const ChevronLeftIcon = () => (
    <PlaceholderIcon className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></PlaceholderIcon>
);

const ChevronDownIcon = () => (
    <PlaceholderIcon className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></PlaceholderIcon>
);

const LocationMarkerIcon = () => (
    <PlaceholderIcon className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></PlaceholderIcon>
);


// --- Component to handle Initial Region Selection (Frame 3) ---
const RegionSelectionModal = ({ onSelectRegion, regions, isLoading, error }) => {
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm bg-white shadow-2xl rounded-xl p-6 text-center border-2 border-gray-400">
                <h2 className="text-xl font-bold text-gray-800 mb-6 uppercase tracking-wider">
                    Select Region:
                </h2>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                    {isLoading && <p className="text-gray-500">Loading regions from Flask...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}
                    {!isLoading && regions.map(region => (
                        <button
                            key={region.id}
                            onClick={() => onSelectRegion(region)}
                            className="w-full flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-blue-50 hover:border-blue-500 transition duration-150"
                        >
                            <span className="font-medium text-gray-700">{region.name}</span>
                            {/* Placeholder box/icon for region selection item */}
                            <PlaceholderIcon className="w-5 h-5 text-gray-400" /> 
                        </button>
                    ))}
                    {!isLoading && regions.length === 0 && !error && (
                        <p className="text-gray-500">No regions available.</p>
                    )}
                </div>
                {/* Placeholder icon at the bottom of the modal, as per wireframe */}
                <div className="mt-6 flex justify-center">
                    <PlaceholderIcon className="w-8 h-8 text-gray-400" />
                </div>
            </div>
        </div>
    );
};


// --- The Main Map View Component (Frame 4) ---
const MapView = ({ selectedRegion }) => {
    // State for the three main dynamic UI elements
    const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
    const [isBottomPanelOpen, setIsBottomPanelOpen] = useState(false); // Starts closed, toggled open by arrow
    
    // Mock slider state
    const [sliderValue, setSliderValue] = useState(2015);
    const minYear = 2005;
    const maxYear = 2025;

    // Toggle handlers
    const toggleSidePanel = useCallback(() => setIsSidePanelOpen(prev => !prev), []);
    const toggleBottomPanel = useCallback(() => setIsBottomPanelOpen(prev => !prev), []);

    // Placeholder content for the map area (The big X box from Frame 4)
    const MapContentPlaceholder = (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 border-4 border-dashed border-gray-300">
            {/* The large X placeholder */}
            <PlaceholderIcon className="w-32 h-32 text-gray-400">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M6 18L18 6M6 6l12 12" />
            </PlaceholderIcon>
        </div>
    );

    // Side Data Panel (acts as "all the data sets")
    const SideDataPanel = (
        <div 
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-30 transform transition-transform duration-300 p-4 pt-16
            ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
            <h3 className="text-xl font-bold mb-4 text-gray-800">Data Sets</h3>
            <p className="text-sm text-gray-600 mb-2">MVP: Single Data Set Active</p>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-semibold text-green-700">Active Data Set Alpha</p>
                <p className="text-xs text-gray-500">Region: {selectedRegion.name}</p>
            </div>
            
            {/* Close button for side panel - small arrow pointing left */}
            <button 
                onClick={toggleSidePanel} 
                className="absolute top-1/3 -right-4 transform -translate-y-1/2 p-1 bg-white border border-gray-300 rounded-r-lg shadow-md hover:bg-gray-100 transition duration-150"
                aria-label="Close Data Panel"
            >
                <ChevronLeftIcon className="w-4 h-4" />
            </button>
        </div>
    );

    // Bottom Slider Panel (Toggles with the arrow button)
    const BottomSliderPanel = (
        // The bottom navigation bar is fixed, so this panel floats right above it (h-14 is the nav height)
        <div 
            className={`absolute bottom-14 left-0 right-0 max-w-md mx-auto bg-white border border-gray-300 shadow-xl rounded-t-xl z-20 
            transform transition-all duration-300 ease-in-out
            ${isBottomPanelOpen ? 'translate-y-0 h-28' : 'translate-y-20 h-8'}`}
        >
            {/* Toggle Button - Central arrow pointing up/down */}
            <button 
                onClick={toggleBottomPanel} 
                className="absolute -top-3 left-1/2 transform -translate-x-1/2 p-1 bg-white border border-gray-300 rounded-full shadow-lg hover:bg-gray-100 transition duration-150"
                aria-label={isBottomPanelOpen ? "Collapse Time Slider" : "Expand Time Slider"}
            >
                {/* Uses ChevronDownIcon and rotates it for the "up" arrow on the wireframe */}
                <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isBottomPanelOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>

            {/* Slider Content (Visible only when open) */}
            <div className={`p-4 transition-opacity duration-300 ${isBottomPanelOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-700 mb-2">
                    <span>{minYear}</span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-600 transform rotate-180" />
                    <span>{maxYear}</span>
                </div>
                <input 
                    type="range"
                    min={minYear}
                    max={maxYear}
                    step="1"
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg transition-colors duration-200"
                    // Custom styles for better visibility
                    style={{ 
                        '--tw-ring-color': '#3b82f6', 
                        '--tw-ring-offset-width': '0px', 
                        '--tw-ring-offset-color': '#fff' 
                    }}
                />
            </div>
        </div>
    );


    return (
        <div className="relative w-full h-full">
            {/* Map Area (Frame 4 - large X) */}
            {MapContentPlaceholder}

            {/* UI Overlays */}
            <div className="absolute inset-0">
                {/* Search and Side Panel Toggle (Top Left) */}
                <div className="absolute top-3 left-3 flex items-center space-x-2 z-10">
                    {/* Search Icon */}
                    <button className="p-2 bg-white rounded-full shadow-lg text-gray-600 hover:text-blue-500 transition-colors" aria-label="Search">
                        <SearchIcon />
                    </button>
                    
                    {/* Side Panel Toggle (Placeholder box/icon next to search) */}
                    <button 
                        onClick={toggleSidePanel} 
                        className={`p-2 bg-white rounded-full shadow-lg text-gray-600 transition-colors ${isSidePanelOpen ? 'bg-blue-100 text-blue-600' : 'hover:text-blue-500'}`}
                        aria-label="Toggle Data Panel"
                    >
                        <LocationMarkerIcon /> 
                    </button>
                </div>
            </div>

            {/* Side Panel Overlay */}
            {SideDataPanel}
            
            {/* Bottom Slider Panel */}
            {BottomSliderPanel}

            {/* Footer space to push the main content up */}
            <div className="h-14"></div> 
        </div>
    );
};


// --- Main Page Component ---
const MapPage = () => {
    // State to manage the user's region selection (null means modal is visible)
    const [selectedRegion, setSelectedRegion] = useState(null);
    const [regions, setRegions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Define the API URL for regions
    const API_URL = 'http://127.0.0.1:5000/api/regions'; 

    // Fetch regions for the initial modal
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();
                setRegions(result.data || []);
            } catch (e) {
                console.error("Failed to fetch regions:", e);
                setError(e.message || "Failed to load regions from Python backend.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchRegions();
    }, []);


    // Handle region selection from modal. This transitions the UI to the map view.
    const handleSelectRegion = (region) => {
        setSelectedRegion(region);
        // In a real app, you might fetch map data specific to this region here.
    };
    
    // Custom container to simulate mobile screen dimensions
    return (
        <div className="relative min-h-screen bg-gray-50 flex justify-center items-start pt-4 sm:pt-8 pb-14 overflow-hidden">
             
            <div className="relative w-full max-w-md h-[90vh] bg-white shadow-2xl rounded-xl border border-gray-300 overflow-hidden">
                
                {/* Map Content (Frame 4) */}
                {selectedRegion ? (
                    <MapView selectedRegion={selectedRegion} />
                ) : (
                    // Initial state before regions load or after selection (covered by modal)
                    <div className="flex items-center justify-center w-full h-full text-gray-500">
                        {isLoading ? "Fetching regions..." : "Awaiting Region Selection..."}
                    </div>
                )}
                
                {/* Initial Region Selection Modal (Frame 3) - Only shows if no region is selected */}
                {!selectedRegion && (
                    <RegionSelectionModal 
                        onSelectRegion={handleSelectRegion}
                        regions={regions}
                        isLoading={isLoading}
                        error={error}
                    />
                )}
                
                {/* Fixed Bottom Navigation (Shared with Home Page) */}
                <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-300 shadow-2xl rounded-t-xl z-30">
                    <div className="flex justify-around items-center h-14">
                        
                        {/* Home Link */}
                        <a href="/" className="flex flex-col items-center text-gray-500 hover:text-blue-800 transition-colors">
                            <PlaceholderIcon />
                            <span className="text-xs">Home</span>
                        </a>

                        {/* Map Link (Active) */}
                        <a href="/map" className="flex flex-col items-center text-blue-600 hover:text-blue-800 transition-colors">
                            <PlaceholderIcon />
                            <span className="text-xs">Map</span>
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MapPage;
