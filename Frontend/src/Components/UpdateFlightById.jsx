import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const UpdateFlightById = () => {
  const [flight, setFlight] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to update flights.");
      window.location.href = "/login";
      return;
    }
    const fetchById = async (id) => {
      try {
        let response;

        try {
          const findResponse = await fetch(
            `http://localhost:8080/FMS/find/${id}`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
              },
              redirect: "follow",
              mode: "cors",
            }
          );

          if (findResponse.ok) {
            const data = await findResponse.json();
            response = { data };
          } else {
            throw new Error(`Find endpoint failed: ${findResponse.status}`);
          }
        } catch (findError) {
          const allFlightsResponse = await fetch(
            "http://localhost:8080/FMS/findAll",
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              redirect: "follow",
              mode: "cors",
            }
          );

          if (!allFlightsResponse.ok) {
            throw new Error(
              `Unable to fetch flights: ${allFlightsResponse.status}`
            );
          }

          const allFlightsData = await allFlightsResponse.json();

          if (
            allFlightsData &&
            allFlightsData.data &&
            Array.isArray(allFlightsData.data)
          ) {
            const targetFlight = allFlightsData.data.find(
              (flight) => flight.f_id == id
            );
            if (targetFlight) {
              response = { data: targetFlight };
            } else {
              throw new Error("Flight not found in the system");
            }
          } else {
            throw new Error("Unable to fetch flight data from server");
          }
        }
        if (response && response.data) {
          setFlight(response.data);
        } else {
          alert("Flight not found or you do not have permission to view it.");
        }
      } catch (error) {
        if (
          error.message.includes("Authentication failed") ||
          error.message.includes("No authentication token")
        ) {
          localStorage.clear();
          alert("Please login again to continue.");
          window.location.href = "/login";
          return;
        } else if (error.message.includes("Access denied")) {
          alert("You do not have permission to view this flight.");
        } else if (error.message.includes("not found")) {
          alert("Flight not found. It may have been deleted.");
        } else if (error.message.includes("redirected")) {
          alert(
            "Server configuration issue. Please try again or contact support."
          );
        } else {
          alert("Failed to load flight details. Please try again.");
        }
      }
    };

    if (id) {
      fetchById(id);
    } else {
      alert("ID is not valid !!");
    }
  }, [id]);
  const handleUpdateFlight = async (fid, f) => {
    try {
      if (!f.name || !f.source || !f.destination || !f.time) {
        alert(
          "Please fill in all required fields (Name, Source, Destination, Time)"
        );
        return;
      }
      const priceValue = parseFloat(f.price);
      if (isNaN(priceValue) || priceValue <= 0) {
        alert("Please enter a valid price (greater than 0)");
        return;
      }
      const flightData = {
        f_id: fid, // Ensure ID is included
        name: f.name?.trim() || "",
        source: f.source?.trim() || "",
        destination: f.destination?.trim() || "",
        time: f.time?.trim() || "",
        price: priceValue,
        img: f.img?.trim() || "",
      };
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to update flights.");
        return;
      }

      const apiResponse = await fetch(
        `http://localhost:8080/FMS/putUpdate/${fid}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flightData),
          redirect: "follow",
          mode: "cors",
        }
      );
      if (!apiResponse.ok) {
        if (apiResponse.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/login";
          return;
        } else if (apiResponse.status === 403) {
          alert("Access denied. You do not have permission to update flights.");
          return;
        }
        throw new Error(`HTTP ${apiResponse.status}`);
      }

      const response = await apiResponse.json();
      alert("Flight updated successfully! Redirecting to home page...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      if (error.message.includes("No authentication token")) {
        alert("No authentication token found. Please log in again.");
        forceLoginRedirect();
        return;
      } else if (
        error.message.includes("Authentication failed") ||
        error.message.includes("Authentication required")
      ) {
        alert("Authentication failed. Please log in again.");
        localStorage.clear(); // Clear all auth data
        window.location.href = "/login";
        return;
      } else if (
        error.message.includes("Access denied") ||
        error.message.includes("insufficient permissions")
      ) {
        alert(
          "Access denied. Only administrators and staff can update flights. Please check your account permissions."
        );
      } else if (
        error.message.includes("Invalid request") ||
        error.message.includes("400")
      ) {
        alert(
          "Invalid flight data. Please check all fields are filled correctly and try again."
        );
      } else if (
        error.message.includes("not found") ||
        error.message.includes("404")
      ) {
        alert(
          "Flight not found. It may have been deleted. Please refresh the page."
        );
      } else if (error.message.includes("Network error")) {
        alert(
          "Network error. Please check your internet connection and try again."
        );
      } else if (error.message.includes("500")) {
        alert("Server error occurred. Please try again in a few minutes.");
      } else {
        alert(
          `Failed to update flight: ${
            error.message || "Unknown error"
          }. Please check the browser console (F12) for more details.`
        );
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
                    value={flight.name || ""}
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
                    value={flight.source || ""}
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
                    value={flight.destination || ""}
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
                    value={flight.time || ""}
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
                    value={flight.price || ""}
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
                    value={flight.img || ""}
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
