process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});

const express = require("express");
const cors = require("cors");


require("dotenv").config();
require("./models/User");
require("./models/Attendance");
require("./models/Task");

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const customerRoutes = require("./routes/customerRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const accountRoutes = require("./routes/accountRoutes");
const bcrypt = require('bcryptjs');
const pool = require("./config/db");
const createTables = require("./config/init");

const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "design_void_2025";
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/project", projectRoutes);
app.use("/auth", authRoutes);
app.use("/api/attendance",attendanceRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/accountRoutes", accountRoutes);
app.use('/uploads', express.static('uploads'));


createTables().then(() => {
    console.log('✅ Database initialized successfully.');
    
  }).catch(err => {
    console.error('❌ Failed to initialize database:', err.stack);
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
