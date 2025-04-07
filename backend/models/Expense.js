const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db"); // Sequelize instance

const Expense = sequelize.define("Expense", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", // Make sure 'Users' table exists
            key: "id",
        },
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false, // required: true in Mongoose
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    }
}, {
    timestamps: true, // Adds createdAt and updatedAt like Mongoose
});

module.exports = Expense;
