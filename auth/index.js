require('dotenv').config();
const jwt = require('jsonwebtoken');

function sign(data) {
  console.log(process.env.JWT_SECRET);
  
  return jwt.sign(data, process.env.JWT_SECRET);
}

module.exports = {
    sign
};