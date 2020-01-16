const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const JwtStrategy = passportJwt.Strategy;

const User = require('../models/User');

const jwtCookieExtractor = (req) => {
   let token = null;
   if (req && req.cookies) {
      token = req.cookies['jwt'];
   }
   return token;
}

const jwtOptions = {};
jwtOptions.jwtFromRequest = jwtCookieExtractor;
jwtOptions.secretOrKey = process.env.JWT_SECRET;

const JwtAuth = new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
   try {
      const user = await User.query().findOne({id: jwt_payload.id});
      if (user instanceof User) {
         return done(null, user);
      } else {
         return done(null, false);
      }
   }
   catch (err) {
      done(err, false);
   }
});

module.exports = JwtAuth;