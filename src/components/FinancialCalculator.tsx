import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator } from 'lucide-react';

const FinancialCalculator: React.FC = () => {
  const [calculatorType, setCalculatorType] = useState<'loan' | 'compound'>('loan');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [principal, setPrincipal] = useState('');
  const [years, setYears] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculateLoanPayment = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;
    const payment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setResult(payment);
  };

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(interestRate) / 100;
    const t = parseFloat(years);
    const amount = P * Math.pow(1 + r, t);
    setResult(amount);
  };

  return (
    <motion.div
      className="bg-white p-6 rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Calculator className="mr-2" size={24} />
        Financial Calculator
      </h2>
      <div className="mb-4">
        <select
          value={calculatorType}
          onChange={(e) => setCalculatorType(e.target.value as 'loan' | 'compound')}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="loan">Loan Payment</option>
          <option value="compound">Compound Interest</option>
        </select>
      </div>
      {calculatorType === 'loan' ? (
        <>
          <input
            type="number"
            placeholder="Loan Amount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Loan Term (years)"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <button
            onClick={calculateLoanPayment}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Calculate Monthly Payment
          </button>
        </>
      ) : (
        <>
          <input
            type="number"
            placeholder="Principal Amount"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Interest Rate (%)"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Time (years)"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <button
            onClick={calculateCompoundInterest}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Calculate Compound Interest
          </button>
        </>
      )}
      {result !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-lg font-semibold">
            Result: ${result.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600">
            {calculatorType === 'loan'
              ? 'Monthly Payment'
              : 'Final Amount after Compound Interest'}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default FinancialCalculator;