const dbConn = require('../connection');

module.exports.insert = (request, userData, cb) => {
  console.log(request);
  dbConn.query('INSERT INTO requests (rental_reference, rental_arrears, rental_history, other_requests, email, street, town, postcode, time_stamp, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
    [request.rentalReference, request.rentalArrears, request.rentalHistory, request.otherRequests, request.email,
      request.street, request.town, request.postcode, 'now', userData.userId], (error, data) => {
      error ? cb(error) : cb(null);
    });
};

module.exports.retrieve = (cb) => {
  dbConn.query('SELECT * FROM requests INNER JOIN users ON users.id = requests.user_id;',
    (error, data) => {
      error ? cb(error) : cb(null, data.rows);
    });
};
