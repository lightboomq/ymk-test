import { NavLink } from 'react-router-dom';
import s from '../styles/08_sidebar.module.css';

export const Sidebar = ({ closeMenu }) => {
    // Эта функция решает, какой класс применить
    const getLinkClass = ({ isActive }) => (isActive ? `${s.menu_link} ${s.active_link}` : s.menu_link);

    return (
        <nav className={s.sidebar}>
            <ul className={s.menu}>
                <li onClick={closeMenu}>
                    <NavLink to='/' end className={getLinkClass}>
                        Сотрудники
                    </NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to='/user_create' className={getLinkClass}>
                        Регистрация сотрудников
                    </NavLink>
                </li>
                <li onClick={closeMenu}>
                    <NavLink to='/siz_catalog' className={getLinkClass}>
                        Каталог СИЗ
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
            </ul>
        </nav>
    );
};
