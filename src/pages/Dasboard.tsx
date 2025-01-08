import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, DollarSign, PiggyBank, Target, CreditCard } from 'lucide-react';
import { fetchExpenses, fetchIncomes, fetchGoals, fetchInvestments } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import FinancialHealthAdvisor from '../components/FinancialHealthAdvisor';
import { calculateFinancialMetrics } from '../utils/financialcalculations';


ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

interface FinancialData {
  expenses: any[];
  incomes: any[];
  goals: any[];
  investments: any[];
}

const Dashboard: React.FC = () => {
  const [data, setData] = useState<FinancialData>({ expenses: [], incomes: [], goals: [], investments: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expensesRes, incomesRes, goalsRes, investmentsRes] = await Promise.all([
        fetchExpenses(),
        fetchIncomes(),
        fetchGoals(),
        fetchInvestments()
      ]);

      setData({
        expenses: expensesRes.data,
        incomes: incomesRes.data,
        goals: goalsRes.data,
        investments: investmentsRes.data
      });
      setError('');
    } catch (err: any) {
      if (err.response?.status === 401) {
        navigate('/login');
      } else {
        setError('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateMetrics = () => {
    const totalIncome = data.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    const totalExpenses = data.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const totalInvestments = data.investments.reduce((sum, inv) => sum + inv.amount, 0);
    const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    
    const expensesByCategory = data.expenses.reduce((acc: any, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const monthlyData = last6MonthsData();

    return {
      totalIncome,
      totalExpenses,
      totalInvestments,
      savingsRate,
      expensesByCategory,
      monthlyData
    };
  };

  const last6MonthsData = () => {
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      return d.toISOString().slice(0, 7); // YYYY-MM format
    }).reverse();

    const monthlyIncomes = months.map(month => ({
      month,
      income: data.incomes
        .filter(inc => inc.date.startsWith(month))
        .reduce((sum, inc) => sum + inc.amount, 0),
      expenses: data.expenses
        .filter(exp => exp.date.startsWith(month))
        .reduce((sum, exp) => sum + exp.amount, 0)
    }));

    return monthlyIncomes;
  };

  const getFinancialHealthScore = (metrics: any) => {
    let score = 0;
    
    // Savings Rate (40 points)
    if (metrics.savingsRate >= 20) score += 40;
    else if (metrics.savingsRate >= 10) score += 30;
    else if (metrics.savingsRate >= 5) score += 20;
    else if (metrics.savingsRate > 0) score += 10;

    // Investment Diversity (30 points)
    const investmentTypes = new Set(data.investments.map(inv => inv.name)).size;
    if (investmentTypes >= 4) score += 30;
    else if (investmentTypes >= 3) score += 20;
    else if (investmentTypes >= 2) score += 10;
    else if (investmentTypes >= 1) score += 5;

    // Expense Management (30 points)
    const expenseToIncomeRatio = metrics.totalExpenses / metrics.totalIncome;
    if (expenseToIncomeRatio <= 0.5) score += 30;
    else if (expenseToIncomeRatio <= 0.7) score += 20;
    else if (expenseToIncomeRatio <= 0.9) score += 10;

    return score;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const metrics = calculateMetrics();
  const healthScore = getFinancialHealthScore(metrics);

  const expenseData = {
    labels: Object.keys(metrics.expensesByCategory),
    datasets: [
      {
        data: Object.values(metrics.expensesByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384',
          '#4BC0C0',
        ],
      },
    ],
  };

  const cashflowData = {
    labels: metrics.monthlyData.map(d => {
      const [year, month] = d.month.split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleString('default', { month: 'short' });
    }),
    datasets: [
      {
        label: 'Income',
        data: metrics.monthlyData.map(d => d.income),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      },
      {
        label: 'Expenses',
        data: metrics.monthlyData.map(d => d.expenses),
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Income</p>
              <p className="text-2xl font-bold">${metrics.totalIncome.toFixed(2)}</p>
            </div>
            <TrendingUp className="text-green-500" size={24} />
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold">${metrics.totalExpenses.toFixed(2)}</p>
            </div>
            <TrendingDown className="text-red-500" size={24} />
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Savings Rate</p>
              <p className="text-2xl font-bold">{metrics.savingsRate.toFixed(1)}%</p>
            </div>
            <PiggyBank className="text-blue-500" size={24} />
          </div>
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Health Score</p>
              <p className="text-2xl font-bold">{healthScore}/100</p>
            </div>
            {healthScore >= 70 ? (
              <CheckCircle className="text-green-500" size={24} />
            ) : (
              <AlertCircle className="text-yellow-500" size={24} />
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Expense Breakdown</h2>
          <Doughnut data={expenseData} />
        </motion.div>

        <motion.div
          className="bg-white p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
          <Line data={cashflowData} />
        </motion.div>
      </div>
              
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <h2 className="text-xl font-semibold mb-4">Financial Health Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Strengths</h3>
            <ul className="space-y-2">
              {metrics.savingsRate > 20 && (
                <li className="flex items-center text-green-600">
                  <CheckCircle className="mr-2" size={16} />
                  Excellent savings rate of {metrics.savingsRate.toFixed(1)}%
                </li>
              )}
              {(metrics.totalIncome - metrics.totalExpenses) > 0 && (
                <li className="flex items-center text-green-600">
                  <CheckCircle className="mr-2" size={16} />
                  Positive cash flow
                </li>
              )}
              {data.investments.length > 0 && (
                <li className="flex items-center text-green-600">
                  <CheckCircle className="mr-2" size={16} />
                  Active investment portfolio
                </li>
              )}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-2">Areas for Improvement</h3>
            <ul className="space-y-2">
              {metrics.savingsRate < 20 && (
                <li className="flex items-center text-yellow-600">
                  <AlertCircle className="mr-2" size={16} />
                  Consider increasing savings rate
                </li>
              )}
              {Object.keys(metrics.expensesByCategory).length < 3 && (
                <li className="flex items-center text-yellow-600">
                  <AlertCircle className="mr-2" size={16} />
                  Track expenses in more categories
                </li>
              )}
              {data.investments.length < 3 && (
                <li className="flex items-center text-yellow-600">
                  <AlertCircle className="mr-2" size={16} />
                  Diversify investment portfolio
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
          <ul className="space-y-2">
            {metrics.savingsRate < 20 && (
              <li className="flex items-center">
                <Target className="mr-2 text-indigo-600" size={16} />
                Aim to save at least 20% of your monthly income
              </li>
            )}
            {metrics.totalExpenses > metrics.totalIncome * 0.8 && (
              <li className="flex items-center">
                <CreditCard className="mr-2 text-indigo-600" size={16} />
                Review and reduce expenses in top spending categories
              </li>
            )}
            {data.investments.length < 3 && (
              <li className="flex items-center">
                <DollarSign className="mr-2 text-indigo-600" size={16} />
                Consider diversifying investments across different asset classes
              </li>
            )}
            <li className="flex items-center">
              <PiggyBank className="mr-2 text-indigo-600" size={16} />
              Build an emergency fund covering 3-6 months of expenses
            </li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;