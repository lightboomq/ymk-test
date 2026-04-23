import React from 'react';
import { X, CheckCircle2, ArrowLeft } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Siz from '../store/02_Siz.js';
import Current_siz from '../store/03_Current_siz.js';
import { toJS } from 'mobx'
import s from '../styles/17_modal_config_siz.module.css';

export const Modal_config_siz = observer(({ set_modal_active_step }) => {
    const siz = Current_siz.get_selected_siz();
    const [is_full_text, set_is_full_text] = React.useState(false);
    const [input_date, set_input_date] = React.useState(new Date().toISOString().split('T')[0]);
    const [selected_attrs, set_selected_attrs] = React.useState({});
    const is_ready = Object.keys(selected_attrs).length > 0; // Проверка на содержимоя объекта для disabled кнопки

    const select_attrs = (e) => {
        const { label, value } = e.target.dataset;
        if (!label || !value) return;

        const is_selected = selected_attrs[label] === value; // проверка на уже выбранную карточку;
        set_selected_attrs((prev) => {
            if (is_selected) {
                const copy = { ...prev };
                delete copy[label];
                return copy;
            }
            return { ...prev, [label]: value };
        });
    };

    const add_to_current_siz = () => {
        const copy = toJS(Current_siz.get_selected_siz());
        copy.attributes = selected_attrs
        Current_siz.set_data(copy)
        set_modal_active_step(null);
    };

    return (
        <div className={s.container}>
            <div className={s.header}>
                <h3 className={s.title}>Выдача СИЗ</h3>
                <X className={s.close_btn} size={20} onClick={() => set_modal_active_step(null)} />
            </div>

            <div className={s.wrapper_info}>
                <img className={s.img} src={siz.img} />
                <div className={s.info}>
                    <h4>{siz.title}</h4>
                    <p className={s.description}>{is_full_text ? siz.description : `${siz.description?.slice(0, 90)}...`}</p>
                    <button className={s.toggle_description_btn} onClick={() => set_is_full_text(!is_full_text)} type='button'>
                        {is_full_text ? 'Свернуть' : 'Развернуть'}
                    </button>
                </div>
            </div>

            {siz.attributes.map((attr, index) => {
                const values = attr.value
                    .split(',')
                    .map((v) => v.trim())
                    .filter(Boolean);

                return (
                    <div key={index} onClick={(e) => select_attrs(e)}>
                        <span className={s.label}>{attr.label}</span>
                        <div className={s.values_list}>
                            {values.map((value, i) => {
                                const is_selected = selected_attrs[attr.label] === value;
                                return (
                                    <span key={i} className={`${s.value} ${is_selected && s.selected}`} data-label={attr.label} data-value={value}>
                                        {value.trim()}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
            <div>
                <span className={s.label}>Дата выдачи</span>
                <input className={s.input_date} type='date' value={input_date} onChange={(e) => set_input_date(e.target.value)} />
            </div>

            <div>
                <button className={`${s.submit_btn} ${is_ready && s.ready}`} onClick={add_to_current_siz} disabled={!is_ready} type='button'>
                    <CheckCircle2 size={18} color='white' /> Подтвердить
                </button>
                <button className={s.change_choice_btn} onClick={() => set_modal_active_step('Склад СИЗ')} type='button'>
                    ← Изменить выбор
                </button>
            </div>
        </div>
    );
});