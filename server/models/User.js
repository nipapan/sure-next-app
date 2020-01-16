const SoftDeleteModel = require('./base/SoftDeleteModel');

class User extends SoftDeleteModel {
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
            relation: SoftDeleteModel.HasOneRelation,
            modelClass: UserAttribute,
            join: {
               from: 'users.id',
               to: 'user_attributes.userId'
            },
         }
      };
   }
}

module.exports = User;