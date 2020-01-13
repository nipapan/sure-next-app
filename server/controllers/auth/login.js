const User = require('../../models/User');
const error = require('../../helpers/error');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

const validate = () => {
   return [
      check('email', 'invalid email format').isEmail(),
      check('email', 'email is required').exists({ checkNull: true, checkFalsy: true }),
      check('password', 'password is required').exists({ checkNull: true, checkFalsy: true })
   ]
}

const handleLogin = async (req, res) => {
   const { email, password } = req.body;

   const results = validationResult(req);
   if( !results.isEmpty() ) {
      return res.status(400).json({ success: false, data: error.format(error.TYPES.VALIDATION, results.array()) })
   }

   try {
      const user = await User.query().findOne({email: email});
      if (user instanceof User) {
         const isValid = bcrypt.compareSync(password, user.hash);
         if(isValid) {
            return res.status(200).json({success: true, data: {user: user}});
         }
      }
      return res.status(404).json({success: false, data: error.format(error.TYPES.LOGIN_WRONG_CREDENTIAL, 'wrong email or password')});
   }
   catch (err) {
      return res.status(500).json({success: false, data: error.format(error.TYPES.USER_DB_ERR, err)});
   }
}

module.exports = {
   handleLogin: handleLogin,
   validate: validate
}