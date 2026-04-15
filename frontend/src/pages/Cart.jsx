import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getImageUrl } from '../services/api';
import { HiOutlineTrash, HiMinus, HiPlus, HiOutlineShoppingBag } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, totalAmount, clearCart } = useCart();

  const generateWhatsAppLink = () => {
    let message = '🧶 *New Order from Ohana of Yarn*\n\n📦 *Order Items:*\n';
    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.name} × ${item.quantity} — ₹${(item.price * item.quantity).toFixed(2)}\n`;
    });
    message += `\n💰 *Total: ₹${totalAmount.toFixed(2)}*\n\nPlease confirm my order. Thank you! 🙏`;
    const phone = import.meta.env.VITE_WHATSAPP_PHONE || '919999999999';
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <span className="text-7xl mb-6">🛒</span>
        <h2 className="text-2xl font-display font-bold text-gray-700">Your cart is empty</h2>
        <p className="text-gray-500 mt-2">Add some lovely crochet items to get started!</p>
        <Link to="/products" className="btn-primary mt-6">
          Start Shopping →
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
        Shopping <span className="text-gradient">Cart</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => {
            const imgSrc = getImageUrl(item.image);

            return (
              <div key={item._id} className="card p-4 flex gap-4">
                <img
                  src={imgSrc}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl bg-blush"
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/100x100/f0e4d4/2e8ecc?text=🧶';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/products/${item._id}`}
                    className="font-display font-semibold text-gray-800 hover:text-primary-600 transition-colors truncate block"
                  >
                    {item.name}
                  </Link>
                  <p className="text-primary-600 font-bold mt-1">
                    ₹{item.price?.toLocaleString('en-IN')}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-primary-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-1.5 hover:bg-primary-50 transition-colors"
                      >
                        <HiMinus className="w-4 h-4 text-gray-600" />
                      </button>
                      <span className="px-4 text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-1.5 hover:bg-primary-50 transition-colors"
                      >
                        <HiPlus className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-800">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 transition-colors"
          >
            Clear entire cart
          </button>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h3 className="font-display font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-sage-500">Free</span>
              </div>
            </div>

            <div className="border-t border-primary-100 mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-600">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Link
                to="/checkout"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <HiOutlineShoppingBag className="w-5 h-5" />
                Proceed to Checkout
              </Link>

              <a
                href={generateWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp w-full flex items-center justify-center gap-2"
              >
                <FaWhatsapp className="w-5 h-5" />
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
