import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getProducts, deleteProduct } from '../../services/api';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await getProducts();
      setProducts(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await deleteProduct(id);
      toast.success('Product deleted');
      setProducts(products.filter((p) => p._id !== id));
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900">
          <span className="text-gradient">Products</span>
        </h1>
        <Link to="/admin/products/new" className="btn-primary flex items-center gap-2">
          <HiOutlinePlus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products yet. Add your first product!</p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary-50">
                <tr>
                  <th className="text-left p-4 font-semibold text-gray-600">Product</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Category</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Price</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Stock</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Featured</th>
                  <th className="text-right p-4 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary-50">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-primary-50/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || 'https://placehold.co/50x50/f8e8e0/ec4899?text=🧶'}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg bg-blush"
                          onError={(e) => {
                            e.target.src = 'https://placehold.co/50x50/f8e8e0/ec4899?text=🧶';
                          }}
                        />
                        <span className="font-semibold text-gray-800 truncate max-w-[200px]">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{product.category}</td>
                    <td className="p-4 font-semibold text-gray-800">
                      ₹{product.price?.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4">
                      <span
                        className={`badge ${
                          product.stock > 0
                            ? 'bg-sage-100 text-sage-600'
                            : 'bg-red-100 text-red-600'
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="p-4">
                      {product.featured ? '✨ Yes' : '—'}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <HiOutlinePencil className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id, product.name)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <HiOutlineTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
