const mysql = require('./mysql');
const mssql = require('./mssql');

var getDb = function() {
  return new Promise(function(resolve, reject) {
    // return;
    if (mysql.hero) {
      // console.log('here');
      if (!mssql.hero) {
        mssql.init();
      }
      mysql.hero.sync({
        force: false
      }).then(() => {
        // console.log('using mysql');
        resolve(mysql.hero);
      }).catch(err => {
        // console.log('error here mysql ' + err);
        mssql.hero.sync({
          force: false
        }).then(() => {
          // console.log('using mssql ');
          resolve(mssql.hero);
        }).catch(err => {
          // console.log('all databases down');
          resolve();
        });
      });
    } else if (mssql.hero) {
      mysql.init();
      mssql.hero.sync({
        force: false
      }).then(() => {
        // console.log('using mssql ');
        resolve(mssql.hero);
      }).catch(err => {
        // console.log('all databases down');
        resolve();
      });
    } else {
      mysql.init();
      mssql.init();
      resolve();
    }
  });
};

// get all heroes
module.exports.getHeroes = function() {
  return new Promise(function(resolve, reject) {
    getDb().then(db => {
      if (db) {
        console.log('here if');
        db.findAll({
          attributes: ['id', 'name']
        }).then(heroes => {
          console.log(heroes);
          resolve(heroes);
        });
      } else {
        console.log('here else');
        resolve([]);
      }
    });
  });
};

// get one hero
module.exports.getHero = function(id) {
  return new Promise(function(resolve, reject) {
    getDb().then(db => {
      if (db) {
        console.log('here if');
        db.findOne({
          attributes: ['id', 'name'],
          where: {
            id: id
          }
        }).then(heroes => {
          console.log(heroes);
          resolve(heroes);
        });
      } else {
        console.log('here else');
        resolve({});
      }
    });
  });
}

// add a hero
module.exports.addHero = function(name) {
  return new Promise(function(resolve, reject) {
    getDb().then(db => {
      if (db) {
        console.log('here if');
        db.create({
          name: name
        }).then(heroes => {
          console.log(heroes);
          resolve(heroes);
        });
      } else {
        console.log('here else');
        resolve({});
      }
    });
  });
}

// update a hero
module.exports.updateHero = function(name, id) {
  return new Promise(function(resolve, reject) {
    getDb().then(db => {
      if (db) {
        console.log('here if');
        db.update({
          name: name
        }, {
          where: {
            id: id
          }
        }).then(() => {
          resolve({});
        });
      } else {
        console.log('here else');
        resolve({});
      }
    });
  });
}

// delete a hero
module.exports.deleteHero = function(id) {
  return new Promise(function(resolve, reject) {
    getDb().then(db => {
      if (db) {
        console.log('here if');
        db.destroy({
          where: {
            id: id
          }
        }).then(() => {
          resolve({});
        });
      } else {
        console.log('here else');
        resolve({});
      }
    });
  });
}
