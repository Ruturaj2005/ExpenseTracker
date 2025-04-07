const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboardController");
const authenticate = require("../middleware/authMiddleware"); // ✅ This line was missing

router.get('/dashboard', authenticate, dashboardController.getDashboardData);

module.exports = router;
