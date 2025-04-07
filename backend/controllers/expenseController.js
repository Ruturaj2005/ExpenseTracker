const XLSX = require("xlsx");
const User= require("../models/User");
const Expense= require("../models/Expense");


exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body;

        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({  // fixed typo here
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();  // fixed typo here
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};



exports.getAllExpense = async(req,res) => {
    const userId= req.user.id;

    try{
        const expenses = await Expense.findAll({
            where: { userId },
            order: [['date', 'DESC']]
        });
        res.json(expenses);
    }catch(error){
        res.status(500).json({message:"Server Error"});
    }
};



exports.deleteExpense = async (req, res) => {
    try {
        const id = req.params.id;

        const deleted = await Expense.destroy({
            where: { id }
        });

        if (!deleted) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    try {
        const expense = await Expense.findAll({
            where: { userId },
            order: [['date', 'DESC']]
        });

        const data = expense.map((item) => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date.toISOString().split('T')[0] // format date
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, "Expense");

        const filePath = "expense_details.xlsx";
        XLSX.writeFile(wb, filePath);

        res.download(filePath);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.updateExpense = async (req, res) => {
    try {
        const id = req.params.id;
        const userId = req.user.id;
        const { icon, category, amount, date } = req.body;

        const expense = await Expense.findOne({ where: { id, userId } });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        // Update only provided fields
        if (icon !== undefined) expense.icon = icon;
        if (category !== undefined) expense.category = category;
        if (amount !== undefined) expense.amount = amount;
        if (date !== undefined) expense.date = new Date(date);

        await expense.save();

        res.status(200).json({ message: "Expense updated successfully", expense });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
