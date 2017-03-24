const fs = require('fs');

const dbConn = require('./connection');

const sql = fs.readFileSync(`${__dirname}/build_database.sql`).toString();

dbConn.query(sql, (error, result) => {
  if (error) {
    console.log('Error', error)
  } else {
    console.log('Result', result);
  }
  process.exit()
});
