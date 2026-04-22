import React from 'react';
import s from '../03_modal_window.module.css';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
    if (!isOpen) return null;

    return (
        <div className={s.overlay}>
            <div className={s.container}>
                <div className={s.icon}>!</div>

                <h2 className={s.title}>Удалить запись?</h2>

                <p className={s.text}>
                    Это действие нельзя будет отменить. Данные будут безвозвратно удалены из системы.
                </p>

                <div className={s.actions}>
                    <button className={s.btnSecondary} onClick={onClose}>
                        Отмена
                    </button>
                    <button className={s.btnDanger} onClick={onDelete}>
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
