import { X } from 'lucide-react';
import Siz_store from '../store/02_Siz_store.js';
import s from '../styles/16_modal_selection_siz.module.css';

export const Modal_selection_siz = ({ set_modal_active_step }) => {
    const test = (id) => {
        set_modal_active_step('Выбор параметров');
        Siz_store.set_current(id);
    };

    return (
        <div className={s.container}>
            <div className={s.wrapper_header}>
                <h3 className={s.header}>Выдача СИЗ</h3>
                <X className={s.close_btn} size={20} onClick={() => set_modal_active_step(null)} />
            </div>
            <div className={s.content}>
                {Siz_store.get_all_data().map((item) => {
                    return (
                        <div key={item.id} className={s.wrapper_item} onClick={() => test(item.id)}>
                            <img className={s.img} src={item.img} />
                            <h4 className={s.titlke}>{item.title}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
