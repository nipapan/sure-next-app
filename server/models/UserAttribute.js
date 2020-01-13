const { Model } = require('objection');

class UserAttribute extends Model {
   static get tableName() {
      return 'user_attributes';
   }

   static get relationMappings() {
      const User = require('./User');

      return {
         login: {
            relation: Model.BelongsToOneRelation,
            modelClass: User,
            join: {
               from: 'user_attributes.userId',
               to: 'users.id'
            }
         }
      };
   }
}

module.exports = UserAttribute;