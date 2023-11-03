'use client'
import { useState, useEffect, useRef } from 'react';
import { HiMiniBars3 } from 'react-icons/hi2';
import { IoSettingsSharp } from 'react-icons/io5';
import style from '../styles/css/Navbar.module.css';

export default function Navbar(){
    const [itemAtivo, setItemAtivo] = useState(1);
    const [windowSize, setWindowSize] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);
    const [settingOpen, setSettingOpen] = useState(false);
    const menuRef = useRef(null);
    const settingsRef = useRef(null);
    const itens = [
        {key:1, value:'Home', link:'#home'},
        {key:2,value:'Projetos', link:'#projetos'},
        {key:3, value:'Sobre Mim', link:'#sobre'},
        {key:4, value:'Habilidades',link:'#habilidades'},
        {key:5, value:'Experiências', link:'#experiencias'},
        {key:6, value:'Contate-me', link:'#contato'},
    ]


    const handleLinkClick = (event, key) => {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if(targetElement){
            targetElement.scrollIntoView({ behavior: 'smooth' });
            setMenuOpen(false);
            setItemAtivo(key);
        }
    };

    const clickMenu = () => {
        setSettingOpen(false);
        setMenuOpen(!menuOpen);
    }

    const clickSettings = () => {
        setMenuOpen(false)
        setSettingOpen(!settingOpen);
    }

    const updateWindowSize = () => {
        setWindowSize(window.innerWidth);
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWindowSize(window.innerWidth);
            window.addEventListener('resize', updateWindowSize);
        }
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuOpen || settingOpen){
                if((menuRef.current && !menuRef.current.contains(event.target) && menuOpen) || (settingsRef.current && !settingsRef.current.contains(event.target) && settingOpen)){
                    setMenuOpen(false);
                    setSettingOpen(false);
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
                <p className={style.function}>//Desenvolvedor Front-end</p>
            </span>
            {windowSize >= 1400 ? 
                <ul className={style.lista}>
                    {itens.map((item) => (
                        <li key={item.key}>
                            <a href={item.link} onClick={(event) => handleLinkClick(event, item.key)} className={itemAtivo === item.key && style.ativo}>{item.value}</a>
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
                                        <a href={item.link} onClick={(event) => handleLinkClick(event, item.key)} className={itemAtivo === item.key && style.ativo}>{item.value}</a>
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
                    <p className={style.titulo}>Configurações</p>
                    <ul>
                        <li>
                            <p>Linguagem:</p>
                            <label className={style.lang}>
                                <input type='checkbox' />
                                <span className={style.slider}></span>
                            </label>
                        </li>
                        <li>
                            <p>Modo escuro:</p>
                            <label className={style.escuro}>
                                <input type='checkbox' />
                                <span className={style.slider}></span>
                            </label>
                        </li>
                    </ul>
                </div>
            }
        </nav>
    )
}