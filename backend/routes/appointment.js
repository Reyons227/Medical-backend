const express = require('express');
const router = express.Router();
const db = require("../connection");
const checkAuth = require("../middleware/auth");

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

router.get('',checkAuth, (req, res) => {

    let sql = `select * from appointment `;
    let query = db.query(sql, (err, results) => {
        if (err) throw err;
     
        res.send(results);
    });
});

router.post('', (req, res) => {

  

    let sql = `INSERT INTO appointment (username, email, phoneno, contactfor,remarks,cread,addedon) VALUES ('${req.body.username}', '${req.body.email}', '${req.body.phoneno}', 'appointment','${req.body.remarks}',0,now())`;;
    let query = db.query(sql, function (err, rows) {
        if (err) {
            res.status(200).send({ 
                results:false,
                messge: 'insert unsuccessfull' });
        } else {
            res.status(200).send({ 
                results:true,
                messge: 'insert successfull' });
        }
    });
});

module.exports = router;