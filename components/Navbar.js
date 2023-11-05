'use client'
import { useEffect, useRef } from 'react';
import { HiMiniBars3 } from 'react-icons/hi2';
import { IoSettingsSharp } from 'react-icons/io5';
import style from '../styles/css/Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';

export default function Navbar({ i18n, changeLanguage }){
    const dispatch = useDispatch();
    const { enAtivo, modoEscuro, itemAtivo, windowSize, menuOpen, settingOpen } = useSelector(rootReducer => rootReducer.useReducer);
    const menuRef = useRef(null);
    const settingsRef = useRef(null);
    
    const itens = [
        {key:1, value:'Home', link:'#home'},
        {key:2,value: i18n.t('navbar.item2'), link:'#projetos'},
        {key:3, value: i18n.t('navbar.item3'), link:'#sobre'},
        {key:4, value: i18n.t('navbar.item4'),link:'#habilidades'},
        {key:5, value: i18n.t('navbar.item5'), link:'#experiencias'},
        {key:6, value: i18n.t('navbar.item6'), link:'#contato'},
    ];


    const handleLinkClick = (event, key) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if(targetElement){
            targetElement.scrollIntoView({ behavior: 'smooth' });
            dispatch({
                type: 'MenuClose',
            })
            dispatch({
                type: 'ChangeItemAtivo',
                payload: key,
            })
        }
    };

    const clickMenu = () => {
        dispatch({
            type: 'MenuOpen'
        })
        dispatch({
            type: 'SettingsClose',
        })
    }

    const clickSettings = () => {
        dispatch({
            type: 'SettingsOpen',
        })
        dispatch({
            type: 'MenuClose',
        })
    }

    const updateWindowSize = () => {
        dispatch({
            type: 'ChangeWindowSize',
            payload: window.innerWidth,
        })
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            dispatch({
                type: 'ChangeWindowSize',
                payload: window.innerWidth,
            })
            window.addEventListener('resize', updateWindowSize);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen || settingOpen){
                if((menuRef.current && !menuRef.current.contains(event.target) && menuOpen) || (settingsRef.current && !settingsRef.current.contains(event.target) && settingOpen)){
                    dispatch({
                        type: 'SettingsClose',
                    })
                    dispatch({
                        type: 'MenuClose',
                    })
                }
            }
        };
    
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [menuOpen, settingOpen]);

    return(
        <nav className={style.navbar}>
            <span className={style.logo}>
                <p className={style.name}><span>&lt;</span> Renato Alves <span>/&gt;</span></p>
                <p className={style.function}>//{i18n.t('navbar.title')}</p>
            </span>
            {windowSize >= 1400 ? 
                <ul className={style.lista}>
                    {itens.map((item) => (
                        <li key={item.key} className={itemAtivo === item.key ? style.lista_ativo : style.lista_inativo}>
                            <a href={item.link} onClick={(event) => handleLinkClick(event, item.key)} className={itemAtivo === item.key ? style.ativo : style.inativo}>{item.value}</a>
                        </li>
                    ))}
                </ul>
            : 
                <>
                    <button className={style.menuButton} onClick={clickMenu}>
                        <HiMiniBars3 className={menuOpen ? style.menuOpen : style.menuClose}/>
                    </button>
                    {menuOpen && 
                        <div className={style.menu} ref={menuRef}>
                            <ul className={style.lista}>
                                {itens.map((item) => (
                                    <li key={item.key} className={itemAtivo === item.key ? style.lista_ativo : style.lista_inativo}>
                                        <a href={item.link} onClick={(event) => handleLinkClick(event, item.key)} className={itemAtivo === item.key ? style.ativo : style.inativo}>{item.value}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    }
                </>
            }
            <button className={style.settings} onClick={clickSettings}>
                <IoSettingsSharp className={settingOpen ? style.settingsOpen : style.settingsClose} />
            </button>
            {settingOpen &&
                <div className={style.settingsMenu} ref={settingsRef}>
                    <p className={style.titulo}>{i18n.t('navbar.config.title')}</p>
                    <ul>
                        <li>
                            <p>{i18n.t('navbar.config.lang')}:</p>
                            <label className={style.lang}>
                                <input type='checkbox' checked={enAtivo} onChange={() => {dispatch({type: 'ChangeLanguage'}); changeLanguage(enAtivo ? 'pt' : 'en')}} />
                                <span className={style.slider}></span>
                            </label>
                        </li>
                        <li>
                            <p>{i18n.t('navbar.config.dark')}:</p>
                            <label className={style.escuro}>
                                <input type='checkbox' checked={modoEscuro} onChange={() => dispatch({type: 'ChangeModoEscuro'})} />
                                <span className={style.slider}></span>
                            </label>
                        </li>
                    </ul>
                </div>
            }
        </nav>
    )
}