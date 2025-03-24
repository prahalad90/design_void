const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./models/User");
require("./models/Attendance");
require("./models/Task");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use(cors());


// Connect to MongoDB
connectDB();

// Sample Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
