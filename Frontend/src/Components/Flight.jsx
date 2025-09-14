const Flight = ({ f }) => {
  return (
    <div className="p-6">
      {/* Flight Image */}
      <div className="relative overflow-hidden rounded-xl mb-4 shadow-lg">
        {f.img && f.img.trim() ? (
          <img
            src={f.img.trim()}
            alt="Flight Image"
            className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
            onError={(e) => {
              e.target.src =
                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zNWVtIj5GbGlnaHQgSW1hZ2U8L3RleHQ+PC9zdmc+";
              e.target.onerror = null; // Prevent infinite loop
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-4xl mb-2">✈️</div>
              <div className="text-lg font-semibold">Flight Image</div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Flight Details */}
      <div className="space-y-3">
        {/* Flight Name */}
        <h2 className="text-xl font-bold text-gray-800 mb-3 text-center">
          {f.name}
        </h2>

        {/* Route */}
        <div className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 shadow-md">
          <span className="font-semibold text-blue-800">{f.source}</span>
          <div className="flex items-center space-x-1 text-blue-600">
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            <div className="w-8 h-0.5 bg-blue-600"></div>
            <div className="text-lg">✈️</div>
            <div className="w-8 h-0.5 bg-blue-600"></div>
            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
          </div>
          <span className="font-semibold text-blue-800">{f.destination}</span>
        </div>

        {/* Time */}
        <div className="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3 shadow-md">
          <span className="text-purple-600">🕒</span>
          <span className="text-gray-700 font-medium">
            Departure:{" "}
            <span className="font-bold text-purple-800">
              {f.time}{" "}
              {f.time &&
              f.time.includes(":") &&
              parseInt(f.time.split(":")[0], 10) >= 12
                ? "PM"
                : "AM"}
            </span>
          </span>
        </div>

        {/* Price */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 shadow-md text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-green-600 text-lg">💰</span>
            <span className="text-gray-600">Ticket Price:</span>
          </div>
          <div className="text-2xl font-bold text-green-800 mt-1">
            ₹ {f.price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flight;
