const pool = require('../config/db');

// ✅ Add Attendance Record
const addAttendance = async (userId, checkIn, checkOut = null, status = 'present', workingHours = '0 hours') => {
  const query = `
    INSERT INTO attendance (user_id, check_in, check_out, status, working_hours)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [userId, checkIn, checkOut, status, workingHours];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// ✅ Get Attendance by User
const getAttendanceByUser = async (userId) => {
  const query = `SELECT * FROM attendance WHERE user_id = $1 ORDER BY date DESC;`;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

// ✅ Update Attendance Record
const updateAttendance = async (id, checkOut, workingHours, status) => {
  const query = `
    UPDATE attendance
    SET check_out = $1, working_hours = $2, status = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [checkOut, workingHours, status, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  addAttendance,
  getAttendanceByUser,
  updateAttendance,
};
