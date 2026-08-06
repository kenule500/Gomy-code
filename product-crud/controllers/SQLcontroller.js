const { pool } = require("../config/mysql");

exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;

    const sql =
      "INSERT INTO products (name, price, category, inStock) VALUES (?, ?, ?, ?)";
    const [result] = await pool.execute(sql, [
      name,
      price,
      category || null,
      inStock !== undefined ? inStock : true,
    ]);

    res.status(201).json({
      status: "success",
      data: {
        product: {
          id: result.insertId,
          name,
          price,
          category: category || null,
          inStock: inStock !== undefined ? inStock : true,
        },
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM products");

    res.status(200).json({
      status: "success",
      results: rows.length,
      data: { products: rows },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: { product: rows[0] },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category, inStock } = req.body;
    const sql =
      "UPDATE products SET name = ?, price = ?, category = ?, inStock = ? WHERE id = ?";
    const [result] = await pool.execute(sql, [
      name,
      price,
      category || null,
      inStock !== undefined ? inStock : true,
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    const [rows] = await pool.execute("SELECT * FROM products WHERE id = ?", [
      req.params.id,
    ]);

    res.status(200).json({
      status: "success",
      data: { product: rows[0] },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const [result] = await pool.execute("DELETE FROM products WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: "fail",
        message: "Product not found",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};