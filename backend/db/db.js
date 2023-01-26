import mysql2 from 'mysql2';
import {config} from 'dotenv';

config();

const pool = mysql2.createPool({
    host: process.env.HOST,
    user: process.env.USERDB,
    password: process.env.PASSWORD,
    port: process.env.MYSQLPORT,
    database: process.env.DATABASE
});

export default pool;