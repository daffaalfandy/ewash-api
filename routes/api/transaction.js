const express = require("express");
const Transaction = require("../../models/transaction");

const router = express.Router();

// @route   POST api/transaction
// @desc    Add new transaction
// @access  Public
router.post("/", async (req, res) => {
  const { total, item, date, month, year } = req.body;

  try {
    let transaction = new Transaction({
      total,
      item,
      date,
      month,
      year,
    });

    await transaction.save();

    return res.json({ msg: "success" });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

module.exports = router;
