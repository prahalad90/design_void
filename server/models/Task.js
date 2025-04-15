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
  const query = `SELECT tasks.id AS task_id, project,  tasks.title,  tasks.description,  tasks.status,users.id AS user_id,  users.name AS user_name FROM tasks JOIN users ON tasks.user_id=users.id ORDER BY tasks.created_at DESC;`;
  const result = await pool.query(query);
  return result.rows;
};


const getTasksByUser = async (userId) => {
  const query = `SELECT * FROM tasks WHERE user_id = $1;`;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

const getTasksByProject = async (project) => {
  const query = `SELECT * FROM tasks WHERE project = $1;`;
  const result = await pool.query(query,[project]);

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
  console.log( taskId, status)
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
  getTasksByProject,
  updateTaskStatus,
  deleteTask,
};