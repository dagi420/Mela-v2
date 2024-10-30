import React from 'react';
import { Link,  } from 'react-router-dom';
import { DollarSign } from 'lucide-react';

const Header: React.FC = () => {
  return (
    
    <header className="bg-indigo-600 text-white shadow-lg">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <DollarSign size={32} />
        <span className="text-2xl font-bold">Mela</span>
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li><Link to="/dashboard" className="hover:text-indigo-200">Dashboard</Link></li>
          <li><Link to="/expenses" className="hover:text-indigo-200">Expenses</Link></li>
          <li><Link to="/income" className="hover:text-indigo-200">Income</Link></li>
          <li><Link to="/reports" className="hover:text-indigo-200">Reports</Link></li>
          <li><Link to="/investments" className="hover:text-indigo-200">Investments</Link></li>
          <li><Link to="/goals" className="hover:text-indigo-200">Goals</Link></li>
         
        </ul>
      </nav>
    </div>
  </header>
  );
};

export default Header;