const user = require('../../models/user');
const error = require('../../helpers/error');
const { check, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

const isUnique = (email) => {
   return user.getByEmail(email)
      .then(data => {
         if (data) {
            return Promise.reject('email is in used');
         }
      })
      .catch( err => { return Promise.reject(err) } );
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

const handleRegister = (req, res) => {
   const { email, password, firstName, lastName } = req.body;

   const results = validationResult(req);
   if( !results.isEmpty() ) {
      return res.status(400).json({ success: false, data: error.format(error.TYPES.VALIDATION, results.array()) })
   }

   const salt = bcrypt.genSaltSync(saltRounds);
   const hash = bcrypt.hashSync(password, salt);

   user.create(email, hash, firstName, lastName)
      .then(data => res.status(200).json({ success: true, data: { user: data } }))
      .catch(err => res.status(500).json({ success: false, data: error.format(error.TYPES.USER_CREATE, err) }))
}

module.exports = {
   handleRegister: handleRegister,
   validate: validate
}