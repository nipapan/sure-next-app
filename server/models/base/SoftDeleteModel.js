const { Model } = require('objection');
const SoftDeleteQueryBuilder = require('./SoftDeleteQueryBuilder');

class SoftDeleteModel extends Model {
   static get QueryBuilder(){
      return SoftDeleteQueryBuilder;
   }
}

module.exports = SoftDeleteModel;