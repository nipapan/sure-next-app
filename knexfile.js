module.exports = {
   development: {
      client: 'postgresql',
      connection: process.env.DB_CONNECTION_URI,
      debug: false,
      pool: {
         min: 2,
         max: 10
      },
      migrations: {
         tableName: 'knex_migrations',
         directory: './server/database/migrations'
      }
   },

   staging: {
      client: 'postgresql',
      connection: {
         database: 'my_db',
         user:     'username',
         password: 'password'
      },
      pool: {
         min: 2,
         max: 10
      },
      migrations: {
         tableName: 'knex_migrations',
         directory: './server/database/migrations'
      }
   },

   production: {
      client: 'postgresql',
      connection: {
         database: 'my_db',
         user:     'username',
         password: 'password'
      },
      pool: {
         min: 2,
         max: 10
      },
      migrations: {
         tableName: 'knex_migrations',
         directory: './server/database/migrations'
      }
   }
};