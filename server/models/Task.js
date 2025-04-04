const pool = require('../config/db');

const addTask = async (userid,project,title,description,duedate,status='Pending',assignedby) => {
  const query = `
    INSERT INTO tasks (user_id, project, title, description, status, assignedby, duedate)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const newdate = new Date(duedate);
  const values = [userid,project, title, description,status,assignedby, newdate];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllTasks = async () => {
  const query = `SELECT * FROM tasks JOIN users ON tasks.user_id=users.id ORDER BY tasks.created_at DESC;`;
  const result = await pool.query(query);
  return result.rows;
};


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
  const result = await pool.query(query, [taskId, status]);
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