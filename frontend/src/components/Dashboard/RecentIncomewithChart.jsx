import React, { useEffect, useState } from "react";
import { prepareIncomePieChartData } from "../../utils/helper";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = ["#875cf5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("📦 Raw 60 Day Income Data:", data);
    const result = prepareIncomePieChartData(data);
    console.log("📊 Pie Chart Data:", result);
    setChartData(result);
  }, [data]);

  return (
    <div className="card col-span-1 min-h-[350px]">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 Days Income</h5>
      </div>

      {chartData.length === 0 ? (
        <div className="text-gray-500 text-sm mt-4">No income data available.</div>
      ) : (
        <div className="h-[300px]">
          <CustomPieChart
            data={chartData}
            label="Total Income"
            totalAmount={`$${totalIncome}`}
            colors={COLORS}
            showTextAnchor
          />
        </div>
      )}
    </div>
  );
};

export default RecentIncomeWithChart;
