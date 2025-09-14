import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
    if (Array.isArray(flights)) {
      setFetchedFlights(flights);
    } else {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!source || !destination || source.trim() === '' || destination.trim() === '') {
      alert('Please enter both source and destination cities to search');
      return;
    }
    
    const cleanSource = source.trim();
    const cleanDestination = destination.trim();
    const searchUrl = `http://localhost:8080/FMS/findBySourceAndDestination?source=${cleanSource}&destination=${cleanDestination}`;
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to search flights.');
        return;
      }
      
      const response = await fetch(searchUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        redirect: 'follow',
        mode: 'cors'
      });
      
      if (response.status === 302) {
        try {
          const data = await response.json();
          let flights = [];
          if (data && data.data && Array.isArray(data.data)) {
            flights = data.data;
          } else if (Array.isArray(data)) {
            flights = data;
          }
          
          setSearchedFlights(flights);
          
          if (flights.length === 0) {
            alert(`No flights found from "${cleanSource}" to "${cleanDestination}".`);
          } else {
            alert(`Found ${flights.length} flight(s) from "${cleanSource}" to "${cleanDestination}"!`);
          }
          return;
        } catch (e) {
          setSearchedFlights([]);
          alert(`No flights found from "${cleanSource}" to "${cleanDestination}".`);
          return;
        }
      }
      
      if (!response.ok) {
        if (response.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.clear();
          window.location.href = '/login';
          return;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      let flights = [];
      if (data && data.data && Array.isArray(data.data)) {
        flights = data.data;
      } else if (Array.isArray(data)) {
        flights = data;
      }
      
      setSearchedFlights(flights);
      
      if (flights.length === 0) {
        alert(`No flights found from "${cleanSource}" to "${cleanDestination}".`);
      } else {
        alert(`Found ${flights.length} flight(s) from "${cleanSource}" to "${cleanDestination}"!`);
      }
      
    } catch (error) {
      if (error.message.includes('401') || error.message.includes('Authentication')) {
        alert('Session expired. Please log in again.');
        localStorage.clear();
        window.location.href = '/login';
      } else if (error.message.includes('404')) {
        alert(`No flights found from "${cleanSource}" to "${cleanDestination}".`);
      } else if (error.message.includes('302')) {
        alert(`Search completed but no flights found from "${cleanSource}" to "${cleanDestination}".`);
      } else {
        alert('Search failed. Please check your connection and try again.');
      }
      
      setSearchedFlights([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please log in to delete flights.');
        return;
      }
      
      const response = await fetch(`http://localhost:8080/FMS/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) {
        if (response.status === 401) {
          alert('Session expired. Please log in again.');
          localStorage.clear();
          window.location.href = '/login';
          return;
        } else if (response.status === 403) {
          alert('Access denied. Only administrators can delete flights.');
          return;
        } else if (response.status === 404) {
          alert('Flight not found. It may have already been deleted.');
          return;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      setFetchedFlights(fetchedFlights.filter((f) => f.f_id !== id));
      setSearchedFlights(searchedFlights.filter((f) => f.f_id !== id));
      
      alert('Flight deleted successfully!');
      
    } catch (error) {
      if (error.message.includes('401') || error.message.includes('Authentication')) {
        alert('Session expired. Please log in again.');
        localStorage.clear();
        window.location.href = '/login';
      } else if (error.message.includes('403') || error.message.includes('Access denied')) {
        alert('Access denied. Only administrators can delete flights.');
      } else if (error.message.includes('404') || error.message.includes('not found')) {
        alert('Flight not found. It may have already been deleted.');
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
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
          
          {/* Clear Search Button - Show when search results are displayed */}
          {searchedFlights.length > 0 && (
            <div className="flex justify-center mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setSearchedFlights([]);
                  setSource('');
                  setDestination('');
                }}
                className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                ↩️ Show All Flights
              </button>
            </div>
          )}
        </div>

        {/* Flight Results Header */}
        {searchedFlights.length > 0 && (
          <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 text-center">
              🔍 Search Results: {searchedFlights.length} flight{searchedFlights.length !== 1 ? 's' : ''} found from "{source}" to "{destination}"
            </h3>
          </div>
        )}
        
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
