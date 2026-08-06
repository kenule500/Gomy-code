const express = require("express");
const mongoose = require("mongoose");
const { createTable } = require("./config/mysql");

require("dotenv").config();

const nosqlRoutes = require("./routes/nosqlRoutes");
const sqlRoutes = require("./routes/sqlRoutes");

const app = express();

app.use(express.json());

app.use("/nosql/products", nosqlRoutes);
app.use("/sql/products", sqlRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Product CRUD API",
    endpoints: {
      nosql: {
        create: "POST   /nosql/products",
        getAll: "GET    /nosql/products",
        getOne: "GET    /nosql/products/:id",
        update: "PUT    /nosql/products/:id",
        delete: "DELETE /nosql/products/:id",
      },
      sql: {
        create: "POST   /sql/products",
        getAll: "GET    /sql/products",
        getOne: "GET    /sql/products/:id",
        update: "PUT    /sql/products/:id",
        delete: "DELETE /sql/products/:id",
      },
    },
  });
});

const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/product-crud";

async function start() {
  try {
    await createTable();
    console.log("MySQL table ready");

    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Startup error:", err.message);
    process.exit(1);
  }
}

start();