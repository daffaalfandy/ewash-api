const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = Items = mongoose.model("items", ItemsSchema, "items-data");
