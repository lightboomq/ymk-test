import React from 'react';
import Users from '../store/01_Users.js';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite'
import s from '../styles/09_users_list.module.css';

export const Users_list = observer(() => {

    const users = Users.all();

    React.useEffect(() => {
        // const fetchUsers = async () => {
        //     try {
        //         const res = await fetch('http://localhost:5000');

        //         if (!res) {
        //             throw new Error('Ошибка сети');
        //         }

        //         const data = await res.json();
        //         set_users(data);
        //     } catch (error) {
        //         console.error('Не удалось загрузить пользователей:', error);
        //     }
        // };

        // fetchUsers();
    }, []);

    const [search, set_search] = React.useState('');
    const redirect = useNavigate();


    const filter = users
        .filter((user) => {
            const query = search.toLowerCase();
            return user.first_name.toLowerCase().trim().startsWith(query) || user.last_name.toLowerCase().trim().startsWith(query) || String(user.personal_number).startsWith(query);
        });

    const highlight_status = (status) => {
        if (status === 0) return `${s.status} ${s.danger}`;
        if (status <= 10) return `${s.status} ${s.warning}`;
        return `${s.status} ${s.succsess}`;
    };

    return (
        <>
            <div className={s.container_header}>
                <h3>Сотрудники</h3>
                <input className={s.search} value={search} onChange={(e) => set_search(e.target.value)} type='text' placeholder='ФИО или Л/Н ...' />
            </div>

            <div className={s.grid}>
                <div className={s.grid_header}>ФИО</div>
                <div className={s.grid_header}>Л/Н</div>
                <div className={s.grid_header}>Должность</div>
                <div className={s.grid_header}>Статус СИЗ</div>
                {filter.map((item) => (
                    <div className={s.row} key={item.id} onClick={() => redirect(`/users/${item.id}`)}>
                        <div className={`${s.item} ${s.name}`}>{`${item.first_name} ${item.last_name}`}</div>
                        <div className={s.item}>{item.personal_number}</div>
                        <div className={s.item}>{item.job_title}</div>
                        <div className={s.item}>
                            <span className={highlight_status(item.status_siz)}>{item.status_siz} дн.</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
});
