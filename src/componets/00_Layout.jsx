// import Success_notification from './02_Success_notification';
// import Success_message from '../store/Success_message';
// import Error_notification from './01_Error_notification';
// import Error_message from '../store/Error_message';
// import { observer } from 'mobx-react-lite';
// import { Outlet } from 'react-router-dom';
// import { Header } from './07_Header';
// import { Sidebar } from './08_Sidebar';
// import s from '../styles/00_layout.module.css';

// export const Layout = observer(() => {
//     return (
//         <div className={s.wrapper}>
//             <Header />
//             <Sidebar />
//             <div className={s.content}>
//                 <Outlet />
//             </div>

//             {Success_message.get_is_show() && <Success_notification />}
//             {Error_message.get_message() && <Error_notification />}
//         </div>
//     );
// });

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

import Success_notification from './02_Success_notification';
import Success_message from '../store/Success_message';
import Error_notification from './01_Error_notification';
import Error_message from '../store/Error_message';

import { Header } from './07_Header';
import { Sidebar } from './08_Sidebar';
import s from '../styles/00_layout.module.css';

export const Layout = observer(() => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const closeMenu = () => setMenuOpen(false);

    return (
        <div className={s.wrapper}>
            <Header />

            <button className={s.burger_btn} onClick={toggleMenu}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className={`${s.sidebar_container} ${menuOpen ? s.open : ''}`}>
                <Sidebar closeMenu={closeMenu} />
            </div>

            <div className={s.content}>
                <Outlet />
            </div>

            {menuOpen && <div className={s.overlay} onClick={closeMenu} />}

            {Success_message.get_is_show() && <Success_notification />}
            {Error_message.get_message() && <Error_notification />}
        </div>
    );
});
