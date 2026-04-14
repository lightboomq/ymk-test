import React, { useState, useRef, useEffect } from 'react';
import { Upload, Plus, Trash2, X } from 'lucide-react';
import s from '../styles/12_siz_create.module.css';

export const Siz_create = () => {
    // Вспомогательная функция для дат в формате ГГГГ-ММ-ДД
    const get_formatted_date = (date_obj) => date_obj.toISOString().split('T')[0];

    // Инициализация дат: сегодня и сегодня + 1 год
    const init_dates = () => {
        const today = new Date();
        const next_year = new Date();
        next_year.setFullYear(today.getFullYear() + 1);
        return {
            issue_date: get_formatted_date(today),
            expiry_date: get_formatted_date(next_year),
        };
    };

    const initial_dates = init_dates();

    const [form_data, set_form_data] = useState({
        siz_category: '',
        siz_description: '',
        siz_image: null,
        issue_date: initial_dates.issue_date,
        expiry_date: initial_dates.expiry_date,
    });

    const [dynamic_params, set_dynamic_params] = useState([{ id: 1, label: 'Размер', value: '' }]);

    const [errors, set_errors] = useState({});
    const [preview_url, set_preview_url] = useState(null);
    const [is_dragging, set_is_dragging] = useState(false);
    const file_input_ref = useRef(null);
    const placeholder = [{ property: '' }];
    // Проверка дат
    const validate_dates = (issue, expiry) => {
        if (new Date(issue) > new Date(expiry)) {
            return 'Дата выдачи не может быть больше срока годности';
        }
        return '';
    };

    const handle_change = (e) => {
        const { name, value } = e.target;
        set_form_data((prev) => ({ ...prev, [name]: value }));

        // Сброс ошибки при вводе
        if (errors[name]) set_errors((prev) => ({ ...prev, [name]: '' }));
    };

    const handle_file = (files) => {
        const file = files[0];
        if (file && file.type.startsWith('image/')) {
            set_form_data((prev) => ({ ...prev, siz_image: file }));
            set_preview_url(URL.createObjectURL(file));
            set_errors((prev) => ({ ...prev, siz_image: '' }));
        }
    };

    const remove_image = (e) => {
        e.stopPropagation();
        set_form_data((prev) => ({ ...prev, siz_image: null }));
        set_preview_url(null);
        if (file_input_ref.current) file_input_ref.current.value = '';
    };

    const update_param = (id, key, val) => {
        set_dynamic_params(dynamic_params.map((p) => (p.id === id ? { ...p, [key]: val } : p)));
    };

    const handle_submit = (e) => {
        e.preventDefault();
        let current_errors = {};

        // Валидация
        if (!form_data.siz_image) current_errors.siz_image = 'Загрузите фотографию';
        if (!form_data.siz_description.trim()) current_errors.siz_description = 'Заполните описание';

        const date_err = validate_dates(form_data.issue_date, form_data.expiry_date);
        if (date_err) current_errors.dates = date_err;

        if (Object.keys(current_errors).length > 0) {
            set_errors(current_errors);
            return;
        }

        const final_data = { ...form_data, attributes: dynamic_params };
        console.log('отправка_данных_сиз:', final_data);
    };

    return (
        <div className={s.container}>
            <h2 className={s.title}>Создание карточки СИЗ</h2>

            <form className={s.form} onSubmit={handle_submit} autoComplete='off'>
                <div className={s.row}>
                    <div className={s.field_group}>
                        <label className={s.label}>Дата выдачи</label>
                        <input type='date' name='issue_date' className={s.input} value={form_data.issue_date} onChange={handle_change} />
                    </div>
                    <div className={s.field_group}>
                        <label className={s.label}>Срок износа</label>
                        <input
                            type='date'
                            name='expiry_date'
                            className={`${s.input} ${errors.dates ? s.input_error : ''}`}
                            value={form_data.expiry_date}
                            onChange={handle_change}
                        />
                    </div>
                </div>
                {errors.dates && <span className={s.error_text}>{errors.dates}</span>}

                <div className={s.field_group}>
                    <label className={s.label}>Тип СИЗ</label>
                    <input
                        type='text'
                        className={s.input}
                        value={form_data.siz_category}
                        onChange={(e) => set_form_data({ ...form_data, siz_category: e.target.value })}
                        placeholder='Например: Ботинки'
                        required
                    />
                </div>

                <div className={s.field_group}>
                    <label className={s.label}>Фотография</label>
                    <div
                        className={`${s.drop_zone} ${errors.siz_image ? s.input_error : ''} ${is_dragging ? s.drag_active : ''}`}
                        onDragOver={(e) => {
                            e.preventDefault();
                            set_is_dragging(true);
                        }}
                        onDragLeave={() => set_is_dragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            set_is_dragging(false);
                            handle_file(e.dataTransfer.files);
                        }}
                        onClick={() => file_input_ref.current.click()}
                    >
                        {preview_url ? (
                            <div className={s.preview_wrapper}>
                                <img src={preview_url} alt='preview' className={s.image_preview} />
                                <button type='button' className={s.remove_img_btn} onClick={remove_image}>
                                    <X size={18} />
                                </button>
                            </div>
                        ) : (
                            <div className={s.drop_content}>
                                <Upload size={30} />
                                <p>
                                    Перетащите фото или <span>выберите файл</span>
                                </p>
                            </div>
                        )}
                        <input type='file' ref={file_input_ref} onChange={(e) => handle_file(e.target.files)} hidden accept='image/*' />
                    </div>
                    {errors.siz_image && <span className={s.error_text}>{errors.siz_image}</span>}
                </div>

                <div className={s.field_group}>
                    <label className={s.label}>Описание</label>
                    <textarea
                        className={`${s.textarea} ${errors.siz_description ? s.input_error : ''}`}
                        value={form_data.siz_description}
                        onChange={(e) => set_form_data({ ...form_data, siz_description: e.target.value })}
                        placeholder='Краткое описание...'
                    />
                    {errors.siz_description && <span className={s.error_text}>{errors.siz_description}</span>}
                </div>

                <div className={s.params_section}>
                    <div className={s.params_header}>
                        <div className={s.label_group}>
                            <span className={s.label}>Характеристики</span>
                            <p className={s.hint}>Более 1 размера в поле Значение перечисляйте через запятую</p>
                        </div>
                        <button type='button' className={s.add_btn} onClick={() => set_dynamic_params([...dynamic_params, { id: Date.now(), label: '', value: '' }])}>
                            <Plus size={16} /> Добавить
                        </button>
                    </div>
                    {dynamic_params.map((param) => (
                        <div key={param.id} className={s.param_row}>
                            <input type='text' placeholder='Свойство' className={s.input} value={param.label} onChange={(e) => update_param(param.id, 'label', e.target.value)} />
                            <input type='text' placeholder='Значение' className={s.input} value={param.value} onChange={(e) => update_param(param.id, 'value', e.target.value)} />
                            <button
                                type='button'
                                className={s.remove_btn}
                                onClick={() => set_dynamic_params(dynamic_params.filter((p) => p.id !== param.id))}
                                disabled={dynamic_params.length === 1}
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>

                <button type='submit' className={s.submit_btn}>
                    Сохранить СИЗ
                </button>
            </form>
        </div>
    );
};
