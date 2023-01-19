require('dotenv').config()
const mysql = require('mysql2')

const pool = mysql.createPool({
    user: process.env.SQLDB_USER,
    host: process.env.SQLDB_HOST,
    password: process.env.SQLDB_PASSWORD,
    database: process.env.SQLDB_DATABASE
}).promise()

module.exports = pool