var express = require('express');
var router = express.Router();
const mssql = require('mssql');
const bodyParser = require('body-parser');

const data = require('./../dbconnect/data');

router.use(bodyParser.json()); // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}));

/* GET all heroes. */
router.get('/heroes', function(req, res, next) {
  console.log('heroes route');
  data.getHeroes().then(heroes => {
    res.send(heroes);
    res.end();
  });
});

// GET one hero
router.get('/heroes/:id', function(req, res, next) {
  console.log('heroes route');
  data.getHero(req.params.id).then(heroes => {
    res.send(heroes);
    res.end();
  });
});

// PUT new hero
router.put('/heroes', function(req, res, next) {
  var name = req.body.name;
  console.log('new hero ' + name);
  if (name) {
    data.addHero(name).then(heroes => {
      res.send(heroes);
      res.end();
    });
  } else {
    res.status(404).end("No Name");
  }
});

// POST update hero
router.post('/heroes/:id', function(req, res, next) {
  var name = req.body.name;
  var id = req.params.id;
  console.log('update hero ' + name + id);
  if (name) {
    data.updateHero(name, id).then(() => {
      res.end();
    });
  } else {
    res.status(404).end("No Name");
  }
});

// DELETE a hero
router.delete('/heroes/:id', function(req, res, next) {
  var id = req.params.id;
  console.log('delete hero ' + id);
  data.deleteHero(id).then(() => {
    res.end();
  });
});

module.exports = router;
