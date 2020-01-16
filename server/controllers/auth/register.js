const User = require('../../models/User');
const error = require('../../helpers/error');
const { check, validationResult } = require('express-validator');
const { signToken } = require('./utils');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const isUnique = async (email) => {
   try {
      const user = await User.query().findOne({email: email}).withArchived();
      if (user instanceof User) {
         return Promise.reject('email is in used');
      }
   }
   catch (err) {
      return Promise.reject(err);
   }
}

const validate = () => {
   return [
      check('email', 'invalid email format').isEmail(),
      check('email', 'email is required').exists({ checkNull: true, checkFalsy: true } ),
      check('email').custom( email => isUnique(email)),
      check('password', 'password is required').exists({ checkNull: true, checkFalsy: true } ),
      check('firstName', 'first name is required').exists({ checkNull: true, checkFalsy: true } ),
      check('lastName', 'last name is required').exists({ checkNull: true, checkFalsy: true } ),
   ]
}

const handleRegister = async (req, res) => {
   const { email, password, firstName, lastName } = req.body;

   const results = validationResult(req);
   if( !results.isEmpty() ) {
      return res.status(400).json({ success: false, data: error.format(error.TYPES.VALIDATION, results.array()) })
   }

   const salt = bcrypt.genSaltSync(saltRounds);
   const hash = bcrypt.hashSync(password, salt);

   try {
      const user = await User.transaction(async trx => {
         const newUser = await User.query(trx)
            .insert({
               email: email,
               hash: hash
            });

         const userAttr = await newUser.$relatedQuery('attribute', trx)
            .insertAndFetch({
               firstName: firstName,
               lastName: lastName
            });
         return newUser;
      });

      const token = signToken(user);
      return res.status(200)
         .cookie('jwt', token, {httpOnly: true})
         .json({ success: true, data: { id: user.id } });
   } catch (err) {
      console.log(err);
      return res.status(500).json({ success: false, data: error.format(error.TYPES.USER_CREATE, err) });
   }

}

module.exports = {
   handleRegister: handleRegister,
   validate: validate
}