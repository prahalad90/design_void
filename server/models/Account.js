const pool = require('../config/db');

const getAllEntry = async () => {
  const result = await pool.query('SELECT * FROM accounts');
  return result.rows;
};

const getEntryByInvoice = async (id) => {
  const query = 'SELECT * FROM accounts WHERE id = $1';
  const result = await pool.query(query, [id]);
  return result.rows[0];
};


module.exports = {
  getAllEntry,
  getEntryByInvoice,
};