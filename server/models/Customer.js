const pool = require('../config/db');

const addCustomer = async (name, address, pincode, mobile, email) => {
    const query = `INSERT INTO customers (name, address, pincode, mobile, email) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const values = [name, address, pincode, mobile, email];
    const result = await pool.query(query, values);
    return result.rows[0];
};


const getCustomerById = async (id) => {
    const query = 'SELECT * FROM customers WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
};

const updateCustomer = async (id, name, address, pincode, mobile, email) => {
    const query = `UPDATE customers SET name = $1, address = $2, pincode = $3, mobile = $4, email = $5 WHERE id = $6 RETURNING *`;
    const values = [name, address, pincode, mobile, email, id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getAllCustomer = async () => {
    const query = 'SELECT * FROM customers ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
};

const deleteCustomer = async (id) => {
    const query = 'DELETE FROM customers WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  };


module.exports = {
    getCustomerById,
    addCustomer,
    getAllCustomer,
    updateCustomer,
    deleteCustomer
};
