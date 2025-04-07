import React from 'react'
const COLORS=["#875CF5","#FA2C3&","#FF6900"];
import CustomPieChart from '../Charts/CustomPieChart';
const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpense },
        { name: "Total Income", amount: totalIncome }
      ];
      
      return (
        <div className="card">
          <div className="flex items-center justify-between">
            <h5 className="text-lg">Financial Overview</h5>
          </div>
          
          <CustomPieChart
            data={balanceData}
            label="Total Balance"
            totalAmount={`$${totalBalance}`}
            colors={COLORS}
            showTextAnchor
          />
        </div>
      );
};

export default FinanceOverview;
