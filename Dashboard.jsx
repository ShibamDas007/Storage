// pages/Dashboard.jsx
import React from 'react';
import { SearchIcon } from '../components/Icons';

const Dashboard = () => {
  const recentSearches = [
    { query: 'Machine learning algorithms', time: '2 mins ago' },
    { query: 'Neural network optimization', time: 'Yesterday' },
    { query: 'Data visualization techniques', time: 'Apr 8' },
  ];

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
      <div className="flex justify-center mb-12 max-w-md mx-auto">
        <img src="src\assets\nuralnetwork_cleaned.svg" className='bg-cover w-[20%]'/>
      </div>

      {/* Search Bar - Fixed positioning with flex layout */}
      <div className="max-w-xl mx-auto relative mb-16">
        <div className="bg-white rounded-full shadow-md flex items-center p-3">
          <div className="ml-3 mr-4 flex-shrink-0">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 min-w-0 bg-transparent outline-none text-slate-800 placeholder-slate-400"
          />
          <div className="flex-shrink-0 ml-2">
            <button className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white">
              <span className="font-bold text-lg">+</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      <div className="max-w-xl mx-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-4 text-center">
          Recent Searches
        </h2>
        
        {recentSearches.map((search, index) => (
          <div 
            key={index}
            className="bg-white rounded-lg shadow-md p-4 mb-4 flex justify-between items-center cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => console.log(`Selected search: ${search.query}`)}
          >
            <span className="text-slate-800">{search.query}</span>
            <span className="text-sm text-slate-400">{search.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

