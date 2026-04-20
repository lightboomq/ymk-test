import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ArrowLeft, Package, Plus, History, X, RefreshCw, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import Siz_store from '../store/02_Siz_store';
import s from '../styles/14_user_card.module.css';

export const User_card = observer(() => {
    const [currentSiz, setCurrentSiz] = useState([]);
    const [historySiz, setHistorySiz] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('issue');
    const [targetId, setTargetId] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedAttrs, setSelectedAttrs] = useState({});
    const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
    const [deleteConfirm, setDeleteConfirm] = useState({ open: false, type: '', id: null });

    const catalog = Siz_store.get_all_data();
    const formatToDisplay = (dateStr) => dateStr.split('-').reverse().join('.');

    const getDaysRemaining = (endDateStr) => {
        if (!endDateStr) return 0;
        const [day, month, year] = endDateStr.split('.').map(Number);
        const end = new Date(2000 + year, month - 1, day);
        return Math.ceil((end - new Date()) / (1000 * 60 * 60 * 24));
    };

    const handleConfirmIssue = () => {
        if (Object.keys(selectedAttrs).length < selectedItem.attributes.length) return alert('Выберите все параметры!');
        const newIssue = {
            ...selectedItem,
            issue_uid: Date.now(),
            user_attributes: { ...selectedAttrs },
            date_issue: formatToDisplay(issueDate),
            date_deadline: selectedItem.end_date,
        };
        if (modalMode === 'replace') {
            const oldItem = currentSiz.find((i) => i.issue_uid === targetId);
            setHistorySiz([{ ...oldItem, date_return: formatToDisplay(issueDate) }, ...historySiz]);
            setCurrentSiz(currentSiz.map((i) => (i.issue_uid === targetId ? newIssue : i)));
        } else {
            setCurrentSiz([newIssue, ...currentSiz]);
        }
        closeModal();
    };

    const executeDeletion = () => {
        if (deleteConfirm.type === 'history') setHistorySiz(historySiz.filter((i) => i.issue_uid !== deleteConfirm.id));
        else setCurrentSiz(currentSiz.filter((i) => i.issue_uid !== deleteConfirm.id));
        setDeleteConfirm({ open: false, type: '', id: null });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedItem(null);
        setSelectedAttrs({});
        setIssueDate(new Date().toISOString().split('T')[0]);
    };

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper_back}>
                <ArrowLeft size={16} />
                <Link className={s.link} to='/users'>
                    Назад к сотрудникам
                </Link>
            </div>

            <div className={s.title_user}>
                <h2>Иван Иванов</h2>
                <p>Резчик холодного металла • Табельный №342</p>
            </div>

            <div className={s.wrapper_test}>
                <div className={s.wrapper_current_siz}>
                    <div className={s.title_current_siz}>
                        <Package size={20} color='#2b7cfd' /> Текущие СИЗ
                    </div>
                    <button
                        className={s.btn_add_siz}
                        onClick={() => {
                            setModalMode('issue');
                            setIsModalOpen(true);
                        }}
                    >
                        <Plus size={18} /> Выдать
                    </button>
                </div>

                {currentSiz.map((item) => {
                    const days = getDaysRemaining(item.date_deadline);
                    return (
                        <div className={s.siz} key={item.issue_uid}>
                            <img className={s.siz_img} src={item.img} alt='' />
                            <div className={s.info_main}>
                                <h4 style={{ margin: '0 0 5px' }}>{item.title}</h4>
                                <div className={s.attr_tags}>
                                    {Object.entries(item.user_attributes).map(([n, v]) => (
                                        <span key={n} className={s.tag}>
                                            {n}: {v}
                                        </span>
                                    ))}
                                </div>
                                <div className={s.deadline_block}>
                                    <span style={{ fontSize: '12px', fontWeight: '700', color: days < 30 ? '#ef4444' : '#10b981' }}>
                                        {days > 0 ? `Дней до износа: ${days}` : 'Срок истек'}
                                    </span>
                                    <div className={s.progress_bar}>
                                        <div
                                            className={s.progress_fill}
                                            style={{ width: `${Math.max(0, Math.min(100, (days / 365) * 100))}%`, background: days < 30 ? '#ef4444' : '#10b981' }}
                                        ></div>
                                    </div>
                                    <span style={{ fontSize: '10px', color: '#94a3b8' }}>
                                        Выдано: {item.date_issue} | Срок: {item.date_deadline}
                                    </span>
                                </div>
                            </div>
                            <div className={s.actions_block}>
                                <button
                                    className={s.btn_replace}
                                    onClick={() => {
                                        setModalMode('replace');
                                        setTargetId(item.issue_uid);
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <RefreshCw size={13} /> Заменить
                                </button>
                                <button className={s.btn_remove_current} onClick={() => setDeleteConfirm({ open: true, type: 'current', id: item.issue_uid })}>
                                    Удалить
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className={s.wrapper_test}>
                <div className={s.title_current_siz}>
                    <History size={20} color='#64748b' /> История
                </div>
                {historySiz.map((item) => (
                    <div className={s.history_card} key={item.issue_uid}>
                        <img src={item.img} className={s.history_img} />
                        <div style={{ flex: 1 }}>
                            <h5 style={{ margin: 0 }}>{item.title}</h5>
                            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>{Object.values(item.user_attributes).join(' • ')}</p>
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '11px', color: '#94a3b8', marginRight: '10px' }}>
                            {item.date_issue} - {item.date_return}
                        </div>
                        <button className={s.btn_del_history} onClick={() => setDeleteConfirm({ open: true, type: 'history', id: item.issue_uid })}>
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            {/* MODAL ISSUE/REPLACE */}
            {isModalOpen && (
                <div className={s.modal_overlay}>
                    <div className={s.modal_content}>
                        <div className={s.modal_header}>
                            <h3 style={{ margin: 0 }}>{modalMode === 'issue' ? 'Выдача СИЗ' : 'Замена СИЗ'}</h3>
                            <X className={s.close_btn} onClick={closeModal} size={20} />
                        </div>

                        {!selectedItem ? (
                            <div className={s.catalog_list}>
                                {catalog.map((item) => (
                                    <div key={item.id} className={s.catalog_item} onClick={() => setSelectedItem(item)}>
                                        <img src={item.img} alt='' />
                                        <div style={{ fontSize: '12px', fontWeight: '600' }}>{item.title}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div>
                                <div className={s.selection_header}>
                                    <img src={selectedItem.img} className={s.selected_img_min} />
                                    <div>
                                        <h4 style={{ margin: 0 }}>{selectedItem.title}</h4>
                                        <span style={{ fontSize: '11px', color: '#64748b' }}>Настройка параметров</span>
                                    </div>
                                </div>

                                {selectedItem.attributes.map((attr) => (
                                    <div key={attr.name}>
                                        <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>{attr.name.toUpperCase()}</span>
                                        <div className={s.chip_group}>
                                            {attr.value.split(',').map((v) => (
                                                <button
                                                    key={v}
                                                    className={`${s.chip} ${selectedAttrs[attr.name] === v.trim() ? s.chip_active : ''}`}
                                                    onClick={() => setSelectedAttrs({ ...selectedAttrs, [attr.name]: v.trim() })}
                                                >
                                                    {v.trim()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}

                                <div style={{ marginTop: '15px' }}>
                                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8' }}>ДАТА ВЫДАЧИ</span>
                                    <input type='date' className={s.input_date} value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
                                </div>

                                <button
                                    className={s.btn_add_siz}
                                    style={{ width: '100%', marginTop: '20px', justifyContent: 'center', boxSizing: 'border-box' }}
                                    onClick={handleConfirmIssue}
                                >
                                    <CheckCircle2 size={18} /> Подтвердить
                                </button>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    style={{ width: '100%', border: 'none', background: 'none', color: '#94a3b8', fontSize: '12px', marginTop: '12px', cursor: 'pointer' }}
                                >
                                    ← Изменить выбор
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* DELETE CONFIRM */}
            {deleteConfirm.open && (
                <div className={s.modal_overlay}>
                    <div className={`${s.modal_content} ${s.delete_modal}`}>
                        <AlertCircle size={40} color='#ef4444' style={{ marginBottom: '10px' }} />
                        <h3 style={{ margin: '0 0 10px' }}>Вы уверены?</h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>Действие нельзя будет отменить.</p>
                        <div className={s.delete_btns}>
                            <button className={s.btn_cancel} onClick={() => setDeleteConfirm({ open: false, type: '', id: null })}>
                                Отмена
                            </button>
                            <button className={s.btn_confirm_del} onClick={executeDeletion}>
                                Удалить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
});
