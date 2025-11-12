import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Cart from "../Components/Cart";
import MenuItem from "../Components/MenuItem";

const Home = () => {
  const [menuData, setMenuData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMenuType, setSelectedMenuType] = useState("Main Menu");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const categoryScrollRef = useRef(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        "https://www.foodchow.com/api/FoodChowWD/GetRestaurantMenuWDWidget_multi?ShopId=3161&locale_id=null"
      )
      .then((res) => {
        if (res.data && res.data.data) {
          const parsedData =
            typeof res.data.data === "string"
              ? JSON.parse(res.data.data)
              : res.data.data;

          setMenuData(parsedData);

          if (parsedData.CategoryList && Array.isArray(parsedData.CategoryList)) {
            setCategories(parsedData.CategoryList);
            if (parsedData.CategoryList.length > 0) {
              setSelectedCategory(parsedData.CategoryList[0].CategryId);
            }
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (item) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItemIndex >= 0) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, item]);
    }
  };

  const handleRemoveFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const handleUpdateQuantity = (index, quantity) => {
    if (quantity === 0) {
      handleRemoveFromCart(index);
    } else {
      const newCart = [...cart];
      newCart[index].quantity = quantity;
      setCart(newCart);
    }
  };

  const getCurrentCategory = () => {
    if (!selectedCategory || !categories.length) return null;
    return categories.find((cat) => cat.CategryId === selectedCategory);
  };

  const getFilteredItems = () => {
    const currentCat = getCurrentCategory();
    if (!currentCat || !currentCat.ItemListWidget) return [];
    if (!searchTerm.trim()) return currentCat.ItemListWidget;
    return currentCat.ItemListWidget.filter((item) =>
      item.ItemName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const currentCategory = getCurrentCategory();
  const filteredItems = getFilteredItems();

  const menuTypes = ["Main Menu", "Breakfast", "Drivethru"];

  return (
    <div className="bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 min-h-screen">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-red-600 to-orange-500 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-red-600 font-extrabold text-2xl shadow-md">
              FC
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-wide">FoodChow Demo India</h1>
              <p className="text-xs text-orange-100 flex items-center gap-1">
                <i className="fas fa-map-marker-alt"></i> Surat, Gujarat
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="bg-white text-red-600 font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-red-50 transition">
              Choose Service
            </button>
            <button className="bg-red-700 hover:bg-red-800 text-white font-semibold px-4 py-2 rounded-lg shadow-sm transition">
              Book Now
            </button>
            <button className="bg-white text-gray-800 font-semibold px-3 py-2 rounded-lg shadow-sm hover:bg-red-50 transition flex items-center gap-1">
              <i className="fas fa-phone"></i> 701689342
            </button>
          </div>
        </div>

        {/* Menu Tabs */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 border-t border-red-400">
          <div className="container mx-auto px-4 flex gap-6">
            {menuTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedMenuType(type)}
                className={`py-3 text-sm font-semibold tracking-wide border-b-2 transition-all ${
                  selectedMenuType === type
                    ? "border-white text-white"
                    : "border-transparent text-orange-100 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Category Scroll */}
        <div className="bg-white border-t border-red-100">
          <div
            ref={categoryScrollRef}
            className="flex gap-3 overflow-x-auto py-3 px-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category) => (
              <button
                key={category.CategryId}
                onClick={() => setSelectedCategory(category.CategryId)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all ${
                  selectedCategory === category.CategryId
                    ? "bg-gradient-to-r from-red-500 to-orange-500 text-white"
                    : "bg-white border border-red-200 text-gray-700 hover:bg-red-50"
                }`}
              >
                {category.CategryName}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* LOADING */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
            <p className="text-gray-700 font-medium text-lg">
              Loading delicious menu...
            </p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          {/* Search Bar */}
          <div className="mb-6 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="🔍 Search for dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border-2 border-red-300 rounded-xl focus:ring-2 focus:ring-red-400 bg-white shadow-sm transition"
            />
            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400"></i>
          </div>

          <div className="flex gap-8">
            {/* MENU GRID */}
            <div className="flex-1">
              {currentCategory && (
                <>
                  <div className="mb-6">
                    <h2 className="text-2xl font-extrabold text-gray-800">
                      {currentCategory.CategryName}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {filteredItems.length} item
                      {filteredItems.length !== 1 ? "s" : ""} available
                    </p>
                  </div>

                  {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredItems.map((item) => (
                        <MenuItem
                          key={item.ItemId}
                          item={item}
                          onAddToCart={handleAddToCart}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16 bg-white rounded-xl shadow-md">
                      <i className="fas fa-search text-6xl text-red-300 mb-4"></i>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No items found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or browse another category
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* CART */}
            <aside className="hidden lg:block w-80 flex-shrink-0">
              <Cart
                cart={cart}
                onRemoveItem={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            </aside>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-gradient-to-r from-red-700 via-red-800 to-orange-700 text-white py-6 mt-12 shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            Food Ordering System by{" "}
            <span className="font-bold text-orange-300">FOOD CHOW</span> 🍽️
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
