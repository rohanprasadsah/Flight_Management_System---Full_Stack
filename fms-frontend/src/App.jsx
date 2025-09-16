import { Route, Routes } from "react-router-dom";
import AllFlights from "./Components/AllFlights";
import UpdateFlightById from "./Components/UpdateFlightById";
import AddFlight from "./Components/AddFlight";
import Passengers from "./Components/Passengers";
import UpdatePassengerById from "./Components/UpdatePassengerById";
import AddPassenger from "./Components/AddPassenger";
import Login from "./Components/Login";
import Register from "./Components/Register";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Routes>
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
              <div className="bg-white rounded-2xl shadow-2xl p-12 border border-gray-100 text-center max-w-md mx-auto">
                <div className="text-8xl mb-6">🚫</div>
                <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Page Not Found
                </h2>
                <p className="text-gray-600 mb-6">
                  The page you're looking for doesn't exist.
                </p>
                <a
                  href="/"
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  🏠 Go Home
                </a>
              </div>
            </div>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<AllFlights />} />
        <Route path="/update/:id" element={<UpdateFlightById />} />
        <Route path="/add" element={<AddFlight />} />
        <Route path="/passenger/:id" element={<Passengers />} />
        <Route path="/updatePassenger/:id" element={<UpdatePassengerById />} />
        <Route path="/addPassenger/:id" element={<AddPassenger />} />
      </Routes>
    </div>
  );
}

export default App;
