const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_BArtS4sYH5Uq@ep-damp-union-a1jb8yqy-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
    ssl: {rejectUnauthorized: false}
});
  
pool.connect ()
    .then(() => console.log('connect with Postgre'))
    .catch(err => console.log('Connection erro', err.stack));

module.exports = pool;