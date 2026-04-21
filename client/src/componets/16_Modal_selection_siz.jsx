import { X } from 'lucide-react';
import Siz_store from '../store/02_Siz_store.js'
import s from '../styles/16_modal_selection_siz.module.css';

export const Modal_selection_siz = ({ set_modal_active_step }) => {

    const test = (id) => {
        set_modal_active_step('Выбор параметров')
        Siz_store.set_current(id)
    }

    return (
        <div className={s.selection_modal}>
            <div className={s.modal_header}>
                <h3 className={s.modal_title}>Выдача СИЗ</h3>
                <X className={s.modal_close_btn} size={20} onClick={() => set_modal_active_step(null)} />
            </div>
            <div className={s.modal_content}>
                {Siz_store.get_all_data().map((item) => {
                    return (
                        <div className={s.modal_item} key={item.id} onClick={() => test(item.id)}>
                            <img className={s.modal_img} src={item.img} />
                            <h4 className={s.modal_name}>{item.title}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}