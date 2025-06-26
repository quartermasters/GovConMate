import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="bg-govcon-blue shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white text-xl font-bold">
              GovConMate
            </Link>
            <span className="text-govcon-gold ml-2 text-sm">by Quartermasters FZC</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white hover:text-govcon-gold transition-colors">
              Home
            </Link>
            <Link to="/features" className="text-white hover:text-govcon-gold transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="text-white hover:text-govcon-gold transition-colors">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-white hover:text-govcon-gold transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-govcon-gold text-govcon-navy px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white hover:text-govcon-gold transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-govcon-gold text-govcon-navy px-4 py-2 rounded-lg font-medium hover:bg-yellow-400 transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;