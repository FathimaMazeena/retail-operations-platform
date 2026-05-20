const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");


const errorMiddleware = require("./middleware/errorMiddleware");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");

const app = express();

// Core Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));


// Health Check Route
app.get("/", (req, res) => {
  res.json({
    message: "MultiGems ERP API Running",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;

