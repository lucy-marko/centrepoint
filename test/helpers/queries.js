const dbConn = require('../../src/database/connection.js');

module.exports.deleteAll = (cb) => {
  dbConn.query("DELETE FROM requests; DELETE FROM users", (error, data) => {
    error ? cb(error) : cb(null, data.rows[0]);
  });
};

module.exports.insertAdmin = (user, cb) => {
  dbConn.query('INSERT INTO users (user_id, given_names, family_name, birth_date, phone_number, admin) VALUES ($1, $2, $3, $4, $5, true);',
    [user.id, user.givenNames, user.familyName, user.dateOfBirth, user.localNumber], (error, data) => {
      error ? cb(error) : cb(null);
    });
};

module.exports.addSampleData = (cb) => {
  let user = "INSERT INTO users (user_id, given_names, family_name, birth_date, phone_number, admin) VALUES ('Ve3xGlcu1u4ctazP02g8zZwGHM4ObotSfIYAXZzat4vBak2cfvz2m0iEBbrng79s', 'AIDAN', 'HUSSAIN', '1992-06-26', '07731154914', false);";
  let admin = "INSERT INTO users (user_id, given_names, family_name, birth_date, phone_number, admin) VALUES ('f6gxYlrktg9h4h3f6uc7zZYGHSKOHotA6PB887hRRft6NGmMt45c67G8iv0df5n6', 'SEAN', 'WEBB', '1994-10-10', '07839215014', true);";
  let request = "INSERT INTO requests (rental_reference, rental_arrears, rental_history, other_requests, email, street, town, postcode, time_stamp, user_id, assigned_user_id) VALUES (FALSE, TRUE, TRUE, '', 'AidanHussain@rhyta.com', NULL, NULL, NULL, current_timestamp, 'Ve3xGlcu1u4ctazP02g8zZwGHM4ObotSfIYAXZzat4vBak2cfvz2m0iEBbrng79s', 'f6gxYlrktg9h4h3f6uc7zZYGHSKOHotA6PB887hRRft6NGmMt45c67G8iv0df5n6');";
  let sampleData = `${user} ${admin} ${request}`
  dbConn.query(sampleData, (error, data) => {
      error ? cb(error) : cb(null);
    });
};
