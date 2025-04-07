import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Charts/CustomBarChart";

const Last30DaysExpenses = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    console.log("Raw chart input data:", data);
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    console.log("Prepared Chart Data:", result);
  }, [data]);

  return (
    <div className="card col-span-1 min-h-[350px]">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>

      {chartData.length === 0 ? (
        <div className="text-gray-500 text-sm mt-4">No expense data available.</div>
      ) : (
        <div className="h-[300px]">
          <CustomBarChart data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Last30DaysExpenses;
