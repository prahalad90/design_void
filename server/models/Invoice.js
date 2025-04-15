const pool = require('../config/db');

const getAllInvoice = async () => {
    const query = `SELECT 
  invoices.invoice_number,
  customers.name,
  invoices.date,
  SUM(invoices.price * invoices.quantity) AS total_amount,
  COALESCE(SUM(accounts.amount_received), 0) AS amount_received
FROM invoices
JOIN customers ON invoices.customer_id = customers.id
LEFT JOIN accounts ON invoices.invoice_number = accounts.invoice_number
GROUP BY invoices.invoice_number, customers.name, invoices.date
ORDER BY invoices.invoice_number DESC;`;
    const result = await pool.query(query);
    console.log(result.rows)
    return result.rows;
};

const getInvoiceById = async (id) => {
    const query = 'SELECT * FROM invoices WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
}

const getLastInvoiceNumber = async () => {
    const result = await pool.query("SELECT id FROM invoices ORDER BY id DESC LIMIT 1");
    return result.rows[0]?.id || 0;
  };

const addInvoice = async (invoice, customer, particular, date, item, quantity, price ) =>{
    const query = `INSERT INTO invoices (invoice_number, customer_id, particular, date, item, quantity, price) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`;
    const value = [invoice, customer, particular, date, item,quantity,price]
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
    getLastInvoiceNumber,
};