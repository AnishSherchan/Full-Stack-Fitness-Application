const jwt = require("jsonwebtoken");
// ? dotenv file for secret key
require("dotenv").config();

// ? defining funtion which takes in user id for crearting jwt token
const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id,
  };
  //   ?Token
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
};

module.exports = jwtGenerator;
