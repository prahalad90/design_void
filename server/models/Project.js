const pool = require('../config/db');

const getAllProjects = async () => {
    const result = await pool.query('SELECT * FROM projects');
    return result.rows;
  };

const getProjectbyID = async (id)=>{
    const query = 'SELECT * FROM projects WHERE id = $1';
    const result = await pool.query(query,[id])
    return result.rows[0]
}

const addProject = async (name, description, status = 'Pending', duedate)=>{ 
    const query = 'INSERT INTO projects (customer_id, description, status, duedate) VALUES ($1, $2, $3, $4) RETURNING *;'
    const values = [name, description, status, duedate];
    const result = await pool.query(query, values);
    return result.rows[0];
}

module.exports = {
    getAllProjects,
    getProjectbyID,
    addProject
}