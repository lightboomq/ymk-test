import { Router } from 'express';
import { check_user_token } from '../midleware/check_user_token.js';
import pool from '../db.js';

export const users = Router();

users.get('/', async (req, res) => {
    //Получить всех пользователей
    console.log(true);
    try {
        const users = await pool.query('SELECT * FROM users');
        console.log(users);
        res.status(200).json(users.rows);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

users.post('/', check_user_token, async (req, res) => {
    //Создать пользователя
    try {
        const { personal_number, first_name, last_name, job_title, password } = req.body;

        const new_user = await pool.query(
            `INSERT INTO users (personal_number, first_name, last_name, job_title, password) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [personal_number, first_name, last_name, job_title, password],
        );
        res.status(201).json(new_user.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});
