import React from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Siz_store from '../store/02_Siz_store';
import perchi from '../assets/перчи.png';
import s from '../styles/11_siz_catalog.module.css';

export const Siz_catalog = observer(() => {
    const arr = Siz_store.get_all_data();

    return (
        <div className={s.container}>
            <h2 className={s.header}>Каталог СИЗ</h2>

            {arr.map((item) => {
                return (
                    <div className={s.card} key={item.id}>
                        <span className={s.remove_card}>
                            <Trash2 size={18} stroke='red' />
                        </span>

                        <img className={s.img} src={perchi} />

                        <div>
                            <h4 className={s.title}>{item.title}</h4>
                            <p className={s.description}>{item.description}</p>
                        </div>

                        <div className={s.attributes}>
                            <div>
                                <h5 className={s.label}>Размер</h5>
                                <p className={s.value}>30,45,60</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});
