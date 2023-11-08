'use client'
import { useEffect, useRef } from 'react';
import { HiMiniBars3 } from 'react-icons/hi2';
import { IoSettingsSharp } from 'react-icons/io5';
import style from '../styles/css/Navbar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IoHome, IoGameControllerSharp } from 'react-icons/io5';
import { HiSquaresPlus } from 'react-icons/hi2';
import { BsInfoCircleFill } from 'react-icons/bs';
import { RiContactsBookFill } from 'react-icons/ri';

export default function Navbar({ i18n, changeLanguage }){
    const dispatch = useDispatch();
    const { enAtivo, modoEscuro, itemAtivo, windowSize, menuOpen, settingOpen } = useSelector(rootReducer => rootReducer.useReducer);
    const menuRef = useRef(null);
    const settingsRef = useRef(null);
    
    const itens = [
        {key:1, value:'Home', link:'#home', icon: <IoHome />},
        {key:2,value: i18n.t('navbar.item2'), link:'#projetos', icon: <HiSquaresPlus />},
        {key:3,value: i18n.t('navbar.item3'), link:'#sobre', icon: <BsInfoCircleFill />},
        {key:4, value: i18n.t('navbar.item4'),link:'#habilidades', icon: <IoGameControllerSharp />},
        {key:5, value: i18n.t('navbar.item5'), link:'#contato', icon: <RiContactsBookFill />},
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

    useEffect(() => {
        const checkVisibility = () => {
            const sections = document.querySelectorAll('section');
            let sectionAtiva = '';
            sections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100) {
                    sectionAtiva = section.id;
                }
            });
            
            let key;
            switch (sectionAtiva){
                case 'home':
                    key = 1;
                    break;
                case 'projetos':
                    key = 2;
                    break;
                case 'sobre':
                    key = 3;
                    break;
                case 'habilidades':
                    key = 4;
                    break;
                case 'contato':
                    key = 5;
                    break;
                default:
                    break;
            }
            dispatch({type: 'ChangeItemAtivo', payload: key});
        }
        checkVisibility();
        window.addEventListener('scroll', checkVisibility);
        return() => {
            window.removeEventListener('scroll', checkVisibility);
        }
    }, [])

    return(
        <nav className={style.navbar}>
            <span className={style.logo}>
                <p className={style.name}><span>&lt;</span> Renato Alves <span>/&gt;</span></p>
                <p className={style.function}>//{i18n.t('navbar.title')}</p>
            </span>
            {windowSize >= 600 ? 
                <ul className={style.lista}>
                    {itens.map((item) => (
                        <li key={item.key} className={itemAtivo === item.key ? style.lista_ativo : style.lista_inativo} title={item.value}>
                            <a href={item.link} onClick={(event) => handleLinkClick(event, item.key)} className={itemAtivo === item.key ? style.ativo : style.inativo}>{item.icon}</a>
                        </li>
                    ))}
                </ul>
            : 
                <>
                    <div className={style.containerMenu}>
                        <button className={style.menuButton} onClick={clickMenu}>
                            <HiMiniBars3 className={menuOpen ? style.menuOpen : style.menuClose}/>
                        </button>
                        {menuOpen && 
                            <div className={style.menu} ref={menuRef}>
                                <ul className={style.lista}>
                                    {itens.map((item) => (
                                        <li key={item.key} className={itemAtivo === item.key ? style.lista_ativo : style.lista_inativo} title={item.value}>
                                            <a href={item.link} onClick={(event) => handleLinkClick(event, item.key)} className={itemAtivo === item.key ? style.ativo : style.inativo}>{item.icon}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    </div>
                </>
            }
            <div className={style.containerSettings}>
                <button className={style.settings} onClick={clickSettings} title={i18n.t('navbar.config.title')}>
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
            </div>
        </nav>
    )
}