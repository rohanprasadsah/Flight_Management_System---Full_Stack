import { useState } from "react";

const FlightSearch = ({
  source,
  setSource,
  destination,
  setDestination,
  handleSubmit,
}) => {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🔍 Search Flights</h2>
        <p className="text-gray-600">Find flights by source and destination</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Source Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🛩️ Departure City
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg bg-white"
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="Enter departure city"
              required
            />
          </div>
          
          {/* Destination Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              🏠 Arrival City
            </label>
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg bg-white"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter arrival city"
              required
            />
          </div>
        </div>
        
        {/* Search Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 text-lg"
            type="submit"
          >
            🔍 Search Flights
          </button>
        </div>
      </form>
    </div>
  );
};

export default FlightSearch;
