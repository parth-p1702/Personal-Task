
const Cart = ({ cart, onRemoveItem, onUpdateQuantity }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-2xl p-6 sticky top-24 border border-red-100">
      <h2 className="text-3xl font-extrabold text-red-700 mb-6 border-b-2 border-red-200 pb-3 text-center">
        🛒 Your Cart
      </h2>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <div className="mb-4">
            <svg
              className="w-28 h-28 mx-auto text-red-200"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M7 4V2h10v2h5v2h-2l-1 13H5L4 6H2V4h5zm2 0h6V3H9v1zm-2.3 2l.9 12h8.8l.9-12H6.7zM9 8h2v8H9V8zm4 0h2v8h-2V8z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-600 mb-2">
            Your Cart Is Empty!
          </h3>
          <p className="text-gray-500 text-sm">
            Add some delicious food items<br />
            and satisfy your cravings 😋
          </p>
          <div className="mt-3 text-3xl">🍔🍕🥗🍰</div>
        </div>
      ) : (
        <>
          <div className="space-y-5 max-h-96 overflow-y-auto mb-6 scrollbar-thin scrollbar-thumb-red-300 scrollbar-track-red-100">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-all"
              >
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 text-base mb-1">
                    {item.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onUpdateQuantity(index, Math.max(0, item.quantity - 1))
                      }
                      className="w-7 h-7 rounded-full bg-gray-100 hover:bg-red-200 flex items-center justify-center text-sm font-bold text-red-700 transition"
                    >
                      -
                    </button>
                    <span className="text-sm font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center text-sm font-bold transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-red-700">
                    ₹{item.price * item.quantity}
                  </p>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-xs mt-1 text-red-500 hover:text-red-700 underline transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-red-200 pt-4">
            <div className="flex justify-between items-center mb-5">
              <span className="text-xl font-bold text-gray-800">Total:</span>
              <span className="text-2xl font-extrabold text-red-600 drop-shadow-sm">
                ₹{calculateTotal()}
              </span>
            </div>
            <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white py-3 rounded-xl font-bold text-lg shadow-md transition-transform transform hover:scale-105">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
