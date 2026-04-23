import Users from '../store/01_Users';
import Siz from '../store/02_Siz';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';
import s from '../styles/08_sidebar.module.css';

export const Sidebar = observer(({ closeMenu }) => {
    const getLinkClass = ({ isActive }) => (isActive ? `${s.menu_link} ${s.active_link}` : s.menu_link);

    return (
        <nav className={s.sidebar}>
            <ul className={s.menu}>
                <li onClick={closeMenu}>
                    <NavLink to='/' end className={getLinkClass}>
                        Сотрудники({Users.all().length})
                    </NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to='/user_create' className={getLinkClass}>
                        Регистрация сотрудников
                    </NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to='/siz_catalog' className={getLinkClass}>
                        Склад СИЗ({Siz.get_all_data().length})
                    </NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to='/siz_create' className={getLinkClass}>
                        Создать СИЗ
                    </NavLink>
                </li>

                <li onClick={closeMenu}>
                    <NavLink to='/user_archive' className={getLinkClass}>
                        Архив сотрудников
                    </NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to='/notification' className={getLinkClass}>
                        Уведомления
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
});
