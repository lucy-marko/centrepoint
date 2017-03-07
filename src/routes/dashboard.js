module.exports = {
  method: 'GET',
  path:'/dashboard',
  handler: (req, reply) => {
    reply.view('dashboard',
    { given_names: 'Aidan',
      family_name: 'Hussain',
      email: 'AidanHussain@rhyta.com',
      phone_number: '07731154914',
      birth_date: '26 June 1992',
      street: '53 St Omers Road',
      town: 'Hindlip',
      postcode: 'WR3 8AS',
      accommodation history:true,
      rental arrears report: true,
      rental_reference: false,
      other_requests: false,
      time_stamp: '2017-03-03T14:10:17Z'
    });
  }
};
