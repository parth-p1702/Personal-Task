
const DealCard = ({ deal }) => {
  const getImageUrl = () => {
    if (!deal.DealImage || deal.DealImage.trim() === '') return null;
    return `https://www.foodchow.com/images/shop/3161/deal/${deal.DealImage}`;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="group bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 overflow-hidden border border-red-100">
      {/* Image Section */}
      <div className="relative">
        {/* Deal Badge */}
        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-md z-10">
          🎉 Special Deal
        </div>

        {/* Image */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={deal.DealName}
            className="w-full h-52 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(deal.DealName)}&size=400&background=ef4444&color=fff&bold=true`;
            }}
          />
        ) : (
          <div className="w-full h-52 bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
            <span className="text-white text-6xl">🍔</span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Deal Name */}
        <h3 className="text-2xl font-extrabold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
          {deal.DealName}
        </h3>

        {/* Deal Description */}
        {deal.DealDesc && (
          <p className="text-sm text-gray-600 mb-3 leading-snug line-clamp-3">
            {deal.DealDesc}
          </p>
        )}

        {/* Price Section */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-2xl font-extrabold text-red-600">
              ₹{deal.DealPrice}
            </span>
            {deal.DealMRP > deal.DealPrice && (
              <span className="ml-2 text-gray-400 line-through text-sm">
                ₹{deal.DealMRP}
              </span>
            )}
          </div>
          {deal.DealMRP > deal.DealPrice && (
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              SAVE ₹{deal.DealMRP - deal.DealPrice}
            </span>
          )}
        </div>

        {/* Order Method Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {deal.OrderMethod && deal.OrderMethod.includes('1') && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1.5 rounded-lg font-medium shadow-sm">
              🛵 Delivery
            </span>
          )}
          {deal.OrderMethod && deal.OrderMethod.includes('2') && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1.5 rounded-lg font-medium shadow-sm">
              🛍️ Takeaway
            </span>
          )}
          {deal.OrderMethod && deal.OrderMethod.includes('5') && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1.5 rounded-lg font-medium shadow-sm">
              🍽️ Dine-in
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold text-lg shadow-md transition-transform transform hover:scale-105">
          Add Deal to Cart
        </button>

        {/* Minimum Order Info */}
        {deal.DealMinOrder > 0 && (
          <p className="text-xs text-gray-500 text-center mt-3 italic">
            Minimum {deal.DealMinOrder} order(s) required
          </p>
        )}
      </div>
    </div>
  );
};

export default DealCard;
