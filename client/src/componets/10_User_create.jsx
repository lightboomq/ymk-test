import React from 'react';
import Users from '../store/01_Users';
import s from '../styles/10_user_create.module.css';

export const User_create = () => {
    const [form_data, set_form_data] = React.useState({
        id: Date.now(),
        personal_number: '',
        first_name: '',
        last_name: '',
        job_title: '',
        password: '',
        is_fired: false,
        start_date: '',
        end_date: '',
    });

    const [errors, set_errors] = React.useState({});

    const validate_field = (name, value) => {
        let error_msg = '';

        if (name === 'personal_number') {
            if (!/^\d*$/.test(value)) error_msg = 'Только цифры';
            else if (value.length > 5) error_msg = 'Максимум 5 символов';
        }

        if (name === 'first_name' || name === 'last_name') {
            if (!/^[а-яА-ЯёЁ\s-]*$/.test(value)) error_msg = 'Только русские буквы';
        }
        if (name === 'password') {
            if (/[а-яё]/i.test(value)) error_msg = 'Пароль не может содержать русские буквы';
        }

        return error_msg;
    };

    const handle_change = (e) => {
        const { name, value } = e.target;
        const error = validate_field(name, value);

        set_errors((prev) => ({ ...prev, [name]: error }));
        set_form_data((prev) => ({ ...prev, [name]: value }));
    };

    const handle_submit = (e) => {
        e.preventDefault();
        Users.add(form_data);
        console.log('данные_для_отправки:', form_data);
    };

    return (
        <div className={s.container}>
            <h2 className={s.title}>Регистрация сотрудника</h2>

            <form className={s.form} onSubmit={handle_submit} autoComplete='off'>
                <div className={s.field_group}>
                    <label className={s.label}>Личный номер </label>
                    <input
                        className={`${s.input} ${errors.personal_number ? s.input_error : ''}`}
                        type='text'
                        name='personal_number'
                        value={form_data.personal_number}
                        onChange={handle_change}
                        placeholder=''
                        required
                    />
                    {errors.personal_number && <span className={s.error_text}>{errors.personal_number}</span>}
                </div>

                <div className={s.field_group}>
                    <label className={s.label}>Имя</label>
                    <input
                        className={`${s.input} ${errors.first_name ? s.input_error : ''}`}
                        type='text'
                        name='first_name'
                        value={form_data.first_name}
                        onChange={handle_change}
                        placeholder=''
                        required
                    />
                    {errors.first_name && <span className={s.error_text}>{errors.first_name}</span>}
                </div>

                <div className={s.field_group}>
                    <label className={s.label}>Фамилия</label>
                    <input
                        className={`${s.input} ${errors.last_name ? s.input_error : ''}`}
                        type='text'
                        name='last_name'
                        value={form_data.last_name}
                        onChange={handle_change}
                        placeholder=''
                        required
                    />
                    {errors.last_name && <span className={s.error_text}>{errors.last_name}</span>}
                </div>

                <div className={s.field_group}>
                    <label className={s.label}>Должность</label>
                    <input className={s.input} type='text' name='job_title' value={form_data.job_title} onChange={handle_change} placeholder='Например: Резчик х/м' required />
                </div>
                <div className={s.field_group}>
                    <label className={s.label}>Пароль</label>
                    <input
                        className={`${s.input} ${errors.password ? s.input_error : ''}`}
                        type='password'
                        name='password'
                        value={form_data.password}
                        onChange={handle_change}
                        placeholder='••••••••'
                        required
                    />
                    {errors.password && <span className={s.error_text}>{errors.password}</span>}
                </div>
                <button type='submit' className={s.submit_btn}>
                    Создать
                </button>
            </form>
        </div>
    );
};
