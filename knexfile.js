import dotenv from 'dotenv';
dotenv.config(); // Load environment variables from .env file

export default {
    development : {
        client: 'mysql2',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT, // Optional, defaults to 3306
          timezone: '+05:30',
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: './db/migrations', // Change this to your migrations folder path
        }
    },
    staging : {
        client: 'mysql2',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT, // Optional, defaults to 3306
          timezone: '+05:30',
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: './migrations', // Change this to your migrations folder path
        }
    },
    production : {
        client: 'mysql2',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT, // Optional, defaults to 3306
          timezone: '+05:30',
        },
        migrations: {
          tableName: 'knex_migrations',
          directory: './migrations', // Change this to your migrations folder path
        }
    },
}