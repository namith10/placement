const express = require("express");
const {
  initializeDatabase,
  getTransactions,
  getStatistics,
  getBarChartData,
  getPieChartData,
  getCombinedData,
} = require("../controllers/transactionController");

const router = express.Router();

router.get("/initialize", initializeDatabase);
router.get("/transactions", getTransactions);
router.get("/statistics", getStatistics);
router.get("/barchart", getBarChartData);
router.get("/piechart", getPieChartData);
router.get("/combined", getCombinedData);

module.exports = router;
