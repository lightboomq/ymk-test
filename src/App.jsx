import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { Layout } from './componets/00_Layout';
import { Auth } from './componets/05_Auth';
import { Users } from './componets/09_Users';
import { User_create } from './componets/10_User_create';
import { Siz_catalog } from './componets/11_Siz_catalog';
import { Siz_create } from './componets/12_Siz_create';
import { User_archive } from './componets/13_User_archive';
import { User_card } from './componets/14_User_card';

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='auth' element={<Auth />} />
                <Route element={<Layout />}>
                    <Route index element={<Users />} />
                    <Route path='users' element={<Users />} />
                    <Route path='users/:id' element={<User_card />} />
                    <Route path='user_create' element={<User_create />} />
                    <Route path='siz_catalog' element={<Siz_catalog />} />
                    <Route path='siz_create' element={<Siz_create />} />
                    <Route path='user_archive' element={<User_archive />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
