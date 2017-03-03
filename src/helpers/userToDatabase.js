const dbConn = require('../database/db_connection');

module.exports = (context, cb) => {
  dbConn.query('INSERT INTO users (first_name, last_name, birth_date, phone) VALUES ($1, $2, $3, $4);',
  [context.givenNames, context.familyName, context.dateOfBirth, context.phoneNumber], (error, data) => {
    error ? cb(error) : cb(null);
  });
};
