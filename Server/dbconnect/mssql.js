const sequelize = require('sequelize');

const details = require('./dbdetails').mssql;
const connections = require('./sequelizeinit');

var mssql;
var hero;
var synced = false;

function reinit() {
  connections.conn(details.database, details.username, details.password, details.host, details.type, details.pool, details.port, function(temp) {
    mssql = temp;
    console.log('here');
    if (mssql) {
      hero = connections.model(mssql, 'heroes', {
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
        console.log('lolololol' + module.exports.isSynced.toString());
        console.log('mssql sync succesful');
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
