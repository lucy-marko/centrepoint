const dbConn = require('../database/db_connection');

module.exports = (params, cb) => {
  console.log(params);
  dbConn.query('INSERT INTO requests (rental_reference, rental_arrears, rental_history, other_requests, email, street, town, postcode, time_stamp, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);',
  [params.rentalReference, params.rentalArrears, params.rentalHistory, params.otherRequests, params.email, params.street, params.town, params.postcode, 'now', 1], (error, data) => {
    error ? cb(error) : cb(null);
  });
};
