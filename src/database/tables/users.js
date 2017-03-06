const dbConn = require('../connection');

module.exports.insert = (user, cb) => {
  dbConn.query('INSERT INTO users (id, given_names, family_name, birth_date, phone_number) VALUES ($1, $2, $3, $4, $5);',
    [user.id, user.givenNames, user.familyName, user.dateOfBirth, user.phoneNumber], (error, data) => {
      error ? cb(error) : cb(null);
    });
};
