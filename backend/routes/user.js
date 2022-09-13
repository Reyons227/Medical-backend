const express = require('express');
const router = express.Router();
const db = require("../connection")
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
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
// router.post('/create', (req, res) => {

//     let crypthash = '';
//     bcrypt.hash(req.body.password, 10).then(hash => {
//        return hash;
//     }).then(hash =>{
//         let sql =   `insert into users(username,password,role,addedon) values('${req.body.name}','${hash}','${req.body.role}',NOW())`;
//         let query = db.query(sql, (err, results) => {
//             if (err) throw err;
//           
//             res.send(results);
//         });
//     });


// });

router.post('', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const comparepass = '';
    if (username && password) {

        db.query('SELECT id,password FROM users WHERE username = ?', [username],
            (error, results, fields) => {
             
                if (results.length > 0) {
                 
                    if (bcrypt.compareSync(password, results[0].password)) {
                        const token = jwt.sign(
                            { username: username, userId: results[0].id },
                            'this_should_be_a_longer_message',
                            { expiresIn: "1h" }
                        );
                        res.status(200).json({
                            token: token,
                            expiresIn: 3600,
                            userId: results[0].id
                        });
                    } else {
                        res.send({message:'Incorrect Email and/or Password!'});
                    }
                }
                else
                {
                    res.send({message:'Incorrect Email and/or Password!'});
                }

                res.end();
            });
    }
    else {
        res.send({message:'Please enter Username and Password!'});
        res.end();
    }
});

module.exports = router;