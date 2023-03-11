const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '18.217.4.250',
    user: 'root',
    password: 'dbassistencia',
    port: 3307,
    database: 'db_assistencia'
});

module.exports = connection;