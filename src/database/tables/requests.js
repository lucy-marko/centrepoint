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
  let requestsUsersJoin = `(SELECT * FROM requests INNER JOIN users ON requests.user_id = users.user_id) AS join1`;
  let requestsAdminJoin = `(SELECT request_id, given_names AS admin_names, family_name AS admin_family FROM requests LEFT JOIN users ON requests.assigned_user_id = users.user_id) AS join2`;
  let customOrder = `CASE WHEN active='open' THEN 1 WHEN active='progress' THEN 2 WHEN active='closed' THEN 3 END`;
  dbConn.query(`SELECT * FROM ${requestsUsersJoin} INNER JOIN ${requestsAdminJoin} ON join1.request_id = join2.request_id ORDER BY ${customOrder}, time_stamp DESC;`,
    (error, data) => {
      error ? cb(error) : cb(null, data.rows);
    });
};

module.exports.updateStatus = (request, cb) => {
  dbConn.query('UPDATE requests SET active = ($1) WHERE request_id = ($2);', [request.active, request.id],
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
