const sequelize = require('sequelize');

var createModel = function(seq, name, dataTypes) {
  return seq.define(name, dataTypes);
}

var createConn = function(database, username, password, host, type, pool, port, callback) {
  console.log(`trying ${type}`);
  var temp = new sequelize(database, username, password, {
    'host': host,
    'dialect': type,
    'pool': pool,
    'port': port
  });
  temp.authenticate()
    .then(() => {
      console.log(`good ${type}`);
      callback(temp);
    })
    .catch(err => {
      console.log(`bad ${type} `  + err);
      return;
    });
}

module.exports = {
  'model': createModel,
  'conn': createConn
};
