const express = require('express');
const bodyParser = require("body-parser");

const mainpageRoutes = require("./backend/routes/mainpage");
const userRoutes = require("./backend/routes/user");
const appointmentRoutes = require("./backend/routes/appointment");
const postRoutes = require("./backend/routes/post");
const mysql = require('mysql');




 const app = express();
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/login',userRoutes);
app.use('/api/mainpage',mainpageRoutes);
app.use('/api/appointment',appointmentRoutes);
app.use('/api/posts',postRoutes);
app.listen(process.env.PORT || 3000);



