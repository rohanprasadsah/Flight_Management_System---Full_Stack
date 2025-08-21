import { useEffect, useState } from "react";
import Flight from "./Flight";
import FlightSearch from "./FlightSearch";
import useFetchFlights from "../Utils/useFetchFlights";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Footer from "./Footer";

const AllFlights = () => {
  const addedFlight = useSelector((state) => state.addFlight.flight);

  const [fetchedFlights, setFetchedFlights] = useState([]);
  const [searchedFlights, setSearchedFlights] = useState([]);
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");

  const flights = useFetchFlights();

  useEffect(() => {
    setFetchedFlights(flights);
  }, [flights]);
  console.log(fetchedFlights);

  useEffect(() => {
    if (addedFlight) {
      setFetchedFlights((fetFli) => [...fetFli, ...addedFlight]);
    }
  }, [addedFlight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Flights = await fetch(
      "http://localhost:8080/FMS/findBySource&Destination?source=" +
        source +
        "&destination=" +
        destination
    );
    const flightData = await Flights.json();
    console.log(flightData.data);
    setSearchedFlights(flightData.data);
  };

  const handleDelete = async (id) => {
    const deletedFlight = await fetch(
      "http://localhost:8080/FMS/delete/" + id,
      { method: "DELETE" }
    );
    setFetchedFlights(fetchedFlights.filter((f) => f.f_id !== id));
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
          {(searchedFlights.length > 0 ? searchedFlights : fetchedFlights).map(
            (f) => {
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
            }
          )}
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
