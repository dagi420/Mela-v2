import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiggyBank, TrendingUp, Target } from 'lucide-react';

const Home: React.FC = () => {
  return (
    
    <div className="text-center py-20">
      
      <motion.h1
        className="text-4xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Mela
      </motion.h1>
      <motion.p
        className="text-xl mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Your personal finance companion for a brighter financial future.
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <FeatureCard
          icon={<PiggyBank size={48} />}
          title="Track Expenses"
          description="Easily log and categorize your expenses to understand your spending habits."
        />
        <FeatureCard
          icon={<TrendingUp size={48} />}
          title="Visualize Progress"
          description="View interactive charts and reports to gain insights into your financial health."
        />
        <FeatureCard
          icon={<Target size={48} />}
          title="Set Financial Goals"
          description="Define and track your savings goals for a secure financial future."
        />
      </div>
      <div className="flex items-center space-x-4">
        <Link
        to="/register"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300"
      >
        Get Started
      </Link>
      <Link
        to="/login"
        className="bg-indigo-600  text-white px-6  py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-300"
      >
        Log in
      </Link>
      </div>
    </div>

    
  );
};

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-indigo-600 mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default Home;