const pool = require('../config/db');


// ✅ Add Attendance Record
const addAttendance = async (userId, checkIn=new Date().toLocaleTimeString(), checkOut = null, status = 'Punch In', workingHours = '0 hours') => {
  const query = `
    INSERT INTO attendance (user_id, check_in, check_out, working_hour, status)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;

  const values = [userId, checkIn, checkOut, workingHours, status];
  console.log(values)
  const result = await pool.query(query, values);

  return result.rows[0];
};

// ✅ Get Attendance by User
const getAttendanceByUser = async (userId) => {
  const query = `SELECT * FROM attendance WHERE user_id = $1 ORDER BY date DESC;`;
  const result = await pool.query(query, [userId]);

  return result.rows;
};

const getAttendanceAll = async () => {
  const query = `SELECT * FROM attendance JOIN users ON attendance.user_id = users.id WHERE date = CURRENT_DATE ORDER BY date DESC;`;
  const result = await pool.query(query);
  return result.rows;
};


const checkUserAttendanceToday = async (userId) => {

  const query = `SELECT * FROM attendance WHERE user_id = $1 AND date = CURRENT_DATE;`;
  const result = await pool.query(query, [userId]);

  if (result.rows.length > 0) {
    return {status: result.rows[0].status}  
  } else{
    return { status: "Not Marked" }; 
  }
};



// ✅ Update Attendance Record
const updateAttendance = async (id, checkOut = new Date().toLocaleTimeString(), status = 'Punch Out') => {
  // Fetch the latest check-in record for the user
  const punchinquery = `SELECT * FROM attendance WHERE user_id = $1 ORDER BY date DESC LIMIT 1;`;
  const entry = await pool.query(punchinquery, [id]);

  if (entry.rows.length === 0 || !entry.rows[0].check_in) {
    throw new Error("No check-in record found for user.");
  }

  const checkInTime = entry.rows[0].check_in.toString(); // Ensure it's a string
  const [checkInHours, checkInMinutes, checkInSeconds] = checkInTime.split(":").map(Number);
  const checkInTotalSeconds = checkInHours * 3600 + checkInMinutes * 60 + checkInSeconds;

  // Get current time in seconds
  const now = new Date();
  const currentTotalSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  // Calculate total time worked (in HH:MM:SS format for PostgreSQL INTERVAL)
  const totalSecondsWorked = currentTotalSeconds - checkInTotalSeconds;
  const hours = Math.floor(totalSecondsWorked / 3600);
  const minutes = Math.floor((totalSecondsWorked % 3600) / 60);
  const seconds = totalSecondsWorked % 60;

  const workingHourInterval = `${hours}:${minutes}:${seconds}`; // PostgreSQL INTERVAL format

  // Update attendance record (fixing WHERE condition)
  const query = `
    UPDATE attendance
    SET check_out = $1, working_hour = $2::INTERVAL, status = $3
    WHERE user_id = $4 AND check_out IS NULL
    RETURNING *;
  `;
  const values = [checkOut, workingHourInterval, status, id];
  console.log("Updating Attendance:", values);

  const result = await pool.query(query, values);
  if (result.rows.length === 0) {
    throw new Error("Attendance update failed.");
  }

  return result.rows[0];
};


module.exports = {
  addAttendance,
  getAttendanceByUser,
  updateAttendance,
  checkUserAttendanceToday,
  getAttendanceAll,
};
