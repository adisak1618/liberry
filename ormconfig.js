const parse = require('pg-connection-string').parse;
const connectionOptions = parse(process.env.DATABASE_URL);

console.log('__dirname', __dirname);
module.exports = [
   {
      "name": "default",
      "type": "postgres",
      "host": "localhost",
      "port": 5432,
      "username": "postgres",
      "password": "postgres",
      "database": "liberry",
      "synchronize": true,
      "logging": true,
      "entities": [
         __dirname + "/src/entity/**/*.ts"
      ],
      "migrations": [
         "src/migration/**/*.ts"
      ],
      "subscribers": [
         "src/subscriber/**/*.ts"
      ],
      "cli": {
         "entitiesDir": "src/entity",
         "migrationsDir": "src/migration",
         "subscribersDir": "src/subscriber"
      }
   },
   {
      "name": "production",
      "type": "postgres",
      "host": connectionOptions.host,
      "port": connectionOptions.port || 5432,
      "username": connectionOptions.user,
      "password": connectionOptions.password,
      "database": connectionOptions.database,
      "synchronize": true,
      "logging": true,
      "entities": [
         __dirname + "build/src/entity/**/*.js"
      ],
      "migrations": [
         "src/migration/**/*.js"
      ],
      "subscribers": [
         "src/subscriber/**/*.js"
      ],
      "cli": {
         "entitiesDir": "src/entity",
         "migrationsDir": "src/migration",
         "subscribersDir": "src/subscriber"
      }
   }
]