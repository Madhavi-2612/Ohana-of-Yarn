import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder, createRazorpayOrder, verifyPayment } from '../services/api';
import toast from 'react-hot-toast';

const Checkout = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [giftData, setGiftData] = useState({
    isGift: false,
    giftMessage: '',
    customizationNote: '',
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    return Object.values(address).every((v) => v.trim() !== '');
  };

  const handleRazorpayPayment = async () => {
    if (!validateAddress()) {
      toast.error('Please fill all shipping details');
      return;
    }

    setLoading(true);
    try {
      // Create Razorpay order
      const { data: rpOrder } = await createRazorpayOrder({ amount: totalAmount });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: rpOrder.amount,
        currency: rpOrder.currency,
        name: 'Ohana of Yarn',
        description: 'Order Payment',
        order_id: rpOrder.id,
        handler: async (response) => {
          try {
            // Verify payment
            const { data: verification } = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verification.verified) {
              // Create order
              const orderData = {
                items: cartItems.map((item) => ({
                  product: item._id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                })),
                totalAmount,
                shippingAddress: address,
                paymentMethod: 'razorpay',
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                ...giftData,
              };

              await createOrder(orderData);
              clearCart();
              toast.success('Payment successful! Order placed.');
              navigate('/orders');
            } else {
              toast.error('Payment verification failed');
            }
          } catch (err) {
            toast.error('Order creation failed');
          }
        },
        prefill: {
          name: user?.name || address.fullName,
          email: user?.email || '',
          contact: address.phone,
        },
        theme: { color: '#2e8ecc' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      toast.error('Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCOD = async () => {
    if (!validateAddress()) {
      toast.error('Please fill all shipping details');
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        items: cartItems.map((item) => ({
          product: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalAmount,
        shippingAddress: address,
        paymentMethod: 'cod',
        ...giftData,
      };

      await createOrder(orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
        <span className="text-gradient">Checkout</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <h2 className="font-display font-semibold text-gray-800 mb-6">
              📦 Shipping Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                <input
                  name="fullName"
                  value={address.fullName}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                <input
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="+91 99999 99999"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">Address</label>
                <input
                  name="address"
                  value={address.address}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Street address, apartment, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                <input
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="City"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                <input
                  name="state"
                  value={address.state}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="State"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Pincode</label>
                <input
                  name="pincode"
                  value={address.pincode}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="PIN code"
                />
              </div>
            </div>

            <div className="mt-8 border-t border-primary-50 pt-6">
              <h2 className="font-display font-semibold text-gray-800 mb-4">
                🎁 Gift & Customization
              </h2>
              <div className="space-y-4">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={giftData.isGift}
                    onChange={(e) => setGiftData({ ...giftData, isGift: e.target.checked })}
                    className="w-5 h-5 rounded border-primary-200 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-gray-700 group-hover:text-primary-600 transition-colors">
                    Is this a gift? (Add a free gift message)
                  </span>
                </label>

                {giftData.isGift && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-600 mb-1">Gift Message</label>
                    <textarea
                      value={giftData.giftMessage}
                      onChange={(e) => setGiftData({ ...giftData, giftMessage: e.target.value })}
                      className="input-field min-h-[100px] py-3"
                      placeholder="Enter the message you want us to include with the gift..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Special Customization Note (Optional)
                  </label>
                  <textarea
                    value={giftData.customizationNote}
                    onChange={(e) => setGiftData({ ...giftData, customizationNote: e.target.value })}
                    className="input-field min-h-[80px] py-3"
                    placeholder="Any specific requests or customization details?"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="card p-6 sticky top-20">
            <h3 className="font-display font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold whitespace-nowrap">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-primary-100 mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary-600">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                onClick={handleRazorpayPayment}
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Processing...' : '💳 Pay with Razorpay'}
              </button>
              <button
                onClick={handleCOD}
                disabled={loading}
                className="btn-outline w-full disabled:opacity-50"
              >
                📦 Cash on Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
