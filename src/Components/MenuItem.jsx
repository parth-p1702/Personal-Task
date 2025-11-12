
const MenuItem = ({ item, onAddToCart }) => {
  const getPrice = () => {
    if (item.Price) return item.Price;
    if (item.SizeListWidget && item.SizeListWidget.length > 0) {
      const prices = item.SizeListWidget.map((s) => s.Price);
      return Math.min(...prices);
    }
    return 0;
  };

  const getImageUrl = () => {
    if (!item.ItemImage || item.ItemImage.trim() === '') return null;
    return `https://www.foodchow.com/images/shop/3161/${item.ItemImage}`;
  };

  const getPlaceholder = () => {
    const foodEmojis = ['🍔', '🍕', '🍜', '🍰', '🥗', '🍱', '🌮', '🍣', '🍝', '🥘'];
    const hash = item.ItemName.split('').reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );
    const emoji = foodEmojis[hash % foodEmojis.length];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      emoji
    )}&size=300&background=fb923c&color=fff&bold=true&font-size=0.6`;
  };

  const imageUrl = getImageUrl();
  const price = getPrice();

  const handleAddToCart = () => {
    onAddToCart({
      name: item.ItemName,
      price: price,
      quantity: 1,
      image: imageUrl,
    });
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-red-100 flex flex-col hover:-translate-y-1">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-100 overflow-hidden">
        <img
          src={imageUrl || getPlaceholder()}
          alt={item.ItemName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getPlaceholder();
          }}
        />
        {item.mark_sold_out === 1 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-full font-bold shadow-md">
              ❌ Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Item Name */}
        <h3 className="text-lg font-extrabold text-gray-800 mb-2 line-clamp-2 min-h-[3rem] group-hover:text-red-600 transition-colors">
          {item.ItemName}
        </h3>

        {/* Description */}
        {item.Description && (
          <p className="text-sm text-gray-600 mb-4 leading-snug line-clamp-2 italic">
            {item.Description}
          </p>
        )}

        {/* Price & Add Button */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="text-xl font-extrabold text-red-600">
              ₹{price.toFixed(2)}
            </span>
            {item.IsSizeAvailable === 1 && (
              <span className="text-xs text-gray-500 block">Multiple sizes</span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={item.mark_sold_out === 1}
            className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-5 py-2 rounded-full font-bold shadow-md transition-all duration-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            + ADD
          </button>
        </div>

        {/* Veg / Non-Veg Tag */}
        {item.IsVeg !== undefined && (
          <div className="mt-4 pt-3 border-t border-red-100">
            {item.IsVeg === 1 ? (
              <div className="flex items-center gap-2 text-xs text-green-700 font-semibold">
                <div className="w-4 h-4 border-2 border-green-600 flex items-center justify-center rounded-sm">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                </div>
                <span>Vegetarian</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-red-700 font-semibold">
                <div className="w-4 h-4 border-2 border-red-600 flex items-center justify-center rounded-sm">
                  <div className="w-2 h-2 rounded-full bg-red-600"></div>
                </div>
                <span>Non-Vegetarian</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuItem;
