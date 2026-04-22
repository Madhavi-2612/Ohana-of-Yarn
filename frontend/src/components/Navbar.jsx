import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { HiOutlineShoppingBag, HiOutlineMenu, HiOutlineX, HiOutlineUser, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi';
import logo from '../assets/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Shop' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img src={logo} alt="Ohana of Yarn Logo" className="w-10 h-10 object-contain rounded-full border-2 border-primary-200" />
            <span className="text-xl font-display font-bold text-gradient">
              Ohana of Yarn
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/orders"
                  className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                >
                  My Orders
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors duration-200"
                  >
                    Admin
                  </Link>
                )}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                    <HiOutlineUser className="w-4 h-4" />
                    {user.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-outline text-sm py-2 px-4"
              >
                Login
              </Link>
            )}

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? <HiOutlineSun className="w-6 h-6" /> : <HiOutlineMoon className="w-6 h-6" />}
            </button>

            <Link to="/cart" className="relative group">
              <HiOutlineShoppingBag className="w-6 h-6 text-gray-600 group-hover:text-primary-600 dark:text-gray-300 transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
            >
              {darkMode ? <HiOutlineSun className="w-6 h-6" /> : <HiOutlineMoon className="w-6 h-6" />}
            </button>
            <Link to="/cart" className="relative">
              <HiOutlineShoppingBag className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? (
                <HiOutlineX className="w-6 h-6 text-gray-600" />
              ) : (
                <HiOutlineMenu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-primary-100 animate-fade-in">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-600 hover:text-primary-600 font-medium py-2"
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <>
                <Link
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="block text-gray-600 hover:text-primary-600 font-medium py-2"
                >
                  My Orders
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="block text-gray-600 hover:text-primary-600 font-medium py-2"
                  >
                    Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-500 hover:text-primary-600 py-2"
                >
                  Logout ({user.name})
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="block btn-primary text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
