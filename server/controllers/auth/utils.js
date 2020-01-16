const jwt = require('jsonwebtoken');

const signToken = (user) => {
   const payload = {
      id: user.id,
      email: user.email
   };
   return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 604800});
}

module.exports = {
   signToken: signToken
}