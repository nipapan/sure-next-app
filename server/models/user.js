const knex = require('../config/database');

const create = (email, hash, firstName, lastName) => {
   return knex.transaction(trx => {
      trx.insert({
         email: email,
         hash: hash
      })
         .into('users')
         .returning(['id', 'email'])
         .then(users => {
            return trx.insert({
               userId: Number(users[0].id),
               firstName: firstName,
               lastName: lastName
            })
               .into('user_attributes')
               .returning('*')
               .then(userAttributes => {
                  userAttributes[0]["email"] = users[0].email;
                  return userAttributes[0];
               })
         })
         .then(trx.commit)
         .catch(trx.rollback)
   })
      .then( data => data )
      .catch( err => { return Promise.reject('Error: user::create() - transaction failed'); });
}

const getByEmail = (email) => {
   return knex('users')
      .where({email: email})
      .first()
      .then(user => {
         if (user) {
            return knex('user_attributes')
               .select('*')
               .where('userId', '=', user.id)
               .then(userAttributes => {
                  userAttributes[0]["email"] = user.email;
                  return userAttributes[0];
               })
               .catch(err => { return Promise.reject('Error: user::getByEmail() - user_attributes.select()') } )
         } else {
            return null;
         }
      })
      .catch( err => { return Promise.reject('Error: user::getByEmail() - users.first()') } );
}

module.exports = {
   create: create,
   getByEmail: getByEmail
}