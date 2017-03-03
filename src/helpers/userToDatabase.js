const dbConn = require('../database/db_connection');

module.exports = (context, cb) => {
  dbConn.query('INSERT INTO users (user_id, given_names, last_name, birth_date, phone) VALUES ($1, $2, $3, $4, $5);',
  [context.userId, context.givenNames, context.familyName, context.dateOfBirth, context.phoneNumber], (error, data) => {
    error ? cb(error) : cb(null);
  });
};
