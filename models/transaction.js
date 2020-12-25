const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  item: {
    type: Array,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

module.exports = Transaction = mongoose.model(
  "transactions",
  TransactionSchema,
  "transaction-data"
);
