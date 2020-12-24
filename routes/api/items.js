const express = require("express");
const Items = require("../../models/Items");

const router = express.Router();

// @route   POST api/items
// @desc    Add new item
// @access  public
router.post("/", async (req, res) => {
  const { category, price } = req.body;

  try {
    let item = new Items({
      category,
      price,
    });

    await item.save();

    return res.json({ item });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

// @route   GET api/items
// @desc    Get all items
// @access  public
router.get("/", async (req, res) => {
  try {
    let items = await Items.find().sort({ createdAt: -1 });

    return res.json({ items });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

module.exports = router;
