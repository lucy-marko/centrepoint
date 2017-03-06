module.exports = {
  method:'GET',
  path:'/public/{file*}',
  handler: {
    directory: {
      path: 'public'
    }
  }
};
