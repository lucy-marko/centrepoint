const dbConn = require('../connection');

module.exports.retrieve = (cb) => {
  dbConn.query('SELECT * FROM requests INNER JOIN users ON users.id = requests.user_id;',
    (error, data) => {
      error ? cb(error) : cb(null, data);
    });
};
