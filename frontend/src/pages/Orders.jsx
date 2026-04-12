import { useState, useEffect } from 'react';
import { getMyOrders, getImageUrl } from '../services/api';

const statusColors = {
  processing: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-sage-100 text-sage-600',
  cancelled: 'bg-red-100 text-red-600',
};

const paymentColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  paid: 'bg-sage-100 text-sage-600',
  failed: 'bg-red-100 text-red-600',
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
        My <span className="text-gradient">Orders</span>
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-6xl block mb-4">📦</span>
          <h3 className="text-xl font-display font-semibold text-gray-700">No orders yet</h3>
          <p className="text-gray-500 mt-2">Start shopping to see your orders here!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-xs text-gray-400">Order ID</p>
                  <p className="font-mono text-sm text-gray-600">{order._id}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`badge ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                  <span className={`badge ${paymentColors[order.paymentStatus]}`}>
                    {order.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-primary-50">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4 py-3">
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg bg-blush"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/60x60/f8e8e0/ec4899?text=🧶';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-gray-800">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>

              </div>

              {(order.isGift || order.customizationNote) && (
                <div className="mt-4 p-3 bg-primary-50/50 rounded-lg border border-primary-100">
                  {order.isGift && order.giftMessage && (
                    <div className="mb-2">
                      <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1">🎁 Gift Message</p>
                      <p className="text-sm text-gray-700 italic">"{order.giftMessage}"</p>
                    </div>
                  )}
                  {order.customizationNote && (
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">📝 Customization Note</p>
                      <p className="text-sm text-gray-700">{order.customizationNote}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between mt-4 pt-4 border-t border-primary-100">
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-xl font-bold text-primary-600">
                  ₹{order.totalAmount?.toLocaleString('en-IN')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
