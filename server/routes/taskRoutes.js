const express = require("express");
const router = express.Router();
const { getAllTasks, addTask, getTasksByUser, getTasksByProject, updateTaskStatus, deleteTask } = require("../models/Task");

router.get("/", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const task = await getTasksByUser(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    console.log(task)
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/project/:id", async (req, res) => {
  try {

    const task = await getTasksByProject(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const { userid, project, title, description,duedate,assignedby } = req.body;
    const status="Pending"
    const newTask = await addTask(userid, project, title, description,duedate, status,assignedby);
    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const updateTask = await updateTaskStatus(status);
    if (!updateTask) return res.status(404).json({ error: "Task not found" });
    res.json(updateTask);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const taskDelete = await deleteTask(req.params.id);
    if (!taskDelete) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully", user: taskDelete });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
