import React, { useState, useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Siz_store from '../store/02_Siz_store';
import { Upload, Plus, Trash2, X } from 'lucide-react';
import s from '../styles/12_siz_create.module.css';

export const Siz_create = observer(() => {
    // Вспомогательная функция для дат в формате ГГГГ-ММ-ДД
    const get_formatted_date = (date_obj) => date_obj.toISOString().split('T')[0];

    // Инициализация дат: сегодня и сегодня + 1 год
    const init_dates = () => {
        const today = new Date();
        const next_year = new Date();
        next_year.setFullYear(today.getFullYear() + 1);
        return {
            usage_period: get_formatted_date(today),

        };
    };

    const initial_dates = init_dates();

    const [form_data, set_form_data] = useState({
        id: Date.now(),
        type: '',
        description: '',
        img: null,
        usage_period: '',
    });

    const [dynamic_params, set_dynamic_params] = useState([{ id: 1, label: '', value: '' }]);

    const [errors, set_errors] = useState({});
    const [preview_url, set_preview_url] = useState(null);
    const [is_dragging, set_is_dragging] = useState(false);
    const file_input_ref = useRef(null);


    const validate_dates = (issue, expiry) => {
        const validate_usage = (value) => {
            if (!value || value <= 0) {
                return 'Введите корректный срок износа';
            }
            return '';
        };
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
            set_form_data((prev) => ({ ...prev, img: file }));
            set_preview_url(URL.createObjectURL(file));
            set_errors((prev) => ({ ...prev, img: '' }));
        }
    };

    const remove_image = (e) => {
        e.stopPropagation();
        set_form_data((prev) => ({ ...prev, img: null }));
        set_preview_url(null);
        if (file_input_ref.current) file_input_ref.current.value = '';
    };

    const update_param = (id, key, val) => {
        set_dynamic_params(dynamic_params.map((p) => (p.id === id ? { ...p, [key]: val } : p)));
    };

    const handle_submit = (e) => {
        e.preventDefault();
        let current_errors = {};

        // if (!form_data.img) current_errors.img = 'Загрузите фотографию';
        if (!form_data.description.trim()) current_errors.description = 'Заполните описание';

        const date_err = validate_dates(form_data.usage_period);
        if (date_err) current_errors.dates = date_err;

        if (Object.keys(current_errors).length > 0) {
            set_errors(current_errors);
            return;
        }

        const final_data = { ...form_data, attributes: dynamic_params };
        Siz_store.add(final_data);
        console.log('отправка_данных_сиз:', final_data);
    };



    return (
        <div className={s.container}>
            <h2 className={s.title}>Создание карточки СИЗ</h2>

            <form className={s.form} onSubmit={handle_submit} autoComplete='off'>
                <div className={s.row}>
                    <div className={s.field_group}>
                        <label className={s.label}>Срок износа (в месяцах)</label>
                        <input
                            type='number'
                            name='usage_period'
                            className={s.input}
                            value={form_data.usage_period}
                            onChange={handle_change}
                            placeholder='Например: 12'
                            min='1'
                        />
                    </div>
                </div>
                {errors.dates && <span className={s.error_text}>{errors.dates}</span>}

                <div className={s.field_group}>
                    <label className={s.label}>Тип СИЗ</label>
                    <input
                        type='text'
                        className={s.input}
                        value={form_data.type}
                        onChange={(e) => set_form_data({ ...form_data, type: e.target.value })}
                        placeholder='Например: Ботинки'
                        required
                    />
                </div>

                <div className={s.field_group}>
                    <label className={s.label}>Фотография</label>
                    <div
                        className={`${s.drop_zone} ${errors.img ? s.input_error : ''} ${is_dragging ? s.drag_active : ''}`}
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
                    {errors.img && <span className={s.error_text}>{errors.img}</span>}
                </div>

                <div className={s.field_group}>
                    <label className={s.label}>Описание</label>
                    <textarea
                        className={`${s.textarea} ${errors.description ? s.input_error : ''}`}
                        value={form_data.description}
                        onChange={(e) => set_form_data({ ...form_data, description: e.target.value })}
                        placeholder='Краткое описание...'
                    />
                    {errors.description && <span className={s.error_text}>{errors.description}</span>}
                </div>

                <div className={s.params_section}>
                    <div className={s.params_header}>
                        <div className={s.label_group}>
                            <span className={s.label}>Характеристики</span>
                            <p className={s.hint}>Более 1 параметра в поле Значение перечисляйте через запятую</p>
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
});
