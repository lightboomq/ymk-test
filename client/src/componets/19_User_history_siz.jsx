import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ArrowLeft, Package, Plus, History, X, RefreshCw, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import Siz_store from '../store/02_Siz_store';
import s from '../styles/19_user_history_siz.module.css';
import perchi from '../assets/перчи.png';

export const User_history_siz = observer(() => {
    return (
        <div className={s.container}>
            <div className={s.wrapper}>
                <div className={s.wrapper_title}>
                    <History size={20} color='#64748B' />
                    <h3 className={s.title}>История эксплуатации СИЗ</h3>
                </div>
            </div>
            <div className={s.content}>
                <div className={s.wrapper_info}>
                    <img className={s.img} src={perchi} alt='siz' />
                    <div className={s.wrapper_atr}>
                        <h4>Костюм каспер</h4>
                        <div className={s.atr}>Размер: 182-201 • Рост 190 • Размах крыльев</div>
                    </div>
                </div>

                <div className={s.wrapper_period}>
                    <div className={s.period_info}>
                        <h4 className={s.period}>ПЕРИОД</h4>
                        <span className={s.date}>20.04.2026 — 20.04.2027</span>
                    </div>
                    <span className={s.remove_btn}>
                        <Trash2 size={18} />
                    </span>
                </div>
            </div>
        </div>
    );
});
