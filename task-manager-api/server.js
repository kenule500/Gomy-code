const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const AppError = require("./utils/AppError");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const globalErrorHandler = require("./middleware/errorHandler");

require("dotenv").config();

require("./config/passport");

const app = express();

app.use(helmet());

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(mongoSanitize());
app.use(xss());

const limiter = rateLimit({
  max: 100,
  windowMs: 15 * 60 * 1000,
  message: "Too many requests from this IP, please try again in 15 minutes.",
});
app.use("/api", limiter);

const authLimiter = rateLimit({
  max: 20,
  windowMs: 60 * 60 * 1000,
  message: "Too many login attempts, please try again in 1 hour.",
});
app.use("/api/auth/login", authLimiter);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/task-manager";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

module.exports = app;