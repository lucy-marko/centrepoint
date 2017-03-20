module.exports.formatStatus = function (status) {
  let map = {open: 'Open', progress: 'In progress', closed: 'Closed'};
  return map[status];
};
