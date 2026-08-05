const express = require("express");
const { verifyToken } = require("../middleware/auth");
const taskController = require("../controllers/taskController");

const router = express.Router();

router.use(verifyToken);

router.route("/")
  .post(taskController.createTask)
  .get(taskController.getTasks);

router.route("/:id")
  .delete(taskController.deleteTask);

module.exports = router;