import React from 'react';
import { Link } from 'react-router-dom';
import s from '../styles/09_users.module.css';

export const Users = () => {
    return (
        <div className={s.container}>
            <div className={s.user_nav}>
                <input className={s.search_user} type='search' placeholder='Поиск...' />
                <h2>
                    Сотрудники <span className={s.count_badge}>3</span>
                </h2>
            </div>

            <ul className={s.list}>
                <li className={s.user} style={{ backgroundColor: '#fef2f2', borderColor: ' #fca5a5', border: '1px solid #ef4444' }}>
                    <span className={s.name}>Иван Иванов</span>
                    {/* <span className={s.job_title}>Резчик х/м</span> */}
                    <span className={s.deadline_siz} style={{ backgroundColor: '#ef4444', boxShadow: '0 0 8px rgba(239, 68, 68, 0.4)' }}>
                        0
                    </span>
                </li>
                <li className={s.user} style={{ backgroundColor: '#fffbeb', borderColor: ' #fca5a5', border: '1px solid #fcd34d' }}>
                    <span className={s.name}>Тест Тест</span>
                    {/* <span className={s.job_title}>Резчик х/м</span> */}
                    <span className={s.deadline_siz} style={{ backgroundColor: '#f59e0b', color: '#ffffff', boxShadow: '0 0 8px rgba(245, 158, 11, 0.4)' }}>
                        10
                    </span>
                </li>
                <li className={s.user}>
                    <span className={s.name}>Тест Т</span>
                    {/* <span className={s.job_title}>Вальцовщик</span> */}
                    <span className={s.deadline_siz}>365</span>
                </li>
            </ul>
        </div>
    );
};
