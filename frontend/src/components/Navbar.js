import React from 'react';
import { Menu, X, User, LogOut, BarChart3 } from 'lucide-react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-red-700 to-red-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
          >
            <div className="text-3xl font-bold">🥡 KGN</div>
            <span className="ml-2 text-sm font-semibold">Chinese Corner</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="hover:text-yellow-300 transition">Home</a>
            <a href="#menu" className="hover:text-yellow-300 transition">Menu</a>
            <a href="#about" className="hover:text-yellow-300 transition">About</a>
            <a href="#reservations" className="hover:text-yellow-300 transition">Reservations</a>
            <a href="#contact" className="hover:text-yellow-300 transition">Contact</a>

            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' && (
                  <button
                    onClick={() => navigate('/admin')}
                    className="flex items-center gap-2 bg-yellow-400 text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                  >
                    <BarChart3 size={18} /> Admin
                  </button>
                )}
                <span className="text-sm">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-red-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-red-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2"
              >
                <User size={18} /> Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-red-500">
            <a href="#home" className="block py-2 hover:text-yellow-300">Home</a>
            <a href="#menu" className="block py-2 hover:text-yellow-300">Menu</a>
            <a href="#about" className="block py-2 hover:text-yellow-300">About</a>
            <a href="#reservations" className="block py-2 hover:text-yellow-300">Reservations</a>
            <a href="#contact" className="block py-2 hover:text-yellow-300">Contact</a>

            {user ? (
              <>
                {user.role === 'admin' && (
                  <button
                    onClick={() => {
                      navigate('/admin');
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 text-yellow-300 font-semibold"
                  >
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-2 text-yellow-300 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  navigate('/login');
                  setIsOpen(false);
                }}
                className="block w-full text-left py-2 text-yellow-300 font-semibold"
              >
                Login
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
