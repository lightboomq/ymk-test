import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ArrowLeft, Package, Plus, History, X, RefreshCw, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import Siz_store from '../store/02_Siz_store';
import s from '../styles/18_user_current_siz.module.css';
import perchi from '../assets/перчи.png';

export const User_current_siz = observer(({ set_modal_active_step }) => {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.wrapper_title}>
                    <Package size={20} color='#2B7CFD' />
                    <h3 className={s.title}>Текущие СИЗ</h3>
                </div>

                <button className={s.give_siz_btn} onClick={() => set_modal_active_step('Склад СИЗ')} type='button'>
                    <Plus size={18} />
                    <span>Выдать</span>
                </button>
            </div>

            <div className={s.content}>
                <img className={s.img} src={perchi} alt='siz' />
                <div className={s.wrapper_info}>
                    <h4>Костюм каспер</h4>
                    <div className={s.wrapper_atr}>
                        <span className={s.atr}>Размер: 180-190</span>
                    </div>

                    <div className={s.wrapper_deadline}>
                        <span className={s.deadline}>Дней до износа: 365</span>
                        <div className={s.progress_line}></div>
                        <div className={s.date}>Выдано: 22.04.26 | Срок носки до: 22.04.27</div>
                    </div>
                </div>

                <div className={s.wrapper_btns}>
                    <button className={s.refresh_btn} type='button'>
                        <RefreshCw size={13} color='#f59e0b' />
                        Заменить
                    </button>
                </div>
                <span className={s.remove_btn}>
                    <Trash2 size={18} color='#94A3B8' />
                </span>
            </div>
        </div>
    );
});
