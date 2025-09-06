import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Passengers = () => {
  const [passengers, setPassengers] = useState({ passengers: [], name: "" });
  const [search, setSearch] = useState("");
  const [searchedPassengers, setSearchedPassengers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchFlightAndPassengers = async () => {
      try {
        // STEP 1: Get JWT token for authentication
        const token = localStorage.getItem('token');
        const headers = {
          'Content-Type': 'application/json'
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
        
        // CORRECT APPROACH: Get flight details which includes passengers
        console.log('Getting flight with passengers for ID:', id);
        console.log('User token:', token?.substring(0, 20) + '...');
        console.log('Headers:', headers);
        
        // WORKING SOLUTION: Use findAll (which works) and filter for specific flight
        const allFlightsRes = await fetch('http://localhost:8080/FMS/findAll', {
          method: 'GET',
          headers: headers
        });
        
        console.log('All flights response status:', allFlightsRes.status);
        
        if (!allFlightsRes.ok) {
          console.error('Failed to fetch all flights:', allFlightsRes.status);
          setPassengers({ passengers: [], name: `Flight ${id}` });
          return;
        }
        
        const allFlightsData = await allFlightsRes.json();
        console.log('All flights data received');
        
        const flights = Array.isArray(allFlightsData.data) ? allFlightsData.data : [];
        console.log('Total flights:', flights.length);
        
        // Find the specific flight
        const targetFlight = flights.find(f => f.f_id === parseInt(id));
        console.log('Target flight found:', !!targetFlight);
        
        if (!targetFlight) {
          setPassengers({ passengers: [], name: `Flight ${id} Not Found` });
          return;
        }
        
        // Check if flight has passengers
        const flightPassengers = Array.isArray(targetFlight.passengers) ? targetFlight.passengers : [];
        console.log('Flight passengers:', flightPassengers.length);
        
        setPassengers({
          passengers: flightPassengers,
          name: targetFlight.name
        });
        
      } catch (error) {
        // STEP 5: Handle network errors and other exceptions gracefully
        // WHY: Prevents app crash when network is down or API is unavailable
        console.error('Error fetching flight passengers:', error);
        setPassengers({ passengers: [], name: 'Error Loading Flight' });
      }
    };
    
    if (id) {
      fetchFlightAndPassengers();
    }
  }, [id]);

  const handleDelete = async (id) => {
    // PASSENGER DELETION FUNCTIONALITY
    // WHY: Admins and staff need ability to remove passengers from flights
    // SECURITY: Only ADMIN role can delete passengers (as per backend @PreAuthorize)
    // BEHAVIOR: Removes passenger from database and updates UI immediately
    
    // STEP 1: Confirm deletion with user
    // WHY: Deletion is irreversible, user should confirm action
    if (!confirm('Are you sure you want to delete this passenger? This action cannot be undone.')) {
      return; // User cancelled deletion
    }
    
    try {
      // STEP 2: Get JWT token for authentication
      // WHY: Deletion requires ADMIN role authentication as per backend security
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };
      
      // Add Authorization header in Bearer format
      // REQUIRED: Backend JWT filter expects "Bearer <token>" format
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // STEP 3: Make authenticated DELETE request
      // ENDPOINT: DELETE /FMS/Passenger/delete/{id}
      // SECURITY: Backend will verify user has ADMIN role before allowing deletion
      const deletedPassenger = await fetch(
        "http://localhost:8080/FMS/Passenger/delete/" + id,
        { 
          method: "DELETE",
          headers: headers
        }
      );
      
      // STEP 4: Handle API response
      // WHY: Check for permission errors (403) or other failures
      if (!deletedPassenger.ok) {
        if (deletedPassenger.status === 403) {
          alert('Access denied. Only administrators can delete passengers.');
        } else {
          alert('Failed to delete passenger. Please try again.');
        }
        console.error('Failed to delete passenger:', deletedPassenger.status);
        return;
      }
      
      // STEP 5: Update UI immediately (optimistic update)
      // WHY: Provide immediate feedback to user without refetching all data
      // WHAT: Remove deleted passenger from both current passengers and search results
      setPassengers((prev) => ({
        ...prev,
        passengers: Array.isArray(prev.passengers) ? prev.passengers.filter((p) => p.p_id !== id) : []
      }));
      
      // Also remove from search results if they exist
      setSearchedPassengers((prev) => 
        Array.isArray(prev) ? prev.filter((p) => p.p_id !== id) : []
      );
      
      alert('Passenger deleted successfully!');
      
    } catch (error) {
      // STEP 6: Handle network errors and exceptions
      // WHY: Network issues should not crash the application
      console.error('Error deleting passenger:', error);
      alert('Network error while deleting passenger. Please check your connection.');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    // PASSENGER SEARCH FUNCTIONALITY
    // WHY: Users need to search for specific passengers by name
    // WHAT: Searches across ALL passengers in the system, not just current flight
    // BEHAVIOR: Shows search results instead of current flight passengers when search is performed
    
    try {
      // STEP 1: Validate search input
      // WHY: Prevent empty searches that waste API calls
      if (!search || search.trim() === '') {
        alert('Please enter a first name to search');
        return;
      }
      
      // STEP 2: Get JWT token for authentication
      // WHY: Backend requires authentication for passenger search operations
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };
      
      // Add Authorization header in Bearer format
      // FORMAT: "Bearer <jwt-token>" as expected by Spring Security JWT filter
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      // STEP 3: Make authenticated search request
      // ENDPOINT: GET /FMS/Passenger/findByFirstName?firstName={name}
      // RETURNS: All passengers with matching first name across all flights
      const res = await fetch(
        "http://localhost:8080/FMS/Passenger/findByFirstName?firstName=" + encodeURIComponent(search),
        {
          method: 'GET',
          headers: headers
        }
      );
      
      // STEP 4: Handle API response
      // WHY: Check for authentication errors (403) or server errors (500)
      if (!res.ok) {
        console.error('Failed to search passengers:', res.status);
        alert('Failed to search passengers. Please check your permissions.');
        return;
      }
      
      const resData = await res.json();
      console.log('Search results:', resData.data);
      
      // STEP 5: Update UI with search results
      // WHY: Show search results instead of flight passengers
      // SAFETY: Use empty array if data is not an array to prevent map() errors
      setSearchedPassengers(Array.isArray(resData.data) ? resData.data : []);
      
      // Show message if no results found
      if (!resData.data || resData.data.length === 0) {
        alert('No passengers found with that first name.');
      }
      
    } catch (error) {
      // STEP 6: Handle network errors and exceptions
      // WHY: Network issues, server down, or JSON parsing errors should not crash the app
      console.error('Error searching passengers:', error);
      alert('Error searching passengers. Please try again.');
      setSearchedPassengers([]); // Reset search results on error
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
            💺 Passengers of {passengers.name}
          </h1>
          <p className="text-gray-600 text-center">Manage flight passengers</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">🔍 Search Passengers</h2>
            <p className="text-gray-600">Find passengers by first name</p>
          </div>
          
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              className="w-full sm:w-80 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
              placeholder="Enter passenger first name"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button 
              type="submit" 
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              🔍 Search
            </button>
          </form>
        </div>

        {/* Passengers Grid */}
        <div className="mb-8">
          {(!Array.isArray(passengers.passengers) || passengers.passengers.length === 0) ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
              <div className="text-6xl mb-4">🙅‍♂️</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No Passengers Found</h2>
              <p className="text-gray-500">This flight currently has no passengers registered.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(Array.isArray(searchedPassengers) && searchedPassengers.length > 0 ? searchedPassengers : passengers.passengers).map((p) => (
                <div key={p.p_id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    {/* Passenger Info */}
                    <div className="text-center mb-6">
                      <div className="text-4xl mb-3">💼</div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {p.firstName} {p.lastName}
                      </h3>
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 shadow-md">
                        <span className="text-gray-600">Age: </span>
                        <span className="font-bold text-purple-800">{p.age} years</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-center">
                      <Link to={`/updatePassenger/${p.p_id}`}>
                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300">
                          ✏️ Update
                        </button>
                      </Link>
                      <button
                        className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
                        onClick={() => handleDelete(p.p_id)}
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/">
            <button className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300">
              ← Back to Flights
            </button>
          </Link>
          <Link to={`/addPassenger/${id}`}>
            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300">
              ➕ Add Passenger
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Passengers;
