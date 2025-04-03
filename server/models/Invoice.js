const pool = require('../config/db');

const getAllInvoice = async () => {
    const query = 'SELECT * FROM invoices JOIN customers ON invoices.customer_id = customers.id';
    const result = await pool.query(query);
    console.log(result.rows)
    return result.rows;
};

const getInvoiceById = async (id) => {
    const query = 'SELECT * FROM invoices WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

const addInvoice = async (name, amount, date, particular) =>{
    const query = `INSERT INTO invoices (customer_id, particular, date, amount) VALUES ($1, $2, $3, $4) RETURNING *;`;
    const value = [name, particular, date, amount]
    console.log(value)
    const result = await pool.query(query, value);
    return result.rows[0];
}

const getInvoiceByCustomer = async(id) =>{
    const query = 'SELECT * FROM invoices WHERE customer_id = $1';
    const result = await pool.query(query, [id]);
    return result.rows;
}


module.exports = {
    getAllInvoice,
    getInvoiceById,
    getInvoiceByCustomer,
    addInvoice,
};