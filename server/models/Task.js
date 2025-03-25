const pool = require('../config/db');

// ✅ Add a New Task
const addTask = async (title, description, assignedTo, dueDate, status = 'pending') => {
  const query = `
    INSERT INTO tasks (title, description, assigned_to, due_date, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [title, description, assignedTo, dueDate, status];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// ✅ Get All Tasks
const getAllTasks = async () => {
  const query = `SELECT * FROM tasks ORDER BY created_at DESC;`;
  const result = await pool.query(query);
  return result.rows;
};

// ✅ Get Tasks Assigned to a User
const getTasksByUser = async (userId) => {
  const query = `SELECT * FROM tasks WHERE assigned_to = $1 ORDER BY due_date ASC;`;
  const result = await pool.query([userId]);
  return result.rows;
};

// ✅ Update Task Status
const updateTaskStatus = async (taskId, status) => {
  const query = `
    UPDATE tasks
    SET status = $1
    WHERE id = $2
    RETURNING *;
  `;
  const result = await pool.query(query, [status, taskId]);
  return result.rows[0];
};

// ✅ Delete Task
const deleteTask = async (taskId) => {
  const query = `DELETE FROM tasks WHERE id = $1 RETURNING *;`;
  const result = await pool.query(query, [taskId]);
  return result.rows[0];
};

module.exports = {
  addTask,
  getAllTasks,
  getTasksByUser,
  updateTaskStatus,
  deleteTask,
};
