exports.up = function(knex) {
   return knex.schema.createTable('users', function (table) {
      table.increments('id').notNullable();
      table.string('email').notNullable();
      table.string('hash').notNullable();
      table.timestamps(true, true);
      table.timestamp('deleted_at').defaultTo(null);
   })
};

exports.down = function(knex) {
   return knex.schema.dropTable('users');
};