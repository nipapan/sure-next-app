const SoftDeleteModel = require('./base/SoftDeleteModel');

class UserAttribute extends SoftDeleteModel {
   static get tableName() {
      return 'user_attributes';
   }

   static get relationMappings() {
      const User = require('./User');

      return {
         login: {
            relation: SoftDeleteModel.BelongsToOneRelation,
            modelClass: User,
            join: {
               from: 'user_attributes.userId',
               to: 'users.id'
            },
         }
      };
   }
}

module.exports = UserAttribute;