const express = require('express');
const checkAuth = require("../middleware/auth");
const router = express.Router();
const db = require("../connection")

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'test@123',
//     database: 'kinesis'
//   });

router.use((req, res, next) => {
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
  let sql = `select * from mainpage where id=` + req.params.id;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
router.get('/', (req, res) => {
  let sql = `select * from mainpage` ;
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
   
    res.send(results);
  });
});

router.post('', checkAuth, (req, res) => {
  let sql = 'UPDATE mainpage SET ? WHERE id=1';
  let query = db.query(sql, [req.body, req.body.bactive = true], function (err, rows) {
    if (err) {
      res.send({
        result: false,
        message: 'Unsuccessful'
      })
      // do some stuff here
    } else {
      res.status(200).send({
        result: true,
        message: 'update successfull'
      });
      // do some stuff here
    }
  });
});

module.exports = router;