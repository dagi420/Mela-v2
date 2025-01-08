import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Target,
  Wallet,
  PiggyBank,
  Shield,
  BarChart,
  DollarSign,
  Briefcase,
} from 'lucide-react';

interface FinancialMetrics {
  savingsRate: number;
  expenseToIncomeRatio: number;
  investmentDiversification: number;
  emergencyFundMonths: number;
  debtToIncomeRatio: number;
  monthlyExpenses: number;
  monthlyIncome: number;
  investmentReturn: number;
}

const FinancialHealthAdvisor: React.FC<{ metrics: FinancialMetrics }> = ({ metrics }) => {
  const getHealthScore = () => {
    let score = 0;
    
    // Savings Rate (25 points)
    if (metrics.savingsRate >= 30) score += 25;
    else if (metrics.savingsRate >= 20) score += 20;
    else if (metrics.savingsRate >= 10) score += 15;
    else if (metrics.savingsRate > 0) score += 10;

    // Expense to Income Ratio (20 points)
    if (metrics.expenseToIncomeRatio <= 0.5) score += 20;
    else if (metrics.expenseToIncomeRatio <= 0.7) score += 15;
    else if (metrics.expenseToIncomeRatio <= 0.8) score += 10;
    else if (metrics.expenseToIncomeRatio <= 0.9) score += 5;

    // Emergency Fund (20 points)
    if (metrics.emergencyFundMonths >= 6) score += 20;
    else if (metrics.emergencyFundMonths >= 3) score += 15;
    else if (metrics.emergencyFundMonths >= 1) score += 10;

    // Investment Diversification (20 points)
    if (metrics.investmentDiversification >= 0.8) score += 20;
    else if (metrics.investmentDiversification >= 0.6) score += 15;
    else if (metrics.investmentDiversification >= 0.4) score += 10;
    else if (metrics.investmentDiversification >= 0.2) score += 5;

    // Debt Management (15 points)
    if (metrics.debtToIncomeRatio <= 0.3) score += 15;
    else if (metrics.debtToIncomeRatio <= 0.4) score += 10;
    else if (metrics.debtToIncomeRatio <= 0.5) score += 5;

    return score;
  };

  const getAdvice = () => {
    const advice = [];

    // Emergency Fund Advice
    if (metrics.emergencyFundMonths < 6) {
      advice.push({
        icon: <Shield className="text-yellow-500" size={24} />,
        title: "Build Emergency Fund",
        priority: "High",
        description: `Current emergency fund covers ${metrics.emergencyFundMonths} months. Aim for 6 months of expenses (${(metrics.monthlyExpenses * 6).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}).`,
        actions: [
          "Set up automatic monthly transfers to emergency savings",
          "Consider high-yield savings account for emergency fund",
          `Save ${((6 - metrics.emergencyFundMonths) * metrics.monthlyExpenses / 12).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} monthly to reach 6-month goal in 1 year`
        ]
      });
    }

    // Savings Rate Advice
    if (metrics.savingsRate < 20) {
      advice.push({
        icon: <PiggyBank className="text-blue-500" size={24} />,
        title: "Increase Savings Rate",
        priority: metrics.savingsRate < 10 ? "High" : "Medium",
        description: `Current savings rate is ${metrics.savingsRate.toFixed(1)}%. Target at least 20%.`,
        actions: [
          "Review and categorize all monthly expenses",
          "Identify non-essential spending",
          `Set up automatic savings of ${(metrics.monthlyIncome * 0.2).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} monthly`,
          "Consider additional income sources"
        ]
      });
    }

    // Investment Advice
    if (metrics.investmentDiversification < 0.6) {
      advice.push({
        icon: <Briefcase className="text-purple-500" size={24} />,
        title: "Diversify Investments",
        priority: "Medium",
        description: "Portfolio diversification could be improved.",
        actions: [
          "Consider low-cost index funds",
          "Spread investments across different asset classes",
          "Review asset allocation quarterly",
          "Consider consulting a financial advisor"
        ]
      });
    }

    // Expense Management
    if (metrics.expenseToIncomeRatio > 0.7) {
      advice.push({
        icon: <Wallet className="text-red-500" size={24} />,
        title: "Optimize Expenses",
        priority: "High",
        description: `Expenses are ${(metrics.expenseToIncomeRatio * 100).toFixed(1)}% of income. Target below 70%.`,
        actions: [
          "Create a detailed budget",
          "Identify and reduce high-cost subscriptions",
          "Negotiate better rates for regular services",
          `Reduce monthly expenses by ${((metrics.expenseToIncomeRatio - 0.7) * metrics.monthlyIncome).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} to reach target`
        ]
      });
    }

    return advice;
  };

  const healthScore = getHealthScore();
  const advice = getAdvice();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          <BarChart className="mr-2" />
          Financial Health Score
        </h2>
        <div className="flex items-center mb-4">
          <div className="relative w-full h-4 bg-gray-200 rounded-full">
            <div
              className={`absolute left-0 top-0 h-full rounded-full ${
                healthScore >= 80 ? 'bg-green-500' :
                healthScore >= 60 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${healthScore}%` }}
            />
          </div>
          <span className="ml-4 font-bold text-xl">{healthScore}/100</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          {healthScore >= 80 ? 'Excellent financial health! Keep up the great work!' :
           healthScore >= 60 ? 'Good foundation, with room for improvement.' :
           'Several areas need attention. Follow the advice below to improve your financial health.'}
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {advice.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {item.icon}
                <h3 className="text-xl font-semibold ml-2">{item.title}</h3>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium
                ${item.priority === 'High' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                  item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>
                {item.priority} Priority
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
            <div className="space-y-2">
              {item.actions.map((action, actionIndex) => (
                <div key={actionIndex} className="flex items-center">
                  <CheckCircle className="text-green-500 mr-2" size={16} />
                  <span className="text-sm">{action}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
      >
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Target className="mr-2" />
          Next Steps for Financial Growth
        </h3>
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Based on your current financial profile, here are recommended next steps:
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold mb-2">Short-term Goals (1-3 months)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <DollarSign className="mr-2" size={16} />
                  Create a detailed monthly budget
                </li>
                <li className="flex items-center">
                  <DollarSign className="mr-2" size={16} />
                  Set up automatic savings transfers
                </li>
                <li className="flex items-center">
                  <DollarSign className="mr-2" size={16} />
                  Review and optimize recurring expenses
                </li>
              </ul>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 className="font-semibold mb-2">Long-term Goals (6-12 months)</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <DollarSign className="mr-2" size={16} />
                  Build emergency fund to 6 months
                </li>
                <li className="flex items-center">
                  <DollarSign className="mr-2" size={16} />
                  Increase investment contributions
                </li>
                <li className="flex items-center">
                  <DollarSign className="mr-2" size={16} />
                  Review and optimize investment portfolio
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FinancialHealthAdvisor;