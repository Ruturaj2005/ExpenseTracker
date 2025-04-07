import moment from "moment";

export const validateEmail = (email) => {
    const regex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";
  
    const [integerPart, fractionalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    return fractionalPart
      ? `${formattedInteger}.${fractionalPart}`
      : formattedInteger;
  };
  
  export const prepareExpenseBarChartData = (data = []) => {
    if (!Array.isArray(data)) return [];
  
    const grouped = {};
  
    data.forEach((item) => {
      const date = new Date(item.date).toISOString().split("T")[0]; // YYYY-MM-DD
      grouped[date] = (grouped[date] || 0) + parseFloat(item.amount);
    });
  
    const result = Object.entries(grouped)
      .sort(([a], [b]) => new Date(a) - new Date(b))
      .map(([date, amount]) => ({ date, amount }));
  
    return result;
  };

  export const prepareIncomePieChartData = (data = []) => {
    if (!Array.isArray(data)) return [];
  
    const grouped = {};
  
    data.forEach((item) => {
      const source = item.source || "Unknown";
      grouped[source] = (grouped[source] || 0) + parseFloat(item.amount);
    });
  
    const result = Object.entries(grouped).map(([name, amount]) => ({
      name,
      amount,
    }));
  
    return result;
  };
  
  export const prepareIncomeBarChartData =(data =[])=>{
      const sortedData=[...data].sort((a,b)=>new Date(a.date)-new Date(b.date));

      const chartData= sortedData.map((item)=>({
        month:moment(item?.date).format('DD MMM'),
        amount: item?.amount,
        source: item?.source,
      }));
      return chartData;
  };

  export const prepareExpenseLineChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  
    const chartData = sortedData.map((item) => ({
      month: moment(item?.date).format('Do MMM'),
      amount: item?.amount,
      category: item?.category,
    }));
  
    return chartData;
  };
  