import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Users_store from '../store/01_Users_store';
import { ArrowLeft, Package, Plus, History } from 'lucide-react';
import bot from '../assets/боты.jpg';
import s from '../styles/14_user_card.module.css';

export const User_card = observer(() => {
    const [siz_catalog, set_siz_catalog] = React.useState([
        {
            id: 1,
            img: bot,
            title: 'Ботинки рабочие',
            description: 'Защитный подносок, антипрокольная стелька, МБС подошва.',
            attribute: [
                {
                    name: 'Размер',
                    value: '44,47,45',
                },
                {
                    name: 'Рост',
                    value: '174-189,190-210,45',
                },
                {
                    name: 'Размах рук',
                    value: '25',
                },
            ],
            replacement: false,
            status: '',
            start_date: '12.12.26',
            end_date: '12.12.27',
        },
    ]);

    return (
        <div className={s.wrapper}>
            <div className={s.wrapper_back}>
                <ArrowLeft size={20} stroke='#6488BC' />
                <Link className={s.link}>Вернуться к сотрудникам</Link>
            </div>

            <div className={s.title_user}>
                <h2>Иван Иванов</h2>
                <p>Резчик холодного металла </p>
                <p>Личный номер 342 </p>
            </div>

            <div className={s.wrapper_test}>
                <div className={s.wrapper_current_siz}>
                    <div className={s.title_current_siz}>
                        <Package size={20} />
                        <p>Текущие СИЗ</p>
                    </div>

                    <button className={s.btn_add_siz}>
                        <Plus size={20} stroke='white' />
                        Выдать
                    </button>
                </div>
                {siz_catalog.map((item, i) => {
                    return (
                        <div className={s.siz} key={item.id}>
                            <img className={s.siz_img} src={item.img} />
                            <div>
                                <h4>{item.title} </h4>
                                <p>{item.description}</p>
                                {/* {item.attribute.map((atribute) => {
                                    console.log(atribute.value);
                                    return <p></p>;
                                })} */}
                                <p>Срок износа: 12мес</p>
                                <p>Дата выдачи: 16.12.26</p>
                                <button>Заменить</button>
                            </div>
                        </div>
                    );
                })}

                <div className={s.siz}>
                    <img className={s.siz_img} src={bot} alt='' />
                    <div>
                        <h4>Ботинки рабочие </h4>
                        <p>Защитный подносок, антипрокольная стелька, МБС подошва.</p>
                        <p>Размер: 45</p>
                        <p>Рост: 175-186</p>
                        <p>Срок износа: 12мес</p>
                        <p>Дата выдачи: 16.12.26</p>
                    </div>
                </div>
                <button>Добавить в историю</button>
            </div>

            <div className={s.wrapper_test}>
                <div className={s.wrapper_current_siz}>
                    <div className={s.title_current_siz}>
                        <History size={20} />
                        <p>История эксплуатации СИЗ</p>
                    </div>
                </div>
                <div>16.04.25 - 16.04.26 4 поз. </div>
            </div>
        </div>
    );
});
{
    /* <div className={s.dedline_siz}>365</div> */
}
