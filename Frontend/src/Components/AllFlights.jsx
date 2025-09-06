import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authenticatedFetchJson } from '../Utils/authApi';
import FlightSearch from "./FlightSearch";
import useFetchFlights from "../Utils/useFetchFlights";
import { useSelector } from "react-redux";
import Flight from "./Flight";
import Footer from "./Footer";

const AllFlights = () => {
  const addedFlight = useSelector((state) => state.addFlight.flight);

  const [fetchedFlights, setFetchedFlights] = useState([]);
  const [searchedFlights, setSearchedFlights] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const flights = useFetchFlights();

  useEffect(() => {
    // SAFETY: Ensure flights is always an array
    if (Array.isArray(flights)) {
      setFetchedFlights(flights);
    } else {
      console.warn('Flights data is not an array:', flights);
      setFetchedFlights([]);
    }
  }, [flights]);
  
  // Flights are now properly loaded

  useEffect(() => {
    if (addedFlight && Array.isArray(addedFlight)) {
      setFetchedFlights((fetFli) => [...(Array.isArray(fetFli) ? fetFli : []), ...addedFlight]);
    } else if (addedFlight && typeof addedFlight === 'object') {
      // Single flight object
      setFetchedFlights((fetFli) => [...(Array.isArray(fetFli) ? fetFli : []), addedFlight]);
    }
  }, [addedFlight]);

  // FLIGHT SEARCH FUNCTIONALITY
  // WHY: Users need to search flights by source and destination cities
  // WHAT: Filters flights based on departure and arrival cities
  // BEHAVIOR: Shows search results instead of all flights when search is performed
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // STEP 1: Validate search inputs
      if (!source || !destination || source.trim() === '' || destination.trim() === '') {
        alert('Please enter both source and destination cities to search');
        return;
      }
      
      console.log('SEARCH - Searching flights:', { source, destination });
      
      // Use enhanced authentication API for flight search
      const response = await authenticatedFetchJson(
        `http://localhost:8080/FMS/findBySource&Destination?source=${encodeURIComponent(source)}&destination=${encodeURIComponent(destination)}`,
        { method: 'GET' }
      );
      // Handle search results from enhanced authApi
      console.log('SEARCH - Search results:', response);
      
      // Extract flight data and ensure it's always an array
      const flightData = response && response.data ? response.data : [];
      setSearchedFlights(Array.isArray(flightData) ? flightData : []);
      
      // Show user feedback for search results
      if (!flightData || flightData.length === 0) {
        alert('No flights found for the specified route.');
      }
      
    } catch (error) {
      console.error('Error searching flights:', error);
      
      // Enhanced error handling
      if (error.message.includes('Authentication')) {
        // Authentication errors are handled by authApi (redirects to login)
        return;
      } else if (error.message.includes('Access denied')) {
        alert('Access denied. Please log in to search flights.');
      } else if (error.message.includes('Network error')) {
        alert('Network error while searching flights. Please check your connection.');
      } else {
        alert('Failed to search flights. Please try again.');
      }
      
      setSearchedFlights([]); // Reset search results on error
    }
  };

  // Handle flight deletion with authentication
  const handleDelete = async (id) => {
    try {
      console.log('DELETE - Attempting to delete flight ID:', id);
      
      // Use enhanced authentication API for flight deletion
      const response = await authenticatedFetchJson(
        `http://localhost:8080/FMS/delete/${id}`,
        { method: 'DELETE' }
      );
      
      console.log('DELETE - Flight deleted successfully:', response);
      
      // Update UI by removing deleted flight from the list
      setFetchedFlights(fetchedFlights.filter((f) => f.f_id !== id));
      setSearchedFlights(searchedFlights.filter((f) => f.f_id !== id));
      
      alert('Flight deleted successfully!');
      
    } catch (error) {
      console.error('Error deleting flight:', error);
      
      // Enhanced error handling
      if (error.message.includes('Authentication')) {
        // Authentication errors are handled by authApi (redirects to login)
        return;
      } else if (error.message.includes('Access denied')) {
        alert('Access denied. Only administrators can delete flights.');
      } else if (error.message.includes('not found')) {
        alert('Flight not found. It may have already been deleted.');
      } else if (error.message.includes('Network error')) {
        alert('Network error. Please check your connection and try again.');
      } else {
        alert('Failed to delete flight. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-xl border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
            ✈️ Available Flights
          </h1>
          <p className="text-gray-600 text-center">Find and manage your flights</p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8">
          <FlightSearch
            handleSubmit={handleSubmit}
            source={source}
            setSource={setSource}
            destination={destination}
            setDestination={setDestination}
          />
        </div>

        {/* Flights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {(() => {
            // LOGIC: Determine which flights to show
            let flightsToShow = [];
            
            if (Array.isArray(searchedFlights) && searchedFlights.length > 0) {
              flightsToShow = searchedFlights;
            } else if (Array.isArray(fetchedFlights)) {
              flightsToShow = fetchedFlights;
            }
            
            // EMPTY STATE: Show message when no flights available
            if (flightsToShow.length === 0) {
              return (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-6xl mb-4">✈️</div>
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">No Flights Available</h3>
                  <p className="text-gray-500 mb-6">There are currently no flights to display.</p>
                </div>
              );
            }
            
            // RENDER FLIGHTS: Display available flights
            return flightsToShow.map((f) => {
              return (
                <div
                  key={f.f_id}
                  className="bg-white rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 overflow-hidden"
                >
                  <Link to={"/passenger/" + f.f_id} className="block">
                    <div className="hover:bg-gray-50 transition-colors duration-200">
                      <Flight f={f} />
                    </div>
                  </Link>
                  
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <div className="flex gap-3 justify-center">
                      <Link to={"/update/" + f.f_id}>
                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          ✏️ Update
                        </button>
                      </Link>
                      
                      <button
                        className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
                        onClick={() => handleDelete(f.f_id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>

        {/* Add Flight Button */}
        <div className="flex justify-center">
          <Link to={"/add"}>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 text-lg">
              ➕ Add New Flight
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default AllFlights;
