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

// @route   PUT api/items/{id}
// @desc    Update item
// @access  public
router.put("/:id", async (req, res) => {
  const _id = req.params.id;
  const { category, price } = req.body;

  try {
    let item = await Items.findById(_id);
    if (!item) {
      return res.status(400);
    }

    item.category = category;
    item.price = price;
    await item.save();

    return res.json({ item });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

// @route   DELETE api/items/{id}
// @desc    Delete item
// @access  public
router.delete("/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    let item = await Items.findById(_id);
    if (!item) {
      return res.status(400);
    }

    await Items.deleteOne({ _id });

    return res.json({ msg: "success" });
  } catch (err) {
    console.log(err.message);
    req.status(500).send("Server error");
  }
});

module.exports = router;
