import React from 'react';
import { Trash2 } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import Siz_store from '../store/02_Siz_store';
import s from '../styles/11_siz_catalog.module.css';

export const Siz_catalog = observer(() => {
    const items = Siz_store.get_all_data();
    Siz_store.log();
    return (
        <div className={s.container}>
            <h2 className={s.header}>Cклад СИЗ</h2>

            {items.map((item) => (
                <div className={s.card} key={item.id}>
                    <span className={s.remove_card} onClick={() => Siz_store.remove_item(item.id)}>
                        <Trash2 size={18} />
                    </span>

                    <img className={s.img} src={item.img} alt={item.title} />

                    <div className={s.info_section}>
                        <h4 className={s.title}>{item.title}</h4>
                        <p className={s.description}>{item.description}</p>
                    </div>

                    <div className={s.attributes}>
                        {item.attributes.map((atr, index) => {
                            const values = atr.value
                                .split(',')
                                .map((v) => v.trim())
                                .filter(Boolean);

                            return (
                                <div className={s.attr_group} key={index}>
                                    <span className={s.label}>{atr.label}</span>
                                    <div className={s.values_list}>
                                        {values.map((value, i) => (
                                            <span key={i} className={s.value}>
                                                {value.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
});
