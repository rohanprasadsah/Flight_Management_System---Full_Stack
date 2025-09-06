import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { authenticatedFetchJson, forceLoginRedirect } from '../Utils/authApi';

const UpdateFlightById = () => {
  const [flight, setFlight] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // OLD CODE - without authentication (commented out)
    // const fetchById = async (id) => {
    //   const flight = await fetch("http://localhost:8080/FMS/find/" + id);
    //   const data = await flight.json();
    //   setFlight(data.data);
    // };
    
    // ENHANCED CODE - using authApi with token refresh and better error handling
    const fetchById = async (id) => {
      try {
        console.log('UPDATE - Fetching flight details for ID:', id);
        
        // Use enhanced authentication API that handles:
        // - Token expiration checking
        // - Automatic re-login on expired tokens
        // - Better error handling for auth issues
        const response = await authenticatedFetchJson(
          `http://localhost:8080/FMS/find/${id}`,
          { 
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        );
        
        // Set flight data if request successful
        if (response && response.data) {
          setFlight(response.data);
          console.log('UPDATE - Flight data loaded successfully:', response.data);
        } else {
          console.error('UPDATE - No flight data in response');
          alert('Flight not found or you do not have permission to view it.');
        }
        
      } catch (error) {
        console.error('Error fetching flight for update:', error);
        
        // Handle authentication errors - only clear tokens on 401 from backend
        if (error.message.includes('Authentication failed') || error.message.includes('No authentication token')) {
          localStorage.clear();
          alert('Please login again to continue.');
          window.location.href = '/login';
          return;
        } else if (error.message.includes('Access denied')) {
          alert('You do not have permission to view this flight.');
        } else if (error.message.includes('not found')) {
          alert('Flight not found. It may have been deleted.');
        } else if (error.message.includes('redirected')) {
          alert('Server configuration issue. Please try again or contact support.');
        } else {
          alert('Failed to load flight details. Please try again.');
        }
      }
    };
    
    if (id) {
      fetchById(id);
    } else {
      alert("ID is not valid !!");
    }
  }, [id]);

  // ENHANCED FLIGHT UPDATE FUNCTIONALITY
  // FIXES: Token expiration issues, better error handling, automatic re-login
  const handleUpdateFlight = async (fid, f) => {
    try {
      // STEP 1: Validate flight data before sending
      if (!f.name || !f.source || !f.destination || !f.time || !f.price) {
        alert('Please fill in all required fields (Name, Source, Destination, Time, Price)');
        return;
      }
      
      console.log('UPDATE - Attempting to update flight ID:', fid);
      console.log('UPDATE - Flight data:', f);
      
      // STEP 2: Convert price to number for backend (BigDecimal)
      const flightData = {
        ...f,
        price: parseFloat(f.price) || 0
      };
      
      console.log('UPDATE - Sending flight data:', flightData);
      
      // Use enhanced authentication API
      const response = await authenticatedFetchJson(
        `http://localhost:8080/FMS/putUpdate/${fid}`,
        {
          method: 'PUT',
          body: JSON.stringify(flightData)
        }
      );
      
      // STEP 3: Handle successful update
      console.log('UPDATE - Flight updated successfully:', response);
      alert('Flight updated successfully! Redirecting to home page...');
      
      // Redirect to home after successful update
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
      
    } catch (error) {
      console.error('Error updating flight:', error);
      
      // Handle authentication errors - only force login on clear auth failures
      if (error.message.includes('No authentication token')) {
        forceLoginRedirect();
        return;
      } else if (error.message.includes('Authentication failed')) {
        alert('Authentication failed. Please try logging in again.');
        window.location.href = '/login';
        return;
      } else if (error.message.includes('Access denied')) {
        alert('Access denied. Only administrators and staff can update flights.');
      } else if (error.message.includes('Invalid request')) {
        alert('Invalid flight data. Please check all fields and try again.');
      } else if (error.message.includes('not found')) {
        alert('Flight not found. It may have been deleted.');
      } else if (error.message.includes('Network error')) {
        alert('Network error. Please check your internet connection and try again.');
      } else {
        alert('Failed to update flight. Please try again later.');
      }
    }
  };

  return flight == null ? (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="text-center mt-4 text-gray-600 font-semibold">
          Loading flight details...
        </p>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form className="space-y-6">
            <fieldset className="border-2 border-indigo-200 rounded-xl p-6 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg">
              <legend className="px-4 py-2 font-bold text-xl text-indigo-800 bg-white rounded-lg shadow-md border border-indigo-200">
                Update Flight
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Flight Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Enter flight name"
                    onChange={(e) =>
                      setFlight({ ...flight, name: e.target.value })
                    }
                    value={flight.name || ''}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="source"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Source
                  </label>
                  <input
                    type="text"
                    id="source"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Departure city"
                    onChange={(e) =>
                      setFlight({ ...flight, source: e.target.value })
                    }
                    value={flight.source || ''}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="destination"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Destination
                  </label>
                  <input
                    type="text"
                    id="destination"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Arrival city"
                    onChange={(e) =>
                      setFlight({ ...flight, destination: e.target.value })
                    }
                    value={flight.destination || ''}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="time"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Departure Time
                  </label>
                  <input
                    type="text"
                    id="time"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="HH:MM format"
                    onChange={(e) =>
                      setFlight({ ...flight, time: e.target.value })
                    }
                    value={flight.time || ''}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="price"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Price (₹)
                  </label>
                  <input
                    type="text"
                    id="price"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Ticket price"
                    onChange={(e) =>
                      setFlight({ ...flight, price: e.target.value })
                    }
                    value={flight.price || ''}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label
                    htmlFor="ImageURL"
                    className="block text-sm font-semibold text-gray-700"
                  >
                    Image URL
                  </label>
                  <input
                    type="text"
                    id="ImageURL"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Image URL"
                    onChange={(e) =>
                      setFlight({ ...flight, img: e.target.value })
                    }
                    value={flight.img || ''}
                  />
                </div>
              </div>
            </fieldset>
          </form>

          <div className="flex justify-center gap-4 mt-8">
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300"
              onClick={() => handleUpdateFlight(flight.f_id, flight)}
            >
              ✈️ Update Flight
            </button>
            <Link to={"/"}>
              <button className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300">
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateFlightById;
