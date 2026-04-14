import React, { useState } from 'react';
import { Trash2, Box } from 'lucide-react';
import s from '../styles/11_siz_catalog.module.css';
import boots_img from '../assets/боты.jpg';
import kost_img from '../assets/костюм.png';
import head_img from '../assets/каска.png';
import perch_img from '../assets/перчи.png';
export const Siz_catalog = () => {
    const [siz_items, set_siz_items] = useState([
        {
            id: 1,
            category: 'Спецобувь S3',
            description: 'Ботинки с защитным подноском, антипрокольная стелька, МБС подошва.',
            image: boots_img,
            attributes: [
                { label: 'Размеры', value: '40-46' },
                { label: 'Класс', value: 'S3 SRC' },
                { label: 'Срок износа', value: '6 мес.' },
            ],
        },
        {
            id: 2,
            category: 'Костюм «Энергия»',
            description: 'Костюм для защиты от термических рисков электрической дуги.',
            image: kost_img,
            attributes: [
                { label: 'Рост', value: '170, 182' },
                { label: 'Материал', value: 'Арамид' },
                { label: 'Срок износа', value: '8 мес.' },
            ],
        },
        {
            id: 3,
            category: 'Каска защитная',
            description: 'Каска с храповым механизмом регулировки и вентиляцией.',
            image: head_img,
            attributes: [
                { label: 'Цвет', value: 'Белый' },
                { label: 'Ударопрочность', value: '50 Дж' },
                { label: 'Срок износа', value: '12 мес.' },
            ],
        },
        {
            id: 4,
            category: 'Перчатки спилковые',
            description: 'Усиленные перчатки для тяжелых работ и защиты от истирания.',
            image: perch_img,
            attributes: [
                { label: 'Тип', value: 'Спилок' },
                { label: 'Защита', value: 'Ми, Мп' },
                { label: 'Срок износа', value: '2 мес.' },
            ],
        },
    ]);

    return (
        <div className={s.container}>
            <div className={s.top_bar}>
                <h2 className={s.title}>Каталог продукции СИЗ</h2>
                <span className={s.badge}>{siz_items.length} ед.</span>
            </div>

            <div className={s.grid}>
                {siz_items.map((item) => (
                    <div key={item.id} className={s.item_card}>
                        <div className={s.img_box}>
                            <img src={item.image} alt='product' />
                            <button className={s.del_icon} onClick={() => set_siz_items(siz_items.filter((i) => i.id !== item.id))}>
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className={s.main_info}>
                            <h3 className={s.name}>{item.category}</h3>
                            <p className={s.info_text}>{item.description}</p>

                            <div className={s.spec_table}>
                                {item.attributes.map((attr, idx) => (
                                    <div key={idx} className={s.spec_item}>
                                        <span className={s.label}>{attr.label}</span>
                                        <span className={s.val}>{attr.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
