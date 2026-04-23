import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ArrowLeft, Package, Plus, History, X, RefreshCw, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { User_current_siz } from './18_User_current_siz';
import { User_history_siz } from './19_User_history_siz';
import { Modal_selection_siz } from './16_Modal_selection_siz';
import { Modal_config_siz } from './17_Modal_config_siz';
import Users from '../store/01_Users';
import Siz from '../store/02_Siz';

import s from '../styles/14_user_card.module.css';

import perchi from '../assets/перчи.png';

export const User_card = observer(() => {
    const [modal_active_step, set_modal_active_step] = React.useState(null);

    const { id } = useParams();
    const user = Users.get_user(Number(id));
    const items = Siz.get_all_data();

    const [is_show_full_description, set_is_full_description] = React.useState(false);

    const [is_full_text, set_is_full_text] = React.useState(false);

    return (
        <div className={s.container}>
            <div className={s.wrapper_back}>
                <ArrowLeft size={16} />
                <Link className={s.link} to='/users'>
                    Назад к сотрудникам
                </Link>
            </div>

            <div className={s.wrapper_user}>
                <h2 className={s.user_title}>{`${user.first_name} ${user.last_name}`}</h2>
                <p className={s.user_job_title}> {`${user.job_title} • Личный номер ${user.personal_number}`}</p>
            </div>

            <User_current_siz set_modal_active_step={set_modal_active_step} />
            <User_history_siz />

            {modal_active_step === 'Склад СИЗ' && (
                <div className={s.modal_overlay}>
                    <Modal_selection_siz set_modal_active_step={set_modal_active_step} />
                </div>
            )}

            {modal_active_step === 'Выбор параметров' && (
                <div className={s.modal_overlay}>
                    <Modal_config_siz set_modal_active_step={set_modal_active_step} />
                </div>
            )}
        </div>
    );
});
