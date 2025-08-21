import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

  const handleAdd = async () => {
    const res = await fetch("http://localhost:8080/FMS/save", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(flight),
    });
    const resData = await res.json();

    dispatch(addNewFlight(resData.data));

    alert("Flight added successfully !!");
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Flight image URL"
                    onChange={(e) => setFlight({ ...flight, img: e.target.value })}
                  />
                </div>
              </div>
            </fieldset>
          </form>
          
          <div className="flex justify-center mt-8">
            <Link to={"/"}>
              <button 
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-indigo-300" 
                onClick={handleAdd}
              >
                ✈️ Add Flight
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFlight;
