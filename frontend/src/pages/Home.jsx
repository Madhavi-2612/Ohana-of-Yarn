import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { HiOutlineSparkles, HiOutlineHeart, HiOutlineTruck, HiOutlineShieldCheck } from 'react-icons/hi';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await getProducts({ featured: 'true' });
        setFeatured(data.slice(0, 4));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const features = [
    { icon: HiOutlineHeart, title: 'Handmade with Love', desc: 'Every piece is crafted with care and attention to detail' },
    { icon: HiOutlineSparkles, title: 'Premium Quality', desc: 'Made with the finest yarn and materials available' },
    { icon: HiOutlineTruck, title: 'Fast Delivery', desc: 'Quick and reliable shipping across India' },
    { icon: HiOutlineShieldCheck, title: 'Satisfaction Guaranteed', desc: 'Love it or we will make it right' },
  ];

  const categories = [
    { name: 'Amigurumi', emoji: '🧸', color: 'from-pink-200 to-pink-100' },
    { name: 'Bags', emoji: '👜', color: 'from-lavender-200 to-lavender-100' },
    { name: 'Clothing', emoji: '👗', color: 'from-sage-200 to-sage-100' },
    { name: 'Home Decor', emoji: '🏡', color: 'from-yellow-200 to-yellow-100' },
    { name: 'Accessories', emoji: '🎀', color: 'from-blue-200 to-blue-100' },
    { name: 'Baby Items', emoji: '👶', color: 'from-green-200 to-green-100' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="gradient-hero min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 -left-20 w-96 h-96 bg-lavender-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-sage-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block badge bg-primary-100 text-primary-600 mb-4">
                ✨ Handcrafted Creations
              </span>
              <h1 className="text-4xl md:text-6xl font-display font-bold text-gray-900 leading-tight">
                Beautiful{' '}
                <span className="text-gradient">Crochet</span>{' '}
                Pieces Made with Love
              </h1>
              <p className="text-lg text-gray-600 mt-6 max-w-lg leading-relaxed">
                Discover our collection of handmade crochet items — from adorable
                amigurumi to cozy accessories. Each piece tells a story of
                craftsmanship and care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link to="/products" className="btn-primary text-center text-lg py-3 px-8">
                  Shop Now →
                </Link>
                <a
                  href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || '919999999999'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp text-center text-lg py-3 px-8"
                >
                  💬 WhatsApp Us
                </a>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="w-[400px] h-[400px] mx-auto relative">
                <div className="absolute inset-0 gradient-primary rounded-full opacity-20 blur-2xl animate-float" />
                <div className="absolute inset-4 bg-white/60 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
                  <span className="text-[120px] animate-float">🧶</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feat) => (
              <div
                key={feat.title}
                className="text-center p-6 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <feat.icon className="w-10 h-10 mx-auto text-primary-500 group-hover:scale-110 transition-transform" />
                <h3 className="font-display font-semibold text-gray-800 mt-3">{feat.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              Shop by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-gray-500 mt-3">Find exactly what you&apos;re looking for</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`p-6 rounded-2xl bg-gradient-to-br ${cat.color} hover:shadow-lg hover:scale-105 
                  transition-all duration-300 text-center group`}
              >
                <span className="text-4xl block group-hover:scale-110 transition-transform">
                  {cat.emoji}
                </span>
                <span className="font-display font-semibold text-gray-700 mt-2 block text-sm">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              <span className="text-gradient">Featured</span> Products
            </h2>
            <p className="text-gray-500 mt-3">Our most loved crochet creations</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="w-10 h-10 border-4 border-primary-300 border-t-primary-600 rounded-full animate-spin" />
            </div>
          ) : featured.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No featured products yet. Check back soon!</p>
            </div>
          )}

          <div className="text-center mt-10">
            <Link to="/products" className="btn-outline text-lg py-3 px-8">
              View All Products →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="gradient-primary rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Custom Orders Welcome! 🎨
              </h2>
              <p className="text-white/80 mt-4 text-lg max-w-xl mx-auto">
                Have something special in mind? We love bringing your crochet
                ideas to life. Send us a message on WhatsApp to discuss your
                custom order.
              </p>
              <a
                href={`https://wa.me/${import.meta.env.VITE_WHATSAPP_PHONE || '919999999999'}?text=${encodeURIComponent('Hi! I\'d like to discuss a custom crochet order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-white text-primary-600 font-bold py-3 px-8 rounded-xl 
                  hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                💬 Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
