import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PiggyBank, TrendingUp, Target, BarChart3 } from 'lucide-react';


const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary-600 to-primary-400 
                       bg-clip-text text-transparent dark:from-primary-400 dark:to-primary-200">
          Take Control of Your Finances
        </h1>
        <p className="text-xl mb-8 text-dark-600 dark:text-dark-300 leading-loose">
          Mela helps you track expenses, set goals, and build wealth with powerful insights 
          and beautiful visualizations.
        </p>
        <div className="flex gap-4 justify-center mb-16">
          <Link to="/register" className="btn-primary">
            Get Started Free
          </Link>
          <Link to="/login" className="px-6 py-3 rounded-lg font-semibold 
                                     text-dark-700 dark:text-dark-200 
                                     hover:bg-dark-100 dark:hover:bg-dark-700 
                                     transition duration-200">
            Sign In
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <FeatureCard
          icon={<PiggyBank className="w-8 h-8 text-primary-500" />}
          title="Smart Budgeting"
          description="Track your spending patterns and create intelligent budgets that adapt to your lifestyle."
        />
        <FeatureCard
          icon={<TrendingUp className="w-8 h-8 text-primary-500" />}
          title="Wealth Building"
          description="Monitor your investments and watch your wealth grow with real-time tracking."
        />
        <FeatureCard
          icon={<Target className="w-8 h-8 text-primary-500" />}
          title="Goal Setting"
          description="Set and achieve your financial goals with personalized milestones and tracking."
        />
        <FeatureCard
          icon={<BarChart3 className="w-8 h-8 text-primary-500" />}
          title="Smart Insights"
          description="Get personalized insights and recommendations based on your financial behavior."
        />
      </div>

      <div className="card p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Mela?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">100%</div>
            <div className="text-dark-600 dark:text-dark-300">Secure & Private</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">24/7</div>
            <div className="text-dark-600 dark:text-dark-300">Real-time Updates</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-2">Free</div>
            <div className="text-dark-600 dark:text-dark-300">Forever Plan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <motion.div
      className="card p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2 text-dark-800 dark:text-dark-100">{title}</h2>
      <p className="text-dark-600 dark:text-dark-300">{description}</p>
    </motion.div>
  );
};

export default Home;