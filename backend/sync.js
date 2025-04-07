const { sequelize } = require("./config/db");
const User = require("./models/User");
const Income = require("./models/Income");
const Expense = require("./models/Expense");
const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true }); // Change to `{ alter: true }` after first run
        console.log("✅ All models were synchronized successfully.");
        process.exit();
    } catch (error) {
        console.error("❌ Database synchronization failed:", error);
        process.exit(1);
    }
};

syncDatabase();
