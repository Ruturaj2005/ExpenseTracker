const { Op } = require("sequelize");
const Income = require("../models/Income");
const Expense = require("../models/Expense");

exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;

        // Total Income
        const totalIncome = await Income.sum("amount", { where: { userId } });

        // Total Expense
        const totalExpense = await Expense.sum("amount", { where: { userId } });

        // Income in Last 60 Days
        const sixtyDaysAgo = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000);
        const last60DaysIncomeTransactions = await Income.findAll({
            where: {
                userId,
                date: {
                    [Op.gte]: sixtyDaysAgo
                }
            },
            order: [["date", "DESC"]]
        });

        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, txn) => sum + parseFloat(txn.amount),
            0
        );

        // Expense in Last 30 Days
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const last30DaysExpenseTransactions = await Expense.findAll({
            where: {
                userId,
                date: {
                    [Op.gte]: thirtyDaysAgo
                }
            },
            order: [["date", "DESC"]]
        });

        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, txn) => sum + parseFloat(txn.amount),
            0
        );
        console.log("🧾 Last 30 Days Expenses:", last30DaysExpenseTransactions);


        // Last 5 Transactions
        const lastIncome = await Income.findAll({
            where: { userId },
            order: [["date", "DESC"]],
            limit: 5
        });

        const lastExpense = await Expense.findAll({
            where: { userId },
            order: [["date", "DESC"]],
            limit: 5
        });

        const lastTransactions = [
            ...lastIncome.map((txn) => ({ ...txn.toJSON(), type: "income" })),
            ...lastExpense.map((txn) => ({ ...txn.toJSON(), type: "expense" }))
        ]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 5);

        // Final Response
        res.status(200).json({
            totalBalance: (totalIncome || 0) - (totalExpense || 0),
            totalIncome: totalIncome || 0,
            totalExpense: totalExpense || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions.map(txn => txn.toJSON())
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions
            },
            recentTransactions: lastTransactions
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", error });
    }
};
