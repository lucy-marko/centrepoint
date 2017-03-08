const authMiddleware = require('../helpers/authMiddleware.js')
const requestTable = require('../database/tables/requests.js')
const databaseError = "There was a problem retrieving data, please try again. If this problem persists, contact our technical team.";
const authenticationError = "You are not authenticated to access the data. If you are a Centrepoint administrator, contact our technical team."

module.exports = {
  method: 'GET',
  path:'/dashboard',
  config: {
    auth: {
      strategy: 'base'
    },
    pre: [
        { method: authMiddleware, assign: 'userData' }
    ],
    handler: (req, reply) => {
      if (! req.pre.userData.admin) {
        return reply.view('error', {
          error : authenticationError
        });
      }
      requestTable.retrieve(function (err, data) {
        if (err) {
          console.log("Error retrieving requests: ", err);
          return reply.view('error', {
            error: databaseError
          });
        }
        reply.view('dashboard', { requests: data });
      });
    }
  }
};
//
//     reply.view('dashboard',
//     { requests: [
//       { given_names: 'Aidan',
//         family_name: 'Hussain',
//         email: 'AidanHussain@rhyta.com',
//         phone_number: '07731154914',
//         birth_date: '26 June 1992',
//         street: '53 St Omers Road',
//         town: 'Hindlip',
//         postcode: 'WR3 8AS',
//         accommodation_history:true,
//         rental_arrearsreport: true,
//         rental_reference: false,
//         other_requests: false,
//         time_stamp: '2017-03-03T14:10:17Z'
//       },
//       { given_names: 'Caitlin',
//         family_name: 'Jones',
//         email: 'catyjojo17@yahoo.co.uk',
//         phone_number: '07081725208',
//         birth_date: '29 November 1996',
//         street: '45 Canterbury Road',
//         town: 'Uton',
//         postcode: 'BB3 6AD',
//         accommodation_history:true,
//         rental_arrearsreport: false,
//         rental_reference: false,
//         other_requests: 'I am trying to join the point but I can\'t submit the form',
//         time_stamp: '2017-03-01T09:22:01Z'
//       },
//       { given_names: 'Sean',
//         family_name: 'Webb',
//         email: 'seanwev94@rhyta.com',
//         phone_number: '07839215014',
//         birth_date: '10 October 1994',
//         street: '15 Cefn Road',
//         town: 'Farnell',
//         postcode: 'DD9 5YZ',
//         accommodation_history:false,
//         rental_arrearsreport: true,
//         rental_reference: false,
//         other_requests: false,
//         time_stamp: '2017-02-27T11:03:34Z'
//       }
//     ]});
//   }
// };
