import pool from './db.js'; //канал связи с бд

export const init_db = async () => {
    try {
        await pool.query(`
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            personal_number INTEGER UNIQUE NOT NULL,
            first_name VARCHAR(40) NOT NULL,
            last_name VARCHAR(40) NOT NULL,
            job_title VARCHAR(40) NOT NULL,
            password VARCHAR(255) NOT NULL,
            role VARCHAR(15) NOT NULL DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_fired BOOLEAN DEFAULT FALSE
        );
    `);
        console.log('✅ Таблицы проверены/созданы успешно');
    } catch (err) {
        console.error('❌ Ошибка инициализации БД:', err);
    }
};
