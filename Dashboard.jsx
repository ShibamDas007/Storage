// pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { SearchIcon } from '../components/Icons';
import NexusAISvg from '../components/NexusAISvg';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([
    { id: 1, query: 'Machine learning algorithms', time: '2 mins ago' },
    { id: 2, query: 'Neural network optimization', time: 'Yesterday' },
    { id: 3, query: 'Data visualization techniques', time: 'Apr 8' },
  ]);

  // Function to handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchQuery.trim() === '') return;
    
    // Create timestamp for new search
    const now = new Date();
    let timeDisplay = 'Just now';
    
    // Add new search to history
    const newSearch = {
      id: Date.now(), // Use timestamp as unique ID
      query: searchQuery,
      time: timeDisplay,
      timestamp: now
    };
    
    // Add to beginning of array (most recent first)
    setSearchHistory([newSearch, ...searchHistory]);
    
    // Clear search input
    setSearchQuery('');
  };

  // Function to update relative timestamps
  useEffect(() => {
    const updateTimeDisplays = () => {
      setSearchHistory(prevHistory => 
        prevHistory.map(item => {
          if (!item.timestamp) {
            // For initial static items that don't have a timestamp
            return item;
          }
          
          const now = new Date();
          const diff = Math.floor((now - item.timestamp) / 1000); // difference in seconds
          
          let timeDisplay;
          if (diff < 60) {
            timeDisplay = 'Just now';
          } else if (diff < 3600) {
            const mins = Math.floor(diff / 60);
            timeDisplay = `${mins} min${mins > 1 ? 's' : ''} ago`;
          } else if (diff < 86400) {
            const hours = Math.floor(diff / 3600);
            timeDisplay = `${hours} hour${hours > 1 ? 's' : ''} ago`;
          } else if (diff < 172800) {
            timeDisplay = 'Yesterday';
          } else {
            const date = item.timestamp;
            timeDisplay = `${date.getMonth() + 1}/${date.getDate()}`;
          }
          
          return { ...item, time: timeDisplay };
        })
      );
    };
    
    // Set initial timestamps for static items
    setSearchHistory(prevHistory => 
      prevHistory.map(item => {
        if (!item.timestamp) {
          let timestamp;
          if (item.time === '2 mins ago') {
            timestamp = new Date(Date.now() - 2 * 60 * 1000);
          } else if (item.time === 'Yesterday') {
            timestamp = new Date(Date.now() - 24 * 60 * 60 * 1000);
          } else if (item.time === 'Apr 8') {
            const now = new Date();
            timestamp = new Date(now.getFullYear(), 3, 8); // April is month 3 (0-indexed)
          } else {
            timestamp = new Date();
          }
          return { ...item, timestamp };
        }
        return item;
      })
    );
    
    // Update times every minute
    const intervalId = setInterval(updateTimeDisplays, 60000);
    
    // Cleanup
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle removal of search history item
  const removeSearchItem = (id) => {
    setSearchHistory(searchHistory.filter(item => item.id !== id));
  };

  // Function to use a search from history
  const useSearchFromHistory = (query) => {
    setSearchQuery(query);
    // Focus the search input
    document.getElementById('search-input').focus();
  };

  return (
    <div className="flex-1 px-4 md:px-10 py-8 overflow-y-auto">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-3">
          Discover the Power of AI
        </h1>
        <p className="text-slate-500">
          Intelligent search that understands your needs
        </p>
      </div>

      {/* Neural Network Visualization */}
      <div className="flex justify-center max-w-md mx-auto">
        <img src="src\assets\nuralnetwork_cleaned.svg" className='w-[40%] '/>
      </div>

      {/* Search Bar - Fixed positioning with flex layout */}
      <form onSubmit={handleSearch} className="max-w-xl mx-auto relative mb-16">
        <div className="bg-white rounded-full shadow-md flex items-center p-3">
          <div className="ml-3 mr-4 flex-shrink-0">
            <SearchIcon />
          </div>
          <input
            id="search-input"
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 min-w-0 bg-transparent outline-none text-slate-800 placeholder-slate-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex-shrink-0 ml-2">
            <button 
              type="submit" 
              className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            >
              <span className="font-bold text-lg">+</span>
            </button>
          </div>
        </div>
      </form>

      {/* Recent Searches - Dynamic */}
      <div className="max-w-xl mx-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">
          Recent Searches {searchHistory.length > 0 ? `(${searchHistory.length})` : ''}
        </h2>
        
        {searchHistory.length > 0 ? (
          searchHistory.map((search) => (
            <div 
              key={search.id}
              className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center group"
            >
              <span 
                className="text-slate-800 cursor-pointer hover:text-indigo-600 transition-colors"
                onClick={() => useSearchFromHistory(search.query)}
              >
                {search.query}
              </span>
              <div className="flex items-center">
                <span className="text-sm text-slate-400 mr-3">{search.time}</span>
                <button 
                  onClick={() => removeSearchItem(search.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  aria-label="Remove search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-slate-500 bg-white rounded-lg shadow-md p-8">
            <p>No search history yet. Try searching for something!</p>
          </div>
        )}
        
        {searchHistory.length > 0 && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => setSearchHistory([])}
              className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
            >
              Clear all history
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;