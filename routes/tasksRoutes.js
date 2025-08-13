const express = require("express");
const router = express.Router();

const taskController = require("../controllers/taskController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const { checkTaskOwnership } = require("../middlewares/taskMiddleware");

// Görev oluşturma (user veya admin)
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["user", "admin"]),
  taskController.createTask
);

// Tüm görevleri listeleme (admin)
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  taskController.getAllTasks
);

//Sadece kendi görevlerini görüntüleme
router.get(
    "/my",
    authMiddleware,
    roleMiddleware(["user"]),
    taskController.getMyTasks
);
// Tek görevi görüntüleme (sahibi veya admin)
router.get(
  "/:id",
  authMiddleware,
  checkTaskOwnership,
  taskController.getTaskById
);

// Görevi güncelleme (sahibi veya admin)
router.put(
  "/:id",
  authMiddleware,
  checkTaskOwnership,
  taskController.updateTask
);

// Görevi silme (sahibi veya admin)
router.delete(
  "/:id",
  authMiddleware,
  checkTaskOwnership,
  taskController.deleteTask
);

module.exports = router;
