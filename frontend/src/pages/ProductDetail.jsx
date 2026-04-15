import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getImageUrl } from '../services/api';
import { useCart } from '../context/CartContext';
import { HiOutlineShoppingBag, HiOutlineArrowLeft, HiMinus, HiPlus } from 'react-icons/hi';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await getProductById(id);
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <span className="text-6xl mb-4">😔</span>
        <h2 className="text-2xl font-display font-bold text-gray-700">Product not found</h2>
        <Link to="/products" className="btn-primary mt-4">Browse Products</Link>
      </div>
    );
  }

  const imgSrc = getImageUrl(product.image);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 transition-colors mb-8"
      >
        <HiOutlineArrowLeft className="w-5 h-5" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Image */}
        <div className="card overflow-hidden">
          <div className="aspect-square bg-blush">
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x600/f0e4d4/2e8ecc?text=🧶';
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="badge bg-lavender-100 text-lavender-500 mb-3">
            {product.category}
          </span>

          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
            {product.name}
          </h1>

          <p className="text-3xl font-bold text-primary-600 mt-4">
            ₹{product.price?.toLocaleString('en-IN')}
          </p>

          <p className="text-gray-600 mt-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span
              className={`badge ${
                product.stock > 0
                  ? 'bg-sage-100 text-sage-600'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
            </span>
          </div>

          {/* Quantity */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-sm font-semibold text-gray-600">Quantity:</span>
            <div className="flex items-center border-2 border-primary-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-primary-50 transition-colors"
              >
                <HiMinus className="w-5 h-5 text-gray-600" />
              </button>
              <span className="px-5 py-2 text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="p-2 hover:bg-primary-50 transition-colors"
              >
                <HiPlus className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => addToCart(product, quantity)}
              disabled={product.stock === 0}
              className="btn-primary flex items-center justify-center gap-2 text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <HiOutlineShoppingBag className="w-5 h-5" />
              Add to Cart
            </button>
            <a
              href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || '919999999999'}?text=${encodeURIComponent(`Hi! I'm interested in: ${product.name} (₹${product.price})`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp flex items-center justify-center gap-2 text-lg py-3"
            >
              💬 Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
