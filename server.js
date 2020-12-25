const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const corsOptions = {
  origin: true,
  credentials: true,
};

app.options("*", cors(corsOptions));

// Connect db
connectDB();

// Init middleware
app.use(
  express.json({
    extended: false,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Define routes
app.use("/api/items", require("./routes/api/items"));
app.use("/api/transaction", require("./routes/api/transaction"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
