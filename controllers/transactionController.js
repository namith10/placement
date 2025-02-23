const axios = require("axios");
const Transaction = require("../models/Transaction");

exports.initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get(process.env.THIRD_PARTY_API);
    await Transaction.deleteMany();
    await Transaction.insertMany(data);
    res.status(200).json({ message: "Database initialized successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "", month } = req.query;

    const regex = new RegExp(search, "i");
    const filter = {};

    if (month) {
      const startDate = new Date(`2000-${month}-01`);
      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      filter.dateOfSale = { $gte: startDate, $lt: endDate };
    }

    const monthStr = month.toString().padStart(2, "0");

    const filteredTransactions = transactions.filter(
      (t) => new Date(t.dateOfSale).getMonth() + 1 === parseInt(monthStr)
    );

    const totalSaleAmount = filteredTransactions
      .filter((t) => t.sold)
      .reduce((sum, t) => sum + t.price, 0);

    const totalSoldItems = filteredTransactions.filter((t) => t.sold).length;
    const totalNotSoldItems = filteredTransactions.length - totalSoldItems;

    const transactions = await Transaction.find(filter)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = monthNames.indexOf(month);
    if (monthIndex === -1) {
      return res.status(400).json({ error: "Invalid month name" });
    }

    const startDate = new Date(2000, monthIndex, 1);
    const endDate = new Date(2000, monthIndex + 1, 1);

    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const totalSaleAmount = transactions
      .filter((t) => t.sold)
      .reduce((sum, t) => sum + t.price, 0);

    const totalSoldItems = transactions.filter((t) => t.sold).length;
    const totalNotSoldItems = transactions.length - totalSoldItems;

    res.json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBarChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = monthNames.indexOf(month);
    if (monthIndex === -1) {
      return res.status(400).json({ error: "Invalid month name" });
    }

    const startDate = new Date(2000, monthIndex, 1);
    const endDate = new Date(2000, monthIndex + 1, 1);

    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const priceRanges = {
      "0-100": 0,
      "101-200": 0,
      "201-300": 0,
      "301-400": 0,
      "401-500": 0,
      "501-600": 0,
      "601-700": 0,
      "701-800": 0,
      "801-900": 0,
      "901-above": 0,
    };

    transactions.forEach((t) => {
      if (t.price <= 100) priceRanges["0-100"]++;
      else if (t.price <= 200) priceRanges["101-200"]++;
      else if (t.price <= 300) priceRanges["201-300"]++;
      else if (t.price <= 400) priceRanges["301-400"]++;
      else if (t.price <= 500) priceRanges["401-500"]++;
      else if (t.price <= 600) priceRanges["501-600"]++;
      else if (t.price <= 700) priceRanges["601-700"]++;
      else if (t.price <= 800) priceRanges["701-800"]++;
      else if (t.price <= 900) priceRanges["801-900"]++;
      else priceRanges["901-above"]++;
    });

    res.json(priceRanges);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPieChartData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthIndex = monthNames.indexOf(month);
    if (monthIndex === -1) {
      return res.status(400).json({ error: "Invalid month name" });
    }

    const startDate = new Date(2000, monthIndex, 1);
    const endDate = new Date(2000, monthIndex + 1, 1);

    const transactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const categoryCounts = {};
    transactions.forEach((t) => {
      categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
    });

    res.json(categoryCounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStatisticsData = async (month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = monthNames.indexOf(month);
  if (monthIndex === -1) throw new Error("Invalid month name");

  const startDate = new Date(2000, monthIndex, 1);
  const endDate = new Date(2000, monthIndex + 1, 1);

  const transactions = await Transaction.find({
    dateOfSale: { $gte: startDate, $lt: endDate },
  });

  const totalSaleAmount = transactions
    .filter((t) => t.sold)
    .reduce((sum, t) => sum + t.price, 0);
  const totalSoldItems = transactions.filter((t) => t.sold).length;
  const totalNotSoldItems = transactions.length - totalSoldItems;

  return { totalSaleAmount, totalSoldItems, totalNotSoldItems };
};

const getBarChartData = async (month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = monthNames.indexOf(month);
  if (monthIndex === -1) throw new Error("Invalid month name");

  const startDate = new Date(2000, monthIndex, 1);
  const endDate = new Date(2000, monthIndex + 1, 1);

  const transactions = await Transaction.find({
    dateOfSale: { $gte: startDate, $lt: endDate },
  });

  const priceRanges = {
    "0-100": 0,
    "101-200": 0,
    "201-300": 0,
    "301-400": 0,
    "401-500": 0,
    "501-600": 0,
    "601-700": 0,
    "701-800": 0,
    "801-900": 0,
    "901-above": 0,
  };

  transactions.forEach((t) => {
    if (t.price <= 100) priceRanges["0-100"]++;
    else if (t.price <= 200) priceRanges["101-200"]++;
    else if (t.price <= 300) priceRanges["201-300"]++;
    else if (t.price <= 400) priceRanges["301-400"]++;
    else if (t.price <= 500) priceRanges["401-500"]++;
    else if (t.price <= 600) priceRanges["501-600"]++;
    else if (t.price <= 700) priceRanges["601-700"]++;
    else if (t.price <= 800) priceRanges["701-800"]++;
    else if (t.price <= 900) priceRanges["801-900"]++;
    else priceRanges["901-above"]++;
  });

  return priceRanges;
};

const getPieChartData = async (month) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthIndex = monthNames.indexOf(month);
  if (monthIndex === -1) throw new Error("Invalid month name");

  const startDate = new Date(2000, monthIndex, 1);
  const endDate = new Date(2000, monthIndex + 1, 1);

  const transactions = await Transaction.find({
    dateOfSale: { $gte: startDate, $lt: endDate },
  });

  const categoryCounts = {};
  transactions.forEach((t) => {
    categoryCounts[t.category] = (categoryCounts[t.category] || 0) + 1;
  });

  return categoryCounts;
};

exports.getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;

    if (!month) {
      return res.status(400).json({ error: "Month is required" });
    }

    // Fetch all data in parallel
    const [statistics, barChart, pieChart] = await Promise.all([
      getStatisticsData(month),
      getBarChartData(month),
      getPieChartData(month),
    ]);

    res.json({ statistics, barChart, pieChart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
