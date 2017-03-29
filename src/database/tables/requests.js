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
  // Match requests with details of ex-residents who made them
  let requestsUsersJoin = `(SELECT * FROM requests INNER JOIN users ON requests.user_id = users.user_id) AS join1`;
  // Match requests with details of admins who will process them
  let requestsAdminJoin = `(SELECT request_id, given_names AS admin_given_names, family_name AS admin_family_name FROM requests LEFT JOIN users ON requests.assigned_user_id = users.user_id) AS join2`;
  // Define ordering of requests as open > in progress > closed
  let customOrder = `CASE WHEN status='open' THEN 1 WHEN status='progress' THEN 2 WHEN status='closed' THEN 3 END`;
  // Combine ex-resident and admin details for each request
  let requestUsersAdminJoin = `SELECT * FROM ${requestsUsersJoin} INNER JOIN ${requestsAdminJoin} ON join1.request_id = join2.request_id ORDER BY ${customOrder}, time_stamp DESC;`;
  dbConn.query(requestUsersAdminJoin,
    (error, data) => {
      error ? cb(error) : cb(null, data.rows);
    });
};

module.exports.updateStatus = (request, cb) => {
  dbConn.query('UPDATE requests SET status = ($1) WHERE request_id = ($2);', [request.status, request.id],
    (error, data) => {
      error ? cb(error) : cb(null);
    });
};

module.exports.updateAssigned = (request, cb) => {
  dbConn.query('UPDATE requests SET assigned_user_id = ($1) WHERE request_id = ($2);', [request.admin === 'clear' ? null : request.admin, request.id],
    (error, data) => {
      error ? cb(error) : cb(null);
    });
};
