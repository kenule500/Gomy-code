const express = require("express");
const router = express.Router();
const sqlController = require("../controllers/SQLcontroller");

router.post("/", sqlController.createProduct);
router.get("/", sqlController.getProducts);
router.get("/:id", sqlController.getProduct);
router.put("/:id", sqlController.updateProduct);
router.delete("/:id", sqlController.deleteProduct);

module.exports = router;