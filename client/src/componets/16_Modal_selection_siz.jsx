import { X } from 'lucide-react';
import Siz from '../store/02_Siz.js';
import Current_siz from '../store/03_Current_siz.js';
import { observer } from 'mobx-react-lite';
import s from '../styles/16_modal_selection_siz.module.css';
import { toJS } from 'mobx'

export const Modal_selection_siz = observer(({ set_modal_active_step }) => {
    const items = Siz.get_all_data();

    const select_siz = (id) => {
        set_modal_active_step('Выбор параметров');
        const item = items.find(item => item.id === id);
        Current_siz.set_selected_siz(item)
    };
    return (
        <div className={s.container}>
            <div className={s.wrapper_header}>
                <h3 className={s.header}>Выдача СИЗ</h3>
                <X className={s.close_btn} size={20} onClick={() => set_modal_active_step(null)} />
            </div>
            <div className={s.content}>
                {Siz.get_all_data().map((item) => {
                    return (
                        <div key={item.id} className={s.wrapper_item} onClick={() => select_siz(item.id)}>
                            <img className={s.img} src={item.img} />
                            <h4 className={s.titlke}>{item.title}</h4>
                        </div>
                    );
                })}
            </div>
        </div>
    );
});
