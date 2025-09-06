import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { authenticatedFetchJson } from '../Utils/authApi';
import { addNewFlight } from "../Utils/addFlightSlice";

const AddFlight = () => {
  const dispatch = useDispatch();

  const [flight, setFlight] = useState({
    name: "",
    source: "",
    destination: "",
    time: "",
    price: "",
    img: "",
  });

  // Handle adding new flight with JWT authentication
  const handleAdd = async (e) => {
    e.preventDefault(); // Prevent form submission/navigation
    
    // VALIDATION: Check if all required fields are filled
    if (!flight.name || !flight.source || !flight.destination || !flight.time || !flight.price) {
      alert('Please fill in all required fields!');
      return;
    }
    
    try {
      console.log('ADD FLIGHT - Attempting to save flight:', flight);
      
      // Use enhanced authentication API that handles token expiration
      const response = await authenticatedFetchJson(
        'http://localhost:8080/FMS/save',
        {
          method: 'POST',
          body: JSON.stringify(flight)
        }
      );
      
      // Update Redux store with new flight data
      if (response && response.data) {
        dispatch(addNewFlight(response.data));
      }
      
      // Show success message to user
      console.log('ADD FLIGHT - Flight added successfully:', response);
      alert("Flight added successfully !!");
      
      // Reset form after successful submission
      setFlight({
        name: "",
        source: "",
        destination: "",
        time: "",
        price: "",
        img: "",
      });
      
    } catch (error) {
      console.error('Error adding flight:', error);
      
      // Enhanced error handling with specific messages
      if (error.message.includes('Authentication')) {
        // Authentication errors are handled by authApi (redirects to login)
        return;
      } else if (error.message.includes('Access denied')) {
        alert('Access denied. Only administrators can add flights.');
      } else if (error.message.includes('Invalid request')) {
        alert('Invalid flight data. Please check all fields.');
      } else if (error.message.includes('Network error')) {
        alert('Network error. Please check your connection and try again.');
      } else {
        alert('Error adding flight. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form className="space-y-6">
            <fieldset className="border-2 border-indigo-200 rounded-xl p-6 bg-gradient-to-r from-indigo-50 to-purple-50 shadow-lg">
              <legend className="px-4 py-2 font-bold text-xl text-indigo-800 bg-white rounded-lg shadow-md border border-indigo-200">Add Flight</legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Flight Name</label>
                  <input
                    type="text"
                    id="name"
                    value={flight.name}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Enter flight name"
                    onChange={(e) => setFlight({ ...flight, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="source" className="block text-sm font-semibold text-gray-700">Source</label>
                  <input
                    type="text"
                    id="source"
                    value={flight.source}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Departure city"
                    onChange={(e) => setFlight({ ...flight, source: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="destination" className="block text-sm font-semibold text-gray-700">Destination</label>
                  <input
                    type="text"
                    id="destination"
                    value={flight.destination}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Arrival city"
                    onChange={(e) =>
                      setFlight({ ...flight, destination: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="time" className="block text-sm font-semibold text-gray-700">Departure Time</label>
                  <input
                    type="text"
                    id="time"
                    value={flight.time}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="HH:MM format"
                    onChange={(e) => setFlight({ ...flight, time: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price (₹)</label>
                  <input
                    type="text"
                    id="price"
                    value={flight.price}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Ticket price"
                    onChange={(e) => setFlight({ ...flight, price: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="img" className="block text-sm font-semibold text-gray-700">Image URL</label>
                  <input
                    type="text"
                    id="img"
                    value={flight.img}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Flight image URL"
                    onChange={(e) => setFlight({ ...flight, img: e.target.value })}
                  />
                </div>
              </div>
            </fieldset>
          </form>
          
          <div className="flex justify-center gap-4 mt-8">
            <button 
              type="button"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300" 
              onClick={handleAdd}
            >
              ✈️ Add Flight
            </button>
            <Link to={"/"}>
              <button 
                type="button"
                className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300"
              >
                ← Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFlight;
