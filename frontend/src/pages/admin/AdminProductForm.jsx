import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getProductById, createProduct, updateProduct, getImageUrl } from '../../services/api';
import toast from 'react-hot-toast';
import { HiOutlineArrowLeft, HiOutlinePhotograph } from 'react-icons/hi';

const CATEGORIES = [
  'Amigurumi',
  'Bags',
  'Clothing',
  'Home Decor',
  'Accessories',
  'Baby Items',
  'Gifts',
  'Other',
];

const AdminProductForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEdit);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: CATEGORIES[0],
    stock: '',
    featured: false,
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const { data } = await getProductById(id);
          setFormData({
            name: data.name,
            description: data.description,
            price: data.price,
            category: data.category,
            stock: data.stock,
            featured: data.featured,
          });
          setImagePreview(data.image);
        } catch (err) {
          toast.error('Failed to load product');
          navigate('/admin/products');
        } finally {
          setInitialLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (file) {
      formDataToSend.append('image', file);
    }

    try {
      if (isEdit) {
        await updateProduct(id, formDataToSend);
        toast.success('Product updated');
      } else {
        await createProduct(formDataToSend);
        toast.success('Product created');
      }
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/admin/products"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-8"
      >
        <HiOutlineArrowLeft className="w-5 h-5" />
        Back to Products
      </Link>

      <h1 className="text-3xl font-display font-bold text-gray-900 mb-8">
        {isEdit ? 'Edit' : 'Add'} <span className="text-gradient">Product</span>
      </h1>

      <div className="card p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Col */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  required
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Stock</label>
                <input
                  type="number"
                  name="stock"
                  required
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="input-field"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-primary-500 border-2 border-primary-200 rounded focus:ring-primary-400"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-600 cursor-pointer">
                  Featured Product
                </label>
              </div>
            </div>

            {/* Right Col */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-primary-200 border-dashed rounded-xl bg-white/50 hover:bg-white transition-colors">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview.startsWith('blob:') ? imagePreview : getImageUrl(imagePreview)}
                        alt="Preview"
                        className="mx-auto h-32 object-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://placehold.co/100x100/f8e8e0/ec4899?text=🧶';
                        }}
                      />
                    ) : (
                      <HiOutlinePhotograph className="mx-auto h-12 w-12 text-gray-400" />
                    )}
                    <div className="flex text-sm text-gray-600 mt-4 justify-center">
                      <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none">
                        <span>Upload a file</span>
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="sr-only"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field resize-none"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-primary-100 pt-6 mt-6 flex justify-end gap-4">
            <Link to="/admin/products" className="btn-outline">
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary min-w-[120px] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProductForm;
