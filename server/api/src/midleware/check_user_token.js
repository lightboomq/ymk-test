import jwt from 'jsonwebtoken';
import pool from '../db.js';

export const check_user_token = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Авторизация обязательна (токен отсутствует)' });
    }

    try {
        // Декодируем токен. Убедись, что переменная в .env совпадает (например, JWT_SECRET)
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');

        // Ищем юзера в БД, чтобы убедиться, что он всё ещё существует
        const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [decoded.user_id]);

        if (userRes.rows.length === 0) {
            return res.status(404).json({ message: 'Пользователь из токена не найден в базе' });
        }

        // Ключевой момент: записываем данные юзера в объект запроса (req)
        // Теперь во всех следующих функциях будет доступ к req.user.id и req.user.role
        req.user = userRes.rows[0];

        next(); // Пропускаем запрос дальше к роуту
    } catch (err) {
        console.error('Ошибка верификации токена:', err.message);
        return res.status(401).json({ message: 'Невалидный или просроченный токен' });
    }
};
