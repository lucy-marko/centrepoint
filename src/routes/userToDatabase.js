module.exports = (params, cb) => {
  dbConn.query('INSERT INTO users (first_name, last_name, birth_date, phone) VALUES ($1, $2, $3);', [params.user, params.password, params.experience], (error, data) => {
    error ? cb(error) : cb(null);
  });
};

context = {
  givenNames: 'LUCY EMILY',
  familyName: 'MONIE',
  phoneNumber: '+447814560628',
  dateOfBirth: '1974-07-11'
}
