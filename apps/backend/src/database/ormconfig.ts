import { join } from "path";
import * as dotenv from 'dotenv';
import { envFiles } from "../../dist/config";
import { DataSource } from "typeorm";

//TODO: Use prod database to generate migrations
//TODO: Create a read-only user in prod database 
envFiles('database.env').forEach((envFile) => dotenv.config({ path: envFile }));

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, './migrations/*{.ts,.js}')],
    logging: true,
    synchronize: false,
    migrationsRun: false,
    migrationsTableName: 'migrations_history',
});
