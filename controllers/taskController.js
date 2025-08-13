const Task = require("../models/task");

// Task oluşturma
exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;

    const task = new Task({
      title,
      description,
      status,
      priority,
      createdBy: req.user.id,
    });

    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Tüm görevleri listele (admin için)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// ID ile görevi getir (detay)
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task Not Found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Görevi güncelle
exports.updateTask = async (req, res) => {
  try {
    const { title, description, status, priority } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ message: "Task Not Found" });

    task.title = title !== undefined ? title : task.title;
    task.description = description !== undefined ? description : task.description;
    task.status = status !== undefined ? status : task.status;
    task.priority = priority !== undefined ? priority : task.priority;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Görevi sil
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task Not Found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
