import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../services/api';
import { HiOutlineSparkles, HiOutlineHeart, HiOutlineTruck, HiOutlineShieldCheck } from 'react-icons/hi';
import logo from '../assets/logo.png';

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await getProducts({ featured: 'true' });
        setFeatured(data.slice(0, 5));
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
    { name: 'Products', emoji: '👜', color: 'from-sky-200 to-sky-100' },
    { name: 'Pattern', emoji: '📝', color: 'from-rose-200 to-rose-100' },
    { name: 'Bags', emoji: '🛍️', color: 'from-amber-200 to-amber-100' },
    { name: 'Flower', emoji: '🌸', color: 'from-teal-200 to-teal-100' },
    { name: 'Top', emoji: '👕', color: 'from-orange-200 to-orange-100' },
    { name: 'Skirt', emoji: '👗', color: 'from-cyan-200 to-cyan-100' },
  ];

  const reviews = [
    {
      name: 'Anjali Sharma',
      place: 'Mumbai',
      message: 'The crochet bag I ordered is absolutely stunning! The quality of the yarn and the intricate design exceeded my expectations. Highly recommend!',
    },
    {
      name: 'Rahul Verma',
      place: 'Bangalore',
      message: 'Ordered a custom amigurumi for my daughter and she loves it. The craftsmanship is top-notch and the delivery was very fast.',
    },
    {
      name: 'Priya Iyer',
      place: 'Chennai',
      message: 'Beautiful handmade pieces. You can really feel the love and care put into each item. Will definitely be ordering more!',
    },
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
                <div className="absolute inset-4 bg-white/60 backdrop-blur-sm rounded-full overflow-hidden flex items-center justify-center shadow-2xl">
                  <img src={logo} alt="Ohana of Yarn" className="w-full h-full object-cover animate-float" />
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

      {/* Reviews Section */}
      <section className="py-20 bg-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
              Customer <span className="text-gradient">Reviews</span>
            </h2>
            <p className="text-gray-500 mt-3 italic">Real stories from our happy yarn family</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div
                key={i}
                className="card p-8 relative hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="absolute top-4 right-6 text-primary-200 text-6xl font-serif opacity-50 group-hover:text-primary-300 transition-colors">
                  &ldquo;
                </div>
                <p className="text-gray-600 relative z-10 leading-relaxed italic mb-8">
                  {review.message}
                </p>
                <div className="mt-auto pt-6 border-t border-primary-50 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-lavender-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-800">{review.name}</h4>
                    <p className="text-xs text-primary-500 font-medium uppercase tracking-wider">
                      📍 {review.place}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
                className="inline-block mt-6 bg-white text-primary-700 font-bold py-3 px-8 rounded-xl 
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
