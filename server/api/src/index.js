import express from 'express';
import cors from 'cors';
import { init_db } from './init_db.sql.js';
import { users } from './routes/users.js';
import cookie_parser from 'cookie-parser';
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookie_parser());
const PORT = process.env.PORT || 5000;

const start = async () => {
    await init_db();
    app.listen(PORT, () => {
        console.log(`Сервер запущен на порту ${PORT}`);
    });
};

start();
app.use('/api/users', users);
