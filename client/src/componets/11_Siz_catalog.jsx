import React from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Siz_store from '../store/02_Siz_store';
import s from '../styles/11_siz_catalog.module.css';

export const Siz_catalog = observer(() => {

    const items = Siz_store.get_all_data()


    return (
        <div className={s.container}>
            <h2 className={s.header}>Каталог СИЗ</h2>

            {items.map((item) => {

                return (
                    <div className={s.card} key={item.id}>
                        <span className={s.remove_card} onClick={() => Siz_store.remove_item(item.id)}>
                            <Trash2 size={18} stroke='red' />
                        </span>

                        <img className={s.img} src={item.img} />

                        <div>
                            <h4 className={s.title}>{item.title}</h4>
                            <p className={s.description}>{item.description}</p>
                        </div>


                        <div className={s.attributes}>
                            {item.attributes.map((atr, index) => {
                                return (
                                    <div key={index}>
                                        <h5 className={s.label}>{atr.name}</h5>
                                        <p className={s.value}>{atr.value}</p>
                                    </div>
                                )

                            })}
                        </div>

                    </div>
                );
            })}
        </div>
    );
});
