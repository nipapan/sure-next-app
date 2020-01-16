const { QueryBuilder } = require('objection');

class SoftDeleteQueryBuilder extends QueryBuilder {
   constructor(modelClass) {
      super(modelClass);
      this.onBuild(builder => {
         if (!builder.context().withArchived) {
            builder.whereNull('deleted_at');
         }
      });
   }

   withArchived(withArchived = true) {
      this.context().withArchived = withArchived;
      return this;
   }

   softDelete() {
      return this.patch({ deleted_at: new Date().toISOString() });
   }
}

module.exports = SoftDeleteQueryBuilder;