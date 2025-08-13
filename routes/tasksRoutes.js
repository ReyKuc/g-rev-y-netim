const express = require("express")
const router = express.Router()

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

router.post(
    "/",
    authMiddleware,
    roleMiddleware(["user","admin"]),
    taskController.createTask
);

router.get(
    "/",
    authMiddleware,
    roleMiddleware(["admin"]),
    taskController.getAllTasks
);

router.get(
    "/:id",
    authMiddleware,
    checkTaskOwnership,
    taskController.getAllTasks
);

router.put(
    "/:id",
    authMiddleware,
    checkTaskOwnership,
    taskController.updateTask
);

router.delete(
    "/:id",
    authMiddleware,
    checkTaskOwnership,
    taskController.deleteTask
);

module.exports = router;