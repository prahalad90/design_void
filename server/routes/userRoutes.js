const express = require("express");
const router = express.Router();
const multer = require("multer");
const bcrypt = require("bcryptjs");
const { getAllUsers, getUserById, createUser, updateUser, deleteUser } = require("../models/User");

router.use("/uploads", express.static("uploads"));
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", upload.single("image"),async (req, res) => {
  try {
    const { name, email, password, role} = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : null;
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser(name, email, hashedPassword, role, imagePath);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.put("/:id", async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const updatedUser = await updateUser(req.params.id, name, email, role);
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await deleteUser(req.params.id);
    if (!deletedUser) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted successfully", user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;