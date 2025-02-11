import type { Knex } from 'knex';
import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
    development: {
        client: process.env.DB_CLIENT,
        connection: {
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: +(process.env.DB_PORT ?? '5432'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            ssl: process.env.DB_SSL === 'true',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: process.env.DB_CLIENT,
        connection: {
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            port: +(process.env.DB_PORT ?? '5432'),
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            ssl: process.env.DB_SSL === 'true',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

export default config;
