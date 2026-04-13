import React from 'react';
import { Link } from 'react-router-dom';
import logo_company_jpg from '../assets/logo_company.jpg';
import s from '../styles/07_header.module.css';

export const Header = () => {
    return (
        <header className={s.header}>
            <img src={logo_company_jpg} alt='logo_company' />
        </header>
    );
};
