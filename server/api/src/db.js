import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

// Настройки берутся из твоего .env файла
const pool = new Pool({
    user: 'postgres', // стандартный юзер
    host: 'localhost', // база на твоем компе
    database: 'postgres', // имя базы по умолчанию
    password: process.env.DB_PASSWORD, // пароль из .env
    port: 5432,
});

export default pool;
