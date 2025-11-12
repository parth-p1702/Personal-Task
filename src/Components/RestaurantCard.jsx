
const RestaurantCard = ({ data }) => {
  const { name, image, cuisine, rating, location } = data;

  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 cursor-pointer border border-red-100 hover:-translate-y-1">
      {/* Restaurant Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-xl transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
              name
            )}&size=400&background=ef4444&color=fff&bold=true`;
          }}
        />
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
          ⭐ {rating}
        </div>
      </div>

      {/* Restaurant Info */}
      <div className="mt-4">
        <h3 className="text-2xl font-extrabold text-gray-800 mb-1 hover:text-red-600 transition-colors">
          {name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 italic">{cuisine}</p>

        <div className="flex justify-between items-center">
          <span className="text-red-600 font-semibold text-sm flex items-center gap-1">
            📍 <span className="text-gray-700">{location}</span>
          </span>
          <button className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-105">
            View Menu 🍴
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
