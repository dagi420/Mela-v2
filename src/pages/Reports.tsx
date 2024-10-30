import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bar, Line, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp, TrendingDown, Target, AlertCircle, CheckCircle } from 'lucide-react';
import { fetchExpenses, fetchIncomes, fetchInvestments } from '../utils/api';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number;
}

const Reports: React.FC = () => {
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('6');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, [selectedTimeframe]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expensesRes, incomesRes, investmentsRes] = await Promise.all([
        fetchExpenses(),
        fetchIncomes(),
        fetchInvestments()
      ]);

      const monthlyStats = processMonthlyData(
        expensesRes.data,
        incomesRes.data,
        parseInt(selectedTimeframe)
      );
      setMonthlyData(monthlyStats);
      setError('');
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load report data');
      }
    } finally {
      setLoading(false);
    }
  };

  const processMonthlyData = (expenses: any[], incomes: any[], months: number) => {
    const monthlyStats: MonthlyData[] = [];
    const now = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthStr = date.toISOString().slice(0, 7);

      const monthlyIncome = incomes
        .filter(inc => inc.date.startsWith(monthStr))
        .reduce((sum, inc) => sum + inc.amount, 0);

      const monthlyExpenses = expenses
        .filter(exp => exp.date.startsWith(monthStr))
        .reduce((sum, exp) => sum + exp.amount, 0);

      const monthlySavings = monthlyIncome - monthlyExpenses;
      const savingsRate = monthlyIncome > 0 ? (monthlySavings / monthlyIncome) * 100 : 0;

      monthlyStats.push({
        month: date.toLocaleString('default', { month: 'short', year: '2-digit' }),
        income: monthlyIncome,
        expenses: monthlyExpenses,
        savings: monthlySavings,
        savingsRate: savingsRate
      });
    }

    return monthlyStats;
  };

  const calculateTrends = () => {
    if (monthlyData.length < 2) return { income: 0, expenses: 0, savings: 0 };

    const lastMonth = monthlyData[monthlyData.length - 1];
    const previousMonth = monthlyData[monthlyData.length - 2];

    return {
      income: ((lastMonth.income - previousMonth.income) / previousMonth.income) * 100,
      expenses: ((lastMonth.expenses - previousMonth.expenses) / previousMonth.expenses) * 100,
      savings: ((lastMonth.savings - previousMonth.savings) / previousMonth.savings) * 100
    };
  };

  const trends = calculateTrends();

  const cashflowData = {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Income',
        data: monthlyData.map(d => d.income),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.1,
      },
      {
        label: 'Expenses',
        data: monthlyData.map(d => d.expenses),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1,
      }
    ],
  };

  const savingsData = {
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Savings Rate (%)',
        data: monthlyData.map(d => d.savingsRate),
        backgroundColor: 'rgba(153, 102, 255, 0.5)',
      }
    ],
  };

  const performanceData = {
    labels: ['Income Growth', 'Expense Control', 'Savings Rate', 'Investment Diversity', 'Debt Management', 'Emergency Fund'],
    datasets: [
      {
        label: 'Financial Performance',
        data: [
          Math.max(trends.income, 0),
          100 - (monthlyData[monthlyData.length - 1]?.expenses / monthlyData[monthlyData.length - 1]?.income * 100 || 0),
          monthlyData[monthlyData.length - 1]?.savingsRate || 0,
          75, // Example value for investment diversity
          80, // Example value for debt management
          60  // Example value for emergency fund
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(75, 192, 192)'
      }
    ],
  };

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
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Financial Reports</h1>
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="3">Last 3 Months</option>
          <option value="6">Last 6 Months</option>
          <option value="12">Last 12 Months</option>
        </select>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-gray-500 mb-2">Income Trend</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">
              {trends.income > 0 ? '+' : ''}{trends.income.toFixed(1)}%
            </span>
            {trends.income > 0 ? (
              <TrendingUp className="text-green-500" size={24} />
            ) : (
              <TrendingDown className="text-red-500" size={24} />
            )}
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-gray-500 mb-2">Expense Trend</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">
              {trends.expenses > 0 ? '+' : ''}{trends.expenses.toFixed(1)}%
            </span>
            {trends.expenses > 0 ? (
              <TrendingUp className="text-red-500" size={24} />
            ) : (
              <TrendingDown className="text-green-500" size={24} />
            )}
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-gray-500 mb-2">Savings Trend</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">
              {trends.savings > 0 ? '+' : ''}{trends.savings.toFixed(1)}%
            </span>
            {trends.savings > 0 ? (
              <TrendingUp className="text-green-500" size={24} />
            ) : (
              <TrendingDown className="text-red-500" size={24} />
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
          <Line data={cashflowData} />
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Monthly Savings Rate</h2>
          <Bar data={savingsData} />
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Financial Performance</h2>
          <Radar data={performanceData} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
          <div className="space-y-4">
            {monthlyData.length > 0 && (
              <>
                <div className="flex items-start space-x-2">
                  {monthlyData[monthlyData.length - 1].savingsRate >= 20 ? (
                    <CheckCircle className="text-green-500 mt-1" size={20} />
                  ) : (
                    <AlertCircle className="text-yellow-500 mt-1" size={20} />
                  )}
                  <div>
                    <h3 className="font-semibold">Savings Rate</h3>
                    <p className="text-sm text-gray-600">
                      Your current savings rate is {monthlyData[monthlyData.length - 1].savingsRate.toFixed(1)}%.
                      {monthlyData[monthlyData.length - 1].savingsRate >= 20
                        ? " You're doing great! Keep it up!"
                        : " Aim for at least 20% to build long-term wealth."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  {trends.expenses <= 0 ? (
                    <CheckCircle className="text-green-500 mt-1" size={20} />
                  ) : (
                    <AlertCircle className="text-yellow-500 mt-1" size={20} />
                  )}
                  <div>
                    <h3 className="font-semibold">Expense Management</h3>
                    <p className="text-sm text-gray-600">
                      {trends.expenses <= 0
                        ? "You've successfully reduced expenses compared to last month."
                        : "Your expenses have increased. Consider reviewing your spending habits."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Target className="text-indigo-500 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold">Recommendations</h3>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {monthlyData[monthlyData.length - 1].savingsRate < 20 && (
                        <li>Look for ways to increase your savings rate</li>
                      )}
                      {trends.expenses > 0 && (
                        <li>Review and optimize your monthly expenses</li>
                      )}
                      {trends.income <= 0 && (
                        <li>Explore additional income opportunities</li>
                      )}
                      <li>Consider diversifying your investment portfolio</li>
                      <li>Build or maintain an emergency fund</li>
                    </ul>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Reports;