
const Filters = ({
  search,
  setSearch,
  cuisine,
  setCuisine,
  location,
  setLocation,
  allCuisines,
  allLocations,
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 px-6 py-5 bg-gradient-to-r from-orange-50 via-red-50 to-orange-100 shadow-xl rounded-2xl mx-auto mt-[-30px] w-[90%] relative z-10 border border-red-100 backdrop-blur-sm">
      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="🔍 Search restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-5 py-2.5 border-2 border-red-200 rounded-xl w-64 focus:outline-none focus:ring-2 focus:ring-red-400 bg-white shadow-sm placeholder-gray-400 text-gray-700 transition-all duration-200 hover:shadow-md"
        />
      </div>

      {/* Cuisine Dropdown */}
      <div className="relative">
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="px-5 py-2.5 border-2 border-red-200 rounded-xl bg-white shadow-sm cursor-pointer text-gray-700 focus:ring-2 focus:ring-red-400 hover:shadow-md transition-all duration-200"
        >
          <option value="">🍽️ All Cuisines</option>
          {allCuisines.map((c, idx) => (
            <option key={idx} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Location Dropdown */}
      <div className="relative">
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="px-5 py-2.5 border-2 border-red-200 rounded-xl bg-white shadow-sm cursor-pointer text-gray-700 focus:ring-2 focus:ring-red-400 hover:shadow-md transition-all duration-200"
        >
          <option value="">📍 All Locations</option>
          {allLocations.map((l, idx) => (
            <option key={idx} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Filters;
