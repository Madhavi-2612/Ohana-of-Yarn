import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { HiOutlineFilter, HiOutlineX } from 'react-icons/hi';

const CATEGORIES = [
  'All',
  'Amigurumi',
  'Bags',
  'Clothing',
  'Home Decor',
  'Accessories',
  'Baby Items',
  'Gifts',
  'Other',
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (category !== 'All') params.category = category;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (search) params.search = search;

        const { data } = await getProducts(params);
        setProducts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, minPrice, maxPrice, search]);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
  }, [searchParams]);

  const clearFilters = () => {
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setSearch('');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
          Our <span className="text-gradient">Collection</span>
        </h1>
        <p className="text-gray-500 mt-2">Explore our handcrafted crochet products</p>
      </div>

      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field text-center"
        />
      </div>

      {/* Mobile filter toggle */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden flex items-center gap-2 btn-outline mb-4"
      >
        <HiOutlineFilter className="w-5 h-5" />
        Filters
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <aside
          className={`${
            showFilters ? 'block' : 'hidden'
          } md:block md:w-64 shrink-0`}
        >
          <div className="card p-6 sticky top-20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-gray-800">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-xs text-primary-500 hover:text-primary-700 flex items-center gap-1"
              >
                <HiOutlineX className="w-3 h-3" /> Clear
              </button>
            </div>

            {/* Category */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">
                Category
              </h4>
              <div className="space-y-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setCategory(cat);
                      if (cat === 'All') {
                        searchParams.delete('category');
                      } else {
                        searchParams.set('category', cat);
                      }
                      setSearchParams(searchParams);
                    }}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                      category === cat
                        ? 'bg-primary-100 text-primary-700 font-semibold'
                        : 'text-gray-600 hover:bg-primary-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price range */}
            <div>
              <h4 className="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wider">
                Price Range (₹)
              </h4>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="input-field text-sm py-2"
                />
                <input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="input-field text-sm py-2"
                />
              </div>
            </div>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
            </div>
          ) : products.length > 0 ? (
            <>
              <p className="text-sm text-gray-500 mb-4">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl block mb-4">🔍</span>
              <h3 className="text-xl font-display font-semibold text-gray-700">
                No products found
              </h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
              <button onClick={clearFilters} className="btn-primary mt-4">
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Products;
