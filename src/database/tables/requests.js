const dbConn = require('../connection');

module.exports.insert = (request, user, cb) => {
  console.log(request);
  dbConn.query('INSERT INTO requests (rental_reference, rental_arrears, rental_history, other_requests, email, street, town, postcode, time_stamp, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
    [request.rentalReference, request.rentalArrears, request.rentalHistory, request.otherRequests, request.email,
      request.street, request.town, request.postcode, 'now', user.id], (error, data) => {
      error ? cb(error) : cb(null);
    });
};

module.exports.retrieve = (cb) => {
  dbConn.query('SELECT * FROM requests INNER JOIN users ON requests.user_id = users.user_id ORDER BY active DESC, time_stamp DESC;',
    (error, data) => {
      error ? cb(error) : cb(null, data.rows);
    });
};

module.exports.updateStatus = (request, cb) => {
  console.log(request);
  dbConn.query('UPDATE requests SET active = ($1) WHERE request_id = ($2);', [request.active, request.id],
    (error, data) => {
      error ? cb(error) : cb(null);
    });
};
