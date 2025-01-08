import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, DollarSign, Calendar, Plus, Trash2, Filter, ChartPie } from 'lucide-react';
import { fetchGoals, addGoal, deleteGoal } from '../utils/api';
import { useNavigate } from 'react-router-dom';

interface Goal {
  _id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  contributions: { date: string; amount: number }[]; // New: Array to track contributions
  category: 'Short-term' | 'Long-term' | 'Savings' | 'Investments';
}

const Goals: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ name: '', targetAmount: '', currentAmount: '', deadline: '' });
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      const response = await fetchGoals();
      setGoals(response.data);
      setError('');
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load goals');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addGoal({
        name: newGoal.name,
        targetAmount: parseFloat(newGoal.targetAmount),
        currentAmount: parseFloat(newGoal.currentAmount),
        deadline: newGoal.deadline,
        contributions: [], // Initialize empty contributions
      });
      setGoals([...goals, response.data]);
      setNewGoal({ name: '', targetAmount: '', currentAmount: '', deadline: '' });
      setError('');
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to add goal');
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGoal(id);
      setGoals(goals.filter(goal => goal._id !== id));
      setError('');
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to delete goal');
      }
    }
  };

  const calculateProgress = (goal: Goal) => (goal.currentAmount / goal.targetAmount) * 100;

  const calculateRemainingAmount = (goal: Goal) => goal.targetAmount - goal.currentAmount;

  const calculateEstimatedCompletion = (goal: Goal) => {
    const today = new Date();
    const deadlineDate = new Date(goal.deadline);
    const daysRemaining = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const progress = calculateProgress(goal);
    const estimatedCompletion = daysRemaining > 0 && progress < 100
      ? Math.ceil((daysRemaining * (100 - progress)) / progress)
      : 0;
    return estimatedCompletion;
  };

  const addContribution = (goalId: string, amount: number) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal._id === goalId
          ? {
              ...goal,
              currentAmount: goal.currentAmount + amount,
              contributions: [...goal.contributions, { date: new Date().toISOString(), amount }],
            }
          : goal
      )
    );
  };
  const filteredGoals = goals.filter(goal =>
    (filterCategory === 'All' || goal.category === filterCategory) &&
    goal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Financial Goals</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      <div className="flex mb-4 gap-4">
        <input
          type="text"
          placeholder="Search goals"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="All">All</option>
          <option value="Short-term">Short-term</option>
          <option value="Long-term">Long-term</option>
          <option value="Savings">Savings</option>
          <option value="Investments">Investments</option>
        </select>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Goal Name"
            value={newGoal.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            name="targetAmount"
            placeholder="Target Amount"
            value={newGoal.targetAmount}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            name="currentAmount"
            placeholder="Current Amount"
            value={newGoal.currentAmount}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="date"
            name="deadline"
            value={newGoal.deadline}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
           <select
            name="category"
            value={newGoal.catagory}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          >
            <option value="Short-term">Short-term</option>
            <option value="Long-term">Long-term</option>
            <option value="Savings">Savings</option>
            <option value="Investments">Investments</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          <Plus className="inline-block mr-2" size={18} />
          Add Goal
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {goals.map((goal) => (
          <motion.div
            key={goal._id}
            className="bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="mr-2" size={24} />
                {goal.name}
              </h2>
              <button
                onClick={() => handleDelete(goal._id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 flex items-center">
                <DollarSign className="mr-2" size={18} />
                Target: ${goal.targetAmount.toFixed(2)}
              </p>
              <p className="text-gray-600 flex items-center">
                <DollarSign className="mr-2" size={18} />
                Current: ${goal.currentAmount.toFixed(2)}
              </p>
              <p className="text-gray-600 flex items-center">
                <Calendar className="mr-2" size={18} />
                Deadline: {new Date(goal.deadline).toLocaleDateString()}
              </p>
              <p className="text-gray-600 flex items-center">Remaining: ${calculateRemainingAmount(goal)}</p>
              <p className="text-gray-600 flex items-center">
                Estimated Days to Completion: {calculateEstimatedCompletion(goal)}
              </p>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <span className="text-xs font-semibold text-indigo-600 bg-indigo-200 py-1 px-2 rounded-full">
                  Progress
                </span>
                <span className="text-xs font-semibold text-indigo-600">
                  {calculateProgress(goal).toFixed(0)}%
                </span>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div
                  style={{
                    width: `${calculateProgress(goal)}%`,
                    backgroundColor: calculateProgress(goal) < 50 ? 'red' : calculateProgress(goal) < 75 ? 'orange' : 'green',
                  }}
                  className="flex text-center whitespace-nowrap justify-center"
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Goals;
