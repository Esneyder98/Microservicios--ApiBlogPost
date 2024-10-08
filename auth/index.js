const jwt = require('jsonwebtoken');
const config = require('../config');
const secret = config.jwt.secret;

function sign(data) {
  return jwt.sign(data, secret);
}

const check = {
  own: function(req, owner){
    const decoded = decodeHeader(req);
    console.log("🚀 ~ decoded:", decoded)

    if(decoded.id !== owner){
      throw new Error("No puedes hacer esto");
      
    }
    console.log(decoded);
  }
}
function verify(token) {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    throw new Error(error.message)
  }
}

function getToken(auth) {
  
  if (!auth) {
    throw new Error('No viene token');
  }

  if (auth.indexOf('Bearer ') === -1) {
    throw new Error('Formato invalido');
  }

  // Eliminar correctamente 'Bearer ' y los espacios adicionales
  let token = auth.replace('Bearer ', '').trim();

  return token;
}

function decodeHeader(req) {
  
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded

  return decoded;
}
module.exports = {
    sign,
    check,
};