import Success_notification from './02_Success_notification';
import Success_message from '../store/Success_message';
import Error_notification from './01_Error_notification';
import Error_message from '../store/Error_message';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { Header } from './07_Header';
import { Sidebar } from './08_Sidebar';
import s from '../styles/00_layout.module.css';

export const Layout = observer(() => {
    return (
        <div className={s.wrapper}>
            <Header />
            <div className={s.main_container}>
                <Sidebar />
                <main className={s.content}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
});
