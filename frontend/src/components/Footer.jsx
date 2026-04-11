import { Link } from 'react-router-dom';
import { HiOutlineHeart } from 'react-icons/hi';

const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-primary-100 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-3xl">🧶</span>
              <span className="text-2xl font-display font-bold text-gradient">
                Ohana of Yarn
              </span>
            </div>
            <p className="text-gray-500 max-w-md leading-relaxed">
              Handcrafted crochet pieces made with love and care. Each item is
              unique, created with premium yarn and attention to detail.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-gray-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Shop' },
                { to: '/cart', label: 'Cart' },
                { to: '/orders', label: 'Orders' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-500 hover:text-primary-500 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-gray-800 mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li>📧 helloohanaofyarn@gmail.com</li>
              <li>📱 +91 9498431171</li>
              <li>📍 Ashok Nagar, Avadi, Chennai 600062</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-primary-100 mt-8 pt-8 text-center text-gray-400 text-sm space-y-1">
          <p className="flex items-center justify-center gap-1">
            Made with <HiOutlineHeart className="text-primary-400 w-4 h-4" /> by
            Ohana of Yarn © {new Date().getFullYear()}
          </p>
          <p className="text-xs opacity-75">
            Developed by Madhu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
