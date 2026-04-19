шапка 13

текст 14

дни 12

import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from '../styles/09_users.module.css';

export const Users = () => {
const navigate = useNavigate();

    const users = [
        { id: 156937, personal_number: 325, name: 'Иван Иванов', pos: 'Резчик х/м', days: 0 },
        { id: 156936, personal_number: 125, name: 'Ваня Петров', pos: 'Вальцовщик', days: 10 },
        { id: 156935, personal_number: 425, name: 'Вася Пупкин', pos: 'Резчик х/м', days: 365 },
    ];

    return (
        <div className={s.container}>
            <div className={s.header}>ФИО</div>
            <div className={s.header}>Л/Н</div>
            <div className={s.header}>Должность</div>
            <div className={s.header}>Статус СИЗ</div>
            {users.map((item) => (
                <React.Fragment key={item.id}>
                    <div className={s.item}>{item.name}</div>
                    <div className={s.item}>{item.personal_number}</div>
                    <div className={s.item}>{item.pos}</div>
                    <div className={s.item}>{item.days}</div>
                </React.Fragment>
            ))}
        </div>
    );

};
.container {
display: grid;
grid-template-columns: 1fr 1fr 1fr 1fr;
text-align: center;
border: 1px solid #cbd5e1;
border-radius: 7px;
}
.header {
background-color: #f8fafc;
font-size: 13px;
font-weight: 600;
}

шаппка
#64748b
700

текст
400
