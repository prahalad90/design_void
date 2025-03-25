const pool = require('../config/db');

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


module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};
