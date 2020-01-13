exports.up = function(knex) {
   return knex.schema.createTable('user_attributes', function (table) {
      table.increments('id').notNullable();
      table.integer('userId').unsigned().notNullable();
      !table.string('firstName').notNullable();
      table.string('lastName').notNullable();
      table.timestamps(true, true);
      table.timestamp('deleted_at').defaultTo(null);

      table.foreign('userId').references('id').inTable('users');
   })
};

exports.down = function(knex) {
   return knex.schema.dropTable('user_attributes');
};