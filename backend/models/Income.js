const { DataTypes } = require("sequelize");
const {sequelize} = require("../config/db"); // Ensure you have a Sequelize instance configured

const Income = sequelize.define("Income", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Users", // Make sure the Users table exists
            key: "id",
        },
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    source: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = Income;
