import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 dark:bg-dark-800/80 border-b border-gray-200 dark:border-dark-700 backdrop-blur-md">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <DollarSign className="w-8 h-8 text-primary-500" />
            <span className="text-2xl font-display font-bold 
                           text-dark-900 dark:text-dark-50">
              Mela
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/expenses">Expenses</NavLink>
            <NavLink to="/income">Income</NavLink>
            <NavLink to="/investments">Investments</NavLink>
            <NavLink to="/goals">Goals</NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link to="/login" className="text-dark-600 dark:text-dark-300 
                                       hover:text-dark-900 dark:hover:text-dark-50 
                                       transition duration-200">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary py-2">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    className="text-dark-600 dark:text-dark-300 hover:text-dark-900 
               dark:hover:text-dark-50 transition duration-200"
  >
    {children}
  </Link>
);

export default Header;