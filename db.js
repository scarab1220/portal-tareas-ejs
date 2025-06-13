const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'Melissa122023',
    host: 'localhost',
    port: 5432,
    database: 'taskportal'
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
