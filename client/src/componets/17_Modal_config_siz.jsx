import React from 'react';
import { X } from 'lucide-react';
import Siz_store from '../store/02_Siz_store.js';
import s from '../styles/17_modal_config_siz.module.css';

export const Modal_config_siz = ({ set_modal_active_step }) => {
    const current = Siz_store.current;
    const [is_full_text, set_is_full_text] = React.useState(false);
    const [date, set_date] = React.useState(new Date().toISOString().split('T')[0]);

    return (
        <div className={s.container}>
            <div className={s.header}>
                <h3 className={s.title}>Выдача СИЗ</h3>
                <X className={s.close_btn} size={20} onClick={() => set_modal_active_step(null)} />
            </div>

            <div className={s.wrapper_info}>
                <img className={s.img} src={current.img} />
                <div className={s.info}>
                    <h4>{current.title}</h4>
                    <p className={s.description}>{is_full_text ? current.description : `${current.description.slice(0, 90)}...`}</p>
                    <button className={s.toggle_description_btn} onClick={() => set_is_full_text(!is_full_text)} type='button'>
                        {is_full_text ? 'Свернуть' : 'Развернуть'}
                    </button>
                </div>
            </div>

            {current.attributes.map((atr, index) => {
                const values = atr.value
                    .split(',')
                    .map((v) => v.trim())
                    .filter(Boolean);
                return (
                    <div key={index}>
                        <span className={s.label}>{atr.name}</span>
                        <div className={s.values_list}>
                            {values.map((value, i) => (
                                <span key={i} className={s.badge}>
                                    {value.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            })}
            <div className={s.wrapper_input_date}>
                <span className={s.label}>Дата выдачи</span>
                <input className={s.input_date} type='date' value={date} onChange={(e) => set_date(e.target.value)} />
            </div>
        </div>
    );
    //test
};
