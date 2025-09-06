import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { authenticatedFetchJson } from '../Utils/authApi';

const AddPassenger = () => {
  const { id } = useParams();
  const [flight, setFlight] = useState(null);
  const [passenger, setPassenger] = useState({
    firstName: "",
    lastName: "",
    age: "",
  });

  console.log("id: " + id);

  useEffect(() => {
    const getflight = async () => {
      // OLD CODE - commented out for JWT authentication
      // const res = await fetch("http://localhost:8080/FMS/find/" + id);
      // const resData = await res.json();
      // console.log(resData);
      // setFlight(resData.data);
      
      // NEW CODE - with JWT authentication
      try {
        const resData = await authenticatedFetchJson("http://localhost:8080/FMS/find/" + id);
        console.log(resData);
        setFlight(resData.data);
      } catch (error) {
        console.error('Error fetching flight:', error);
        alert('Error loading flight details. Please check your authentication and try again.');
      }
    };
    if (id) {
      getflight();
    }
  }, [id]);

  const handleAddPassenger = async (e) => {
    e.preventDefault(); // ✅ prevent page reload
    if (!passenger.firstName || !passenger.lastName || !passenger.age) {
      alert("Please fill all fields");
      return;
    }

    // OLD CODE - commented out for JWT authentication
    // try {
    //   const res = await fetch(`http://localhost:8080/FMS/savePassenger/${id}`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(passenger),
    //   });
    //   if (!res.ok) throw new Error("Failed to save passenger");
    //   const data = await res.json();
    //   console.log("Passenger saved:", data);
    //   alert("Passenger added successfully!");
    // } catch (err) {
    //   console.error(err);
    //   alert("Error adding passenger");
    // }
    
    // NEW CODE - with JWT authentication and form reset
    try {
      const data = await authenticatedFetchJson(`http://localhost:8080/FMS/savePassenger/${id}`, {
        method: "POST",
        body: JSON.stringify(passenger),
      });

      console.log("Passenger saved:", data);
      alert("Passenger added successfully!");
      
      // Reset form after successful submission
      setPassenger({
        firstName: "",
        lastName: "",
        age: "",
      });
      
    } catch (err) {
      console.error(err);
      alert("Error adding passenger. Please check your authentication and try again.");
    }
  };

  return !flight ? (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <h1 className="text-xl font-semibold text-gray-700">Loading flight details...</h1>
        </div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <form className="space-y-6" onSubmit={handleAddPassenger}>
            <fieldset className="border-2 border-green-200 rounded-xl p-6 bg-gradient-to-r from-green-50 to-emerald-50 shadow-lg">
              <legend className="px-4 py-2 font-bold text-xl text-green-800 bg-white rounded-lg shadow-md border border-green-200">
                💺 Add Passenger for {flight.name}
              </legend>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">First Name</label>
                  <input
                    value={passenger.firstName}
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Enter first name"
                    onChange={(e) =>
                      setPassenger({ ...passenger, firstName: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">Last Name</label>
                  <input
                    value={passenger.lastName}
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Enter last name"
                    onChange={(e) =>
                      setPassenger({ ...passenger, lastName: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="age" className="block text-sm font-semibold text-gray-700">Age</label>
                  <input
                    value={passenger.age}
                    type="number"
                    id="age"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg"
                    placeholder="Enter age"
                    onChange={(e) =>
                      setPassenger({ ...passenger, age: Number(e.target.value) })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button 
                  type="submit" 
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  ➕ Add Passenger
                </button>
              </div>
            </fieldset>
          </form>
          
          <div className="flex justify-center mt-8">
            <Link to={`/passenger/${id}`}>
              <button className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300">
                ← Back to Passengers
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPassenger;
