import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from '../styles/05_auth.module.css';

export const Auth = () => {
    const [form_data, set_form_data] = React.useState({
        login: '',
        password: '',
    });
    const redirect = useNavigate();

    const [is_password_visible, set_is_password_visible] = React.useState(false);

    const handle_submit = (e) => {
        e.preventDefault();
        redirect('/users');
    };

    const toggle_password_visibility = () => {
        set_is_password_visible(!is_password_visible);
    };

    return (
        <div className={s.container}>
            <form className={s.form} onSubmit={handle_submit}>
                <h2 className={s.title}>Вход в систему</h2>

                <div className={s.input_group}>
                    <label>Личный номер</label>
                    <input
                        type='text'
                        placeholder='Введите номер'
                        value={form_data.login}
                        onChange={(e) =>
                            set_form_data({
                                ...form_data,
                                login: e.target.value,
                            })
                        }
                        required
                    />
                </div>

                <div className={s.input_group}>
                    <label>Пароль</label>
                    <div className={s.password_wrapper}>
                        <input
                            type={is_password_visible ? 'text' : 'password'}
                            placeholder='••••••••'
                            value={form_data.password}
                            onChange={(e) =>
                                set_form_data({
                                    ...form_data,
                                    password: e.target.value,
                                })
                            }
                            required
                        />
                        <button type='button' className={s.toggle_button} onClick={toggle_password_visibility}>
                            {is_password_visible ? 'Скрыть' : 'Показать'}
                        </button>
                    </div>
                </div>

                <button type='submit' className={s.button}>
                    Войти
                </button>
            </form>
        </div>
    );
};
