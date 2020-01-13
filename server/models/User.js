const { Model } = require('objection');

class User extends Model {
   static get tableName() {
      return 'users';
   }

   static modifiers = {
      hideHashSelect(query) {
        query.select('id', 'email');
      },
   };

   static get relationMappings() {
      const UserAttribute = require('./UserAttribute');

      return {
         attribute: {
            relation: Model.HasOneRelation,
            modelClass: UserAttribute,
            join: {
               from: 'users.id',
               to: 'user_attributes.userId'
            }
         }
      };
   }
}

module.exports = User;