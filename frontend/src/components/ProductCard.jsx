import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { getImageUrl } from '../services/api';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const imgSrc = getImageUrl(product.image);

  return (
    <div className="card group">
      <Link to={`/products/${product._id}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-blush">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x400/f0e4d4/2e8ecc?text=🧶';
            }}
          />
          {product.featured && (
            <span className="absolute top-3 left-3 badge bg-primary-500 text-white">
              ✨ Featured
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-gray-800 font-semibold px-4 py-2 rounded-xl">
                Out of Stock
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <span className="text-xs font-medium text-lavender-500 uppercase tracking-wider">
          {product.category}
        </span>
        <Link to={`/products/${product._id}`}>
          <h3 className="font-display font-semibold text-gray-800 mt-1 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-primary-600">
            ₹{product.price?.toLocaleString('en-IN')}
          </span>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className="flex items-center gap-1.5 btn-primary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiOutlineShoppingBag className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
