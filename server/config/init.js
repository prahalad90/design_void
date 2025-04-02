const pool = require("./db");

const createTables = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            image TEXT,
            role VARCHAR(20) DEFAULT 'employee',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS attendance (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            check_in TIME NOT NULL,
            check_out TIME,
            working_hour INTERVAL,
            status VARCHAR(255) NOT NULL,
            date DATE DEFAULT CURRENT_DATE
        );

        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            project VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(50) DEFAULT 'pending',
            assignedby INTEGER REFERENCES users(id) ON DELETE CASCADE,
            duedate DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS customers (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL UNIQUE,  -- Ensuring uniqueness
            address TEXT NOT NULL,
            pincode TEXT NOT NULL,
            mobile VARCHAR(10) NOT NULL UNIQUE,
            email VARCHAR(50) NOT NULL UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
            description TEXT,
            status VARCHAR(50) DEFAULT 'Running',
            duedate DATE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS invoices (
            id SERIAL PRIMARY KEY,
            customer_id INTEGER REFERENCES customers(id) ON DELETE CASCADE,
            date DATE DEFAULT CURRENT_DATE,
            amount INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS invoiceitems (
            id SERIAL PRIMARY KEY,
            invoice INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
            description VARCHAR(255) NOT NULL,
            quantity INTEGER,
            price INTEGER,
            total INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
`
        );
        console.log("Tables checked and created if needed.");
    } catch (err) {
        console.error("Error creating tables:", err);
    }
};


module.exports = createTables;