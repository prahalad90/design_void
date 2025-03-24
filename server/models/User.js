const pool = require('../config/db'); // PostgreSQL connection

// ✅ Create Users Table (Executed once when the server starts)
const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'employee' CHECK (role IN ('admin', 'employee')),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

createUserTable().catch(err => console.error('Error creating Users table:', err));

/* ✅ User Model Functions (Only Database Queries) */
const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const createUser = async (name, email, password, role = 'employee') => {
  const query = `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [name, email, password, role];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateUser = async (id, name, email, role) => {
  const query = `UPDATE users SET name = $1, email = $2, role = $3 WHERE id = $4 RETURNING *`;
  const values = [name, email, role, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

/* ✅ Export All Functions */
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
