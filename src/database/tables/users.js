const dbConn = require('../connection');

module.exports.insert = (user, cb) => {
  dbConn.query('INSERT INTO users (user_id, given_names, family_name, birth_date, phone_number) VALUES ($1, $2, $3, $4, $5);',
    [user.id, user.givenNames, user.familyName, user.dateOfBirth, user.localNumber], (error, data) => {
      error ? cb(error) : cb(null);
    });
};

module.exports.getUserId = (user, cb) => {
  dbConn.query('SELECT * FROM users WHERE user_id=($1);', [user.id], (error, data) => {
    error ? cb(error) : cb(null, data.rows[0]);
  });
};

module.exports.retrieveAdmins = (cb) => {
  dbConn.query('SELECT * FROM users WHERE admin = true;', (error, data) => {
    error ? cb(error) : cb(null, data.rows);
  });
};

module.exports.updateAdmin = (user, cb) => {
  console.log(user);
  dbConn.query('UPDATE users SET admin = true WHERE given_names = ($1) AND family_name = ($2) AND phone_number = ($3);', [user.givenNames, user.familyName, user.localNumber],
    (error, data) => {
      error ? cb(error) : cb(null, data);
    });
};
