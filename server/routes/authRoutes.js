const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const pool = require("../config/db"); // PostgreSQL connection
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

router.post(
    "/login",
    [body("email").isEmail(), body("password").notEmpty()],
    async (req, res) => {
      console.log(email, password)
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const { email, password } = req.body;
      
      try {
        // Check user in DB
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) {
          return res.status(400).json({ error: "Invalid email or password" });
        }
  
        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) {
          return res.status(400).json({ error: "Invalid email or password" });
        }
  
        // Generate JWT
        const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: "1h" });
  
        res.json({ token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email } });
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
    }
  );
  
  module.exports = router;