const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_8FepLmZo5ulN@ep-broad-art-a564k7r7-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
    ssl: {rejectUnauthorized: false}
});
  
pool.connect ()
    .then(() => console.log('connect with Postgre'))
    .catch(err => console.log('Connection erro', err.stack));

module.exports = pool;