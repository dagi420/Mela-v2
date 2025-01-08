import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DollarSign, LogOut, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white/80 dark:bg-dark-800/80 border-b border-gray-200 dark:border-dark-700 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <DollarSign className="w-8 h-8 text-primary-500" />
            <span className="text-2xl font-display font-bold text-dark-900 dark:text-dark-50">
              Mela
            </span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/expenses">Expenses</NavLink>
            <NavLink to="/income">Income</NavLink>
            <NavLink to="/investments">Investments</NavLink>
            <NavLink to="/goals">Goals</NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {location.pathname === '/' && !token && (
              <>
                <Link
                  to="/login"
                  className="text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-dark-50 transition duration-200"
                >
                  Sign In
                </Link>
                <Link to="/register" className="btn-primary py-2">
                  Get Started
                </Link>
              </>
            )}
            {token && location.pathname !== '/' && (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 transition duration-200 flex items-center"
              >
                <LogOut className="mr-2" size={18} />
                Logout
              </button>
            )}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-dark-50 transition duration-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700">
          <nav className="flex flex-col space-y-4 p-4">
            <NavLink to="/dashboard" onClick={toggleMobileMenu}>Dashboard</NavLink>
            <NavLink to="/expenses" onClick={toggleMobileMenu}>Expenses</NavLink>
            <NavLink to="/income" onClick={toggleMobileMenu}>Income</NavLink>
            <NavLink to="/investments" onClick={toggleMobileMenu}>Investments</NavLink>
            <NavLink to="/goals" onClick={toggleMobileMenu}>Goals</NavLink>
            {token && location.pathname !== '/' && (
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="text-red-600 hover:text-red-800 transition duration-200 flex items-center"
              >
                <LogOut className="mr-2" size={18} />
                Logout
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode; onClick?: () => void }> = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-dark-50 transition duration-200"
  >
    {children}
  </Link>
);

export default Header;