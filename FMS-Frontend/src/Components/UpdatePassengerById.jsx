import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdatePassengerById = () => {
  const [passengerById, setPassengerById] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPassengerById = async () => {
      const flight = await fetch(
        "http://localhost:8080/FMS/Passenger/find/" + id
      );
      const data = await flight.json();
      setPassengerById(data.data);
    };
    if (id) {
      fetchPassengerById();
    }
  }, [id]);

  const handleUpdatePassenger = async () => {
    try {
      const res = await fetch(
        "http://localhost:8080/FMS/Passenger/updatePassenger/" + id,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(passengerById),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update passenger !!");
      }
      const resData = await res.json();
      setPassengerById(resData.data);
      alert("Passenger updated successfully !!");
    } catch (err) {
      console.error(err);
      alert("Error updating passenger !!");
    }
  };

  return passengerById == null ? (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <h1 className="text-xl font-semibold text-gray-700">Loading passenger details...</h1>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              ✏️ Update Passenger
            </h1>
            <p className="text-gray-600">Modify passenger information</p>
          </div>

          {/* Form */}
          <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 shadow-lg border-2 border-orange-200 mb-8">
            <div className="space-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">First Name</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg bg-white"
                  type="text"
                  placeholder="Enter first name"
                  onChange={(e) =>
                    setPassengerById({ ...passengerById, firstName: e.target.value })
                  }
                  value={passengerById.firstName}
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Last Name</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg bg-white"
                  type="text"
                  placeholder="Enter last name"
                  onChange={(e) =>
                    setPassengerById({ ...passengerById, lastName: e.target.value })
                  }
                  value={passengerById.lastName}
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Age</label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg bg-white"
                  type="number"
                  placeholder="Enter age"
                  onChange={(e) =>
                    setPassengerById({
                      ...passengerById,
                      age: Number(e.target.value),
                    })
                  }
                  value={passengerById.age}
                />
              </div>
            </div>
          </div>

          {/* Update Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleUpdatePassenger}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 text-lg"
            >
              ✨ Update Passenger
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassengerById;
