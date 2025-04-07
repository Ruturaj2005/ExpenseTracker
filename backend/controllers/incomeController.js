const XLSX = require("xlsx");
const User= require("../models/User");
const Income= require("../models/Income");


exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body;

        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({  // fixed typo here
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();  // fixed typo here
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};



exports.getAllIncome = async (req, res) => {
    const userId = req.user.id;
  
    try {
      const income = await Income.findAll({
        where: { userId },
        order: [["date", "DESC"]],
      });
  
      res.json(income);
    } catch (error) {
      console.error("Error fetching income:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  



exports.deleteIncome = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Income.destroy({
            where: { id }
        });

        if (!deleted) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const income = await Income.findAll({
            where: { userId },
            order: [['date', 'DESC']]
        });

        const data = income.map((item) => ({
            Source: item.source,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0] // format date
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Income");

        const filePath = "income_details.xlsx";
        XLSX.writeFile(wb, filePath);

        res.download(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
