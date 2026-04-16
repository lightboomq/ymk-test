import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from '../styles/09_users.module.css';

export const Users = () => {
    const navigate = useNavigate();

    const users = [
        { id: 156937, name: 'Иван Иванов', pos: 'Резчик х/м', days: 0, level: 'danger' },
        { id: 156936, name: 'Ваня Петров', pos: 'Вальцовщик', days: 10, level: 'warning' },
        { id: 156935, name: 'Вася Пупкин', pos: 'Резчик х/м', days: 365, level: 'good' },
    ];

    return (
        <div className={s.container}>
            <div className={s.user_nav}>
                <h2 className={s.title}>Сотрудники</h2>
            </div>

            <div className={s.table_container}>
                <table className={s.table}>
                    <thead>
                        <tr>
                            <th>Л/Н</th>
                            <th>ФИО</th>
                            <th>Должность</th>
                            <th>Статус СИЗ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className={s.row} onClick={() => navigate(`/users/${user.id}`)}>
                                <td>{user.id}</td>
                                <td className={s.bold}>{user.name}</td>
                                <td>{user.pos}</td>
                                <td>
                                    <span className={`${s.badge} ${s[user.level]}`}>{user.days} дн.</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
