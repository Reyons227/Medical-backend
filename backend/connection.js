const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");


const db = mysql.createConnection({
    host: '191.101.3.95',
    user: 'root',
    password: 'test@123',
    database: 'kinesis'
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    else {
      console.log('MySql connected');
    }
  })

module.exports = db;
