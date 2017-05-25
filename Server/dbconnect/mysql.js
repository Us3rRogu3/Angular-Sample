const sequelize = require('sequelize');

const details = require('./dbdetails').mysql;
const connections = require('./sequelizeinit');

var mysql;
var hero;
var synced = false;

function reinit() {
  connections.conn(details.database, details.username, details.password, details.host, details.type, details.pool, details.port, function(temp) {
    mysql = temp;
    if (mysql) {
      console.log('done');
      hero = connections.model(mysql, 'heroes', {
        name: {
          type: sequelize.STRING
        }
      });
      module.exports.hero = hero;
      hero.sync({
        force: false
      }).then(() => {
        synced = true;
        module.exports.isSynced = synced;
        console.log('mysql sync succesful');
      }).catch(err => {
        synced = false;
        module.exports.isSynced = synced;
        console.log('failed' + err);
      });
    }
  });
}
reinit();

module.exports.init = reinit;
module.exports.hero = hero;
module.exports.isSynced = synced;
