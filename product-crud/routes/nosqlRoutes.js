const express = require("express");
const router = express.Router();
const nosqlController = require("../controllers/NoSQLcontroller");

router.post("/", nosqlController.createProduct);
router.get("/", nosqlController.getProducts);
router.get("/:id", nosqlController.getProduct);
router.put("/:id", nosqlController.updateProduct);
router.delete("/:id", nosqlController.deleteProduct);

module.exports = router;