const { Sequelize } = require("sequelize");
require("dotenv").config();

// Initialize Sequelize with MySQL credentials
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, // Corrected from DB_PASS to DB_PASSWORD
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
    }
);
// Function to connect to DB
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ MySQL Database Connected Successfully!");
    } catch (error) {
        console.error("❌ MySQL Connection Failed:", error.message);
        process.exit(1);
    }
};

// Export sequelize instance
module.exports = { sequelize, connectDB };
