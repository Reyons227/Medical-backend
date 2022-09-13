const express = require('express');
const router = express.Router();
const db = require("../connection");
const checkAuth = require("../middleware/auth");

router.use((req, res, next) => {
  console.log('hits');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

router.get('/:id', checkAuth, (req, res) => {
  let sql = '';
  sql = `select * from posts where  addedby=${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
router.get('/postview/:id', (req, res) => {
  let sql = '';
  sql = `select * from posts where  id=${req.params.id}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
router.get('/one/:id/:pid', checkAuth, (req, res) => {
  let sql = '';
  sql = `select * from posts where addedby=${req.params.id} and id=${req.params.pid}`;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
  
    res.send(results);
  });
});

router.get('', (req, res) => {
  let sql = '';
  sql = `select * from posts where active=1`;

  let query = db.query(sql, (err, results) => {
    if (err) throw err;
   
    res.send(results);
  });
});

router.post('/', checkAuth, (req, res) => {
  let active=0;
  if(req.body.active == true ){
    active=1;
  }
  else{
    active=0;
  }
  let sql = '';
  if (req.body.id) {
    sql = `Update posts set title='${req.body.title}',body='${req.body.body}',author='${req.body.author}',active=${active} where id=${req.body.id}`;
  }
  else {
    sql = `INSERT INTO posts (title, body, addedon, author,active,addedby) VALUES ('${req.body.title}', '${req.body.body}', now(), '${req.body.author}',${active},${req.body.addedby})`;
  }

  let query = db.query(sql, function (err, rows) {
    if (err) {
      res.status(200).send({
        error: err,
        result: false,
        message: 'insert unsuccessfull'
      });
    } else {
      res.status(200).send({
        result: true,
        message: 'insert successfull'
      });
    }
  });
});
router.delete('/:id', checkAuth, (req, res) => {
  if (req.params.id) {
    let sql = `Delete from posts where id=${req.params.id}`;
 
    let query = db.query(sql, function (err, rows) {
      if (err) {
        res.status(200).send({
          error: err,
          result: false,
          message: 'Deletion unsuccessfull'
        });
      } else {
        res.status(200).send({
          result: true,
          message: 'Deletion successfull'
        });
      }
    });
  }
  else {
    res.status(401).send({
      result: true,
      messge: 'Deletion unsuccessfull'
    });
  }

});
module.exports = router;