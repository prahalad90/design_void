const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const getUserByEmail = require('../models/User')
const router = express.Router();
const pool = require('../config/db');


const SECRET_KEY = '2025';

// Register User
router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.json({ message: 'User registered' });
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }
      console.log('success')
      const token = jwt.sign({ email: user.email, id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
      const id = user.id
      res.json({ token, id});
    } 
  catch (err) {
      res.status(500).json({ error: 'Login failed' });
  }
});

// Protected Route
router.get('/protected', verifyToken, (req, res) => {
    res.json({ message: 'Protected content', user: req.user });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ error: 'No token provided' });

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        req.user = decoded;
        next();
    });
}

module.exports = router;
