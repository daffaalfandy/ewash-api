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

router.get("/", async (req, res) => {
  const date = req.query.d;
  const month = req.query.m;
  const year = req.query.y;
  const type = req.query.data;

  try {
    let transaction;
    if (type === "daily") {
      transaction = await Transaction.find({
        date,
        month,
        year,
      }).sort({ createdAt: -1 });
    }
    if (type === "monthly") {
      transaction = await Transaction.find({
        month,
        year,
      });

      let items = [];

      transaction.forEach((trans) => {
        trans.item.forEach((x) => {
          let category = {
            date: trans.date,
            id: x.category._id,
            name: x.category.category,
            qty: Number(x.qty),
            price: Number(x.price),
          };
          let available = false;

          items.filter((item) => {
            if (category.id === item.id && category.date === item.date) {
              (item.qty += category.qty), (item.price += category.price);
              available = true;
            }
          });

          if (!available) {
            items.push(category);
          }
        });
      });
      transaction = items;
    }
    if (type === "yearly") {
      let data = [];
      let items = await Transaction.find({ year }).sort({ createdAt: -1 });
      let income = 0;
      for (i = 0; i < items.length; i++) {
        if (income === 0) {
          income = items[i].total;
        } else {
          if (items[i].month === items[i - 1].month) {
            income += items[i].total;
          } else {
            income = items[i].total;
          }
          if (i + 1 !== items.length) {
            if (items[i].month !== items[i + 1].month) {
              data.push({ month: items[i].month, income });
            }
          } else {
            data.push({ month: items[i].month, income });
          }
        }
      }
      transaction = data;
    }

    return res.json({ transaction });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

module.exports = router;
