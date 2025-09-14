import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePassengerById = () => {
  const [passengerById, setPassengerById] = useState(null);
  const [flightId, setFlightId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPassengerById = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please log in to view passenger details.");
          return;
        }
        let passengerData = null;

        try {
          // Try direct passenger fetch first
          const response = await fetch(
            "http://localhost:8080/FMS/Passenger/find/" + id,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
              redirect: "follow",
              mode: "cors",
            }
          );
          if (response.ok) {
            const data = await response.json();
            if (data && data.data) {
              passengerData = data.data;
            } else if (data && data.p_id) {
              // Sometimes the response is the passenger object directly
              passengerData = data;
            }
          } else if (response.status === 302) {
            // Handle 302 - try to get response body anyway
            try {
              const data = await response.json();
              if (data && data.data) {
                passengerData = data.data;
              } else if (data && data.p_id) {
                passengerData = data;
              }
            } catch (e) {}
          } else if (response.status === 401) {
            alert("Session expired. Please log in again.");
            localStorage.clear();
            window.location.href = "/login";
            return;
          }
        } catch (fetchError) {
          // Handle fetch error silently and try fallback
        }
        // If direct fetch didn't work, try getting all passengers and filter by ID
        if (!passengerData) {
          try {
            const allPassengersResponse = await fetch(
              "http://localhost:8080/FMS/Passenger/findAll",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                redirect: "follow",
                mode: "cors",
              }
            );
            if (allPassengersResponse.ok) {
              const allPassengersData = await allPassengersResponse.json();
              let passengers = [];
              if (allPassengersData && Array.isArray(allPassengersData.data)) {
                passengers = allPassengersData.data;
              } else if (Array.isArray(allPassengersData)) {
                passengers = allPassengersData;
              }
              // Find the specific passenger by ID
              const targetPassenger = passengers.find((p) => p.p_id == id);

              if (targetPassenger) {
                passengerData = targetPassenger;
              } else {
                // Passenger not found in the list
              }
            }
          } catch (fallbackError) {
            // Handle fallback error silently
          }
        }

        if (passengerData) {
          setPassengerById(passengerData);
          if (passengerData.flight && passengerData.flight.f_id) {
            setFlightId(passengerData.flight.f_id);
          } else {
            findFlightForPassenger(passengerData.p_id, token);
          }
        } else {
          alert(
            "Passenger not found or you do not have permission to view it."
          );
        }
      } catch (error) {
        alert("Error loading passenger details. Please try again.");
      }
    };
    if (id) {
      fetchPassengerById();
    }
  }, [id]);
  const findFlightForPassenger = async (passengerId, token) => {
    try {
      const response = await fetch("http://localhost:8080/FMS/findAll", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        redirect: "follow",
        mode: "cors",
      });

      if (response.ok) {
        const flightsData = await response.json();
        const flights = Array.isArray(flightsData.data) ? flightsData.data : [];
        const flightWithPassenger = flights.find(
          (flight) =>
            flight.passengers &&
            flight.passengers.some((p) => p.p_id == passengerId)
        );

        if (flightWithPassenger) {
          setFlightId(flightWithPassenger.f_id);
        } else {
          // Flight not found for this passenger
        }
      }
    } catch (error) {
      // Handle error silently
    }
  };

  const handleUpdatePassenger = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to update passenger details.");
        return;
      }
      const response = await fetch(
        "http://localhost:8080/FMS/Passenger/updatePassenger/" + id,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passengerById),
          redirect: "follow",
          mode: "cors",
        }
      );
      if (!response.ok) {
        if (response.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/login";
          return;
        } else if (response.status === 403) {
          alert(
            "Access denied. You do not have permission to update passengers."
          );
          return;
        } else if (response.status === 404) {
          alert("Passenger not found.");
          return;
        }
        throw new Error(`HTTP ${response.status}`);
      }

      const resData = await response.json();
      setPassengerById(resData.data);
      alert("Passenger updated successfully!!");
      setTimeout(() => {
        if (flightId) {
          navigate(`/passenger/${flightId}`);
        } else {
          navigate("/");
        }
      }, 1500); // Give user time to see the success message
    } catch (err) {
      alert("Error updating passenger. Please try again.");
    }
  };

  return passengerById == null ? (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <h1 className="text-xl font-semibold text-gray-700">
            Loading passenger details...
          </h1>
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
                <label className="block text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg bg-white"
                  type="text"
                  placeholder="Enter first name"
                  onChange={(e) =>
                    setPassengerById({
                      ...passengerById,
                      firstName: e.target.value,
                    })
                  }
                  value={passengerById.firstName}
                />
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-md transition-all duration-200 hover:shadow-lg bg-white"
                  type="text"
                  placeholder="Enter last name"
                  onChange={(e) =>
                    setPassengerById({
                      ...passengerById,
                      lastName: e.target.value,
                    })
                  }
                  value={passengerById.lastName}
                />
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Age
                </label>
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

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handleUpdatePassenger}
              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-orange-300 text-lg"
            >
              ✨ Update Passenger
            </button>

            <button
              onClick={() => {
                if (flightId) {
                  navigate(`/passenger/${flightId}`);
                } else {
                  navigate("/");
                }
              }}
              className="bg-gradient-to-r from-gray-600 to-slate-600 hover:from-gray-700 hover:to-slate-700 text-white font-bold py-4 px-8 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-300 text-lg"
            >
              ← Back to {flightId ? "Passengers" : "Home"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassengerById;
