import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, History, Archive, Package, X, Check, Clock } from 'lucide-react';
import s from '../styles/14_user_card.module.css';

export const User_card = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [is_modal_open, set_is_modal_open] = useState(false);
    const [is_archived, set_is_archived] = useState(false); // Статус архива

    // Текущие СИЗ
    const [current_siz, set_current_siz] = useState([{ id: 1, name: 'Ботинки рабочие S3', date: '15.02.2024', expiry: '15.02.2025' }]);

    // История СИЗ (Статичные данные)
    const [history_siz] = useState([
        { id: 101, name: 'Перчатки х/б', date: '01.01.2024', end_date: '01.02.2024', status: 'Списано' },
        { id: 102, name: 'Каска защитная', date: '10.10.2022', end_date: '10.10.2023', status: 'Износ' },
        { id: 103, name: 'Очки защитные', date: '05.05.2023', end_date: '01.12.2023', status: 'Утеря' },
    ]);

    const siz_stock = [
        { id: 10, name: 'Каска защитная (белая)', term: '24 мес.' },
        { id: 11, name: 'Перчатки спилковые', term: '3 мес.' },
        { id: 12, name: 'Костюм «Энергия»', term: '12 мес.' },
    ];

    const issue_siz = (item) => {
        const today = new Date().toLocaleDateString('ru-RU');
        const new_item = { id: Date.now(), name: item.name, date: today, expiry: '12 мес.' };
        set_current_siz([new_item, ...current_siz]);
        set_is_modal_open(false);
    };

    return (
        <div className={`${s.container} ${is_archived ? s.archived : ''}`}>
            <button className={s.back_btn} onClick={() => navigate('/users')}>
                <ArrowLeft size={18} /> Назад
            </button>

            <div className={s.header}>
                <div className={s.user_main}>
                    <h1>Иван Иванов {is_archived && <span className={s.archived_text}>(В АРХИВЕ)</span>}</h1>
                    <span className={s.pos_tag}>Резчик холодного металла • {id}</span>
                </div>
                <button className={is_archived ? s.restore_btn : s.archive_btn} onClick={() => set_is_archived(!is_archived)}>
                    <Archive size={16} /> {is_archived ? 'Восстановить' : 'В архив'}
                </button>
            </div>

            {/* Блок активных СИЗ */}
            <section className={s.section}>
                <div className={s.section_header}>
                    <h2>
                        <Package size={20} /> Текущие СИЗ
                    </h2>
                    {!is_archived && (
                        <button className={s.add_btn} onClick={() => set_is_modal_open(true)}>
                            <Plus size={16} /> Выдать
                        </button>
                    )}
                </div>
                <div className={s.siz_list}>
                    {current_siz.map((siz) => (
                        <div key={siz.id} className={s.siz_item}>
                            <span className={s.siz_name}>{siz.name}</span>
                            <span className={s.siz_dates}>
                                Выдано: {siz.date} • До: {siz.expiry}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Блок истории */}
            <section className={s.section}>
                <div className={s.section_header}>
                    <h2>
                        <History size={20} /> История эксплуатации
                    </h2>
                </div>
                <div className={s.history_list}>
                    {history_siz.map((h) => (
                        <div key={h.id} className={s.history_item}>
                            <Clock size={16} className={s.history_icon} />
                            <div className={s.history_info}>
                                <span className={s.h_name}>{h.name}</span>
                                <span className={s.h_dates}>
                                    {h.date} — {h.end_date}
                                </span>
                            </div>
                            <span className={s.h_status}>{h.status}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Модалка */}
            {is_modal_open && (
                <div className={s.overlay} onClick={() => set_is_modal_open(false)}>
                    <div className={s.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={s.modal_header}>
                            <h3>Выбор СИЗ</h3>
                            <button onClick={() => set_is_modal_open(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        {siz_stock.map((item) => (
                            <div key={item.id} className={s.stock_item} onClick={() => issue_siz(item)}>
                                <span>{item.name}</span>
                                <Plus size={16} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
