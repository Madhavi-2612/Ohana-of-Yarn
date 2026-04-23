import { useState, useEffect } from 'react';
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../services/api';
import { HiOutlineTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = [
  'processing',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
];

const statusColors = {
  processing: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-sage-100 text-sage-600',
  cancelled: 'bg-red-100 text-red-600',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await getAllOrders();
      setOrders(data);
    } catch (err) {
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, { status: newStatus });
      toast.success('Order status updated');
      setOrders(orders.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o)));
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handlePaymentChange = async (orderId, paymentStatus) => {
    try {
      await updateOrderStatus(orderId, { paymentStatus });
      toast.success('Payment status updated');
      setOrders(orders.map((o) => (o._id === orderId ? { ...o, paymentStatus } : o)));
    } catch (err) {
      toast.error('Update failed');
    }
  };

  const handleDelete = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) return;
    try {
      await deleteOrder(orderId);
      toast.success('Order deleted');
      setOrders(orders.filter((o) => o._id !== orderId));
    } catch (err) {
      toast.error('Delete failed');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8">
        Manage <span className="text-gradient">Orders</span>
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="card p-6">
              <div className="grid md:grid-cols-4 gap-6">
                {/* User Info */}
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Customer</p>
                  <p className="font-semibold text-gray-800 dark:text-gray-100">{order.user?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.user?.email}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-3 mb-1">Date</p>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {new Date(order.createdAt).toLocaleString('en-IN')}
                  </p>
                </div>

                {/* Shipping Address */}
                <div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Shipping</p>
                  <p className="text-sm text-gray-800 dark:text-gray-100 font-medium">{order.shippingAddress?.fullName}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingAddress?.address}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingAddress?.phone}</p>
                  
                  {(order.isGift || order.customizationNote) && (
                    <div className="mt-4 p-3 bg-red-50/50 rounded-lg border border-red-100">
                      {order.isGift && (
                        <div className="mb-2">
                          <p className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">🎁 GIFT ORDER</p>
                          {order.giftMessage && (
                            <p className="text-xs text-gray-700 dark:text-gray-300 italic border-l-2 border-red-200 dark:border-red-900/50 pl-2">"{order.giftMessage}"</p>
                          )}
                        </div>
                      )}
                      {order.customizationNote && (
                        <div>
                          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">📝 CUSTOMIZATION</p>
                          <p className="text-xs text-gray-700 dark:text-gray-300">{order.customizationNote}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Items */}
                <div className="md:col-span-2">
                  <p className="text-xs text-gray-400 mb-2">Order Items ({order.items.length})</p>
                  <div className="max-h-32 overflow-y-auto space-y-2 pr-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400 truncate mr-2">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-primary-100 dark:border-gray-800 mt-3 pt-2 flex justify-between items-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete Order"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                    <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                      Total: ₹{order.totalAmount?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Controls */}
              <div className="mt-6 pt-6 border-t border-primary-100 dark:border-gray-800 grid md:grid-cols-2 gap-6 bg-primary-50/30 dark:bg-gray-900/40 -mx-6 p-6 -mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Order Status
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="input-field py-2 text-sm bg-white dark:bg-gray-800"
                    >
                      {STATUS_OPTIONS.map((status) => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    <span className={`badge ${statusColors[order.status]}`}>
                      Current: {order.status}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Payment Info
                  </label>
                  <div className="flex items-center gap-3">
                    <select
                      value={order.paymentStatus}
                      onChange={(e) => handlePaymentChange(order._id, e.target.value)}
                      className="input-field py-2 text-sm bg-white dark:bg-gray-800"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="failed">Failed</option>
                    </select>
                    <div className="flex flex-col text-xs text-gray-500 dark:text-gray-400">
                      <span>Method: <strong className="text-gray-700 dark:text-gray-200 uppercase">{order.paymentMethod}</strong></span>
                      {order.razorpayPaymentId && <span>ID: {order.razorpayPaymentId}</span>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
