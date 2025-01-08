export const calculateFinancialMetrics = (data: any) => {
    const monthlyIncome = data.incomes.reduce((sum: number, inc: any) => sum + inc.amount, 0) / 12;
    const monthlyExpenses = data.expenses.reduce((sum: number, exp: any) => sum + exp.amount, 0) / 12;
    const totalInvestments = data.investments.reduce((sum: number, inv: any) => sum + inv.amount, 0);
    
    // Calculate savings rate
    const savingsRate = monthlyIncome > 0 
      ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100 
      : 0;
  
    // Calculate expense to income ratio
    const expenseToIncomeRatio = monthlyIncome > 0 
      ? monthlyExpenses / monthlyIncome 
      : 1;
  
    // Calculate investment diversification score (0-1)
    const investmentTypes = new Set(data.investments.map((inv: any) => inv.type)).size;
    const investmentDiversification = Math.min(investmentTypes / 5, 1);
  
    // Calculate emergency fund months
    const emergencyFund = data.savings?.emergencyFund || 0;
    const emergencyFundMonths = monthlyExpenses > 0 
      ? emergencyFund / monthlyExpenses 
      : 0;
  
    // Calculate debt to income ratio
    const monthlyDebt = data.debts?.reduce((sum: number, debt: any) => sum + debt.monthlyPayment, 0) || 0;
    const debtToIncomeRatio = monthlyIncome > 0 
      ? monthlyDebt / monthlyIncome 
      : 0;
  
    // Calculate average investment return
    const investmentReturn = data.investments.length > 0
      ? data.investments.reduce((sum: number, inv: any) => sum + inv.return, 0) / data.investments.length
      : 0;
  
    return {
      savingsRate,
      expenseToIncomeRatio,
      investmentDiversification,
      emergencyFundMonths,
      debtToIncomeRatio,
      monthlyExpenses,
      monthlyIncome,
      investmentReturn,
    };
  };
  
  export const getFinancialInsights = (metrics: any) => {
    const insights = [];
  
    // Savings insights
    if (metrics.savingsRate < 20) {
      insights.push({
        type: 'warning',
        message: 'Your savings rate is below the recommended 20%. Consider reducing non-essential expenses.',
        action: 'Review your monthly budget and identify areas for potential savings.'
      });
    }
  
    // Emergency fund insights
    if (metrics.emergencyFundMonths < 6) {
      insights.push({
        type: 'alert',
        message: `Your emergency fund covers ${metrics.emergencyFundMonths.toFixed(1)} months of expenses. Aim for 6 months.`,
        action: `Try to save an additional ${((6 - metrics.emergencyFundMonths) * metrics.monthlyExpenses).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} for a full emergency fund.`
      });
    }
  
    // Investment insights
    if (metrics.investmentDiversification < 0.6) {
      insights.push({
        type: 'warning',
        message: 'Your investment portfolio could benefit from more diversification.',
        action: 'Consider spreading investments across different asset classes and sectors.'
      });
    }
  
    // Debt management insights
    if (metrics.debtToIncomeRatio > 0.4) {
      insights.push({
        type: 'alert',
        message: 'Your debt-to-income ratio is higher than recommended.',
        action: 'Focus on paying down high-interest debt and avoid taking on new debt.'
      });
    }
  
    return insights;
  };