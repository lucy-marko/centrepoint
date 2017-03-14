const fs = require('fs');

const dbConn = require('./connection');

const sql = fs.readFileSync(`${__dirname}/build_database.sql`).toString();

dbConn.query(sql, (error, result) =>
  (error
  ? console.log('Error', error)
  : console.log('Result', result)));
