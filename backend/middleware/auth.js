const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    //console.log(token);
    const decodedToken = jwt.verify(token, "this_should_be_a_longer_message");
    //req.userData = { email: decodedToken.email, userId: decodedToken.userId };
    console.log(decodedToken);
    next();
  } catch (error) {
    res.status(401).json({ message: "You are not authenticated!" });
  }
};
