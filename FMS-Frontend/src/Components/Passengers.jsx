import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Passengers = () => {
  const [passengers, setPassengers] = useState({ passengers: [], name: "" });
  const [search, setSearch] = useState("");
  const [searchedPassengers, setSearchedPassengers] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const flight = async () => {
      const res = await fetch("http://localhost:8080/FMS/find/" + id);
      const resData = await res.json();
      console.log(resData.data);

      setPassengers(resData.data);
    };
    if (id) {
      flight();
    }
  }, [id]);

  const handleDelete = async (id) => {
    const deletedFlight = await fetch(
      "http://localhost:8080/FMS/Passenger/delete/" + id,
      { method: "DELETE" }
    );
    setPassengers((prev) => ({
      ...prev,
      passengers: prev.passengers.filter((p) => p.p_id !== id),
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const res = await fetch(
      "http://localhost:8080/FMS/Passenger/findByFirstName?firstName=" + search
    );
    const resData = await res.json();
    console.log(resData.data);
    setSearchedPassengers(resData.data);
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
          {passengers.passengers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 border border-gray-100 text-center">
              <div className="text-6xl mb-4">🙅‍♂️</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">No Passengers Found</h2>
              <p className="text-gray-500">This flight currently has no passengers registered.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(searchedPassengers.length > 0 ? searchedPassengers : passengers.passengers).map((p) => (
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
