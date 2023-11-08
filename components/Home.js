'use client'
import { FaSquareGithub, FaLinkedin } from 'react-icons/fa6';
import { BiSolidHelpCircle } from 'react-icons/bi';
import style from '../styles/css/Home.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

export default function HomePage({ i18n }){
    const dispatch = useDispatch();
    const { helpOpen } = useSelector(rootReducer => rootReducer.useReducer);

    const func = (i18n.t('navbar.title')).toUpperCase();
    const dataInicio = new Date('2022-05-14');
    const dataAtual = new Date();
    const idade = dataAtual.getMonth() + 1 >= 9 ? dataAtual.getFullYear() - 2002 : dataAtual.getFullYear() - 2002 - 1;
    const days = Math.ceil((dataAtual - dataInicio)/(1000 * 60 *60 * 24)) - 1;
    const elementos = [
        {key: 1, title: 'Exp na função (dias)', value: `${days} XP`, caminho: '/images/exp.png', style: style.cogumelo},
        {key: 2, title: 'Projetos', value: 5, caminho: '/images/headshot.png', style: style.headshot},
        {key: 3, title: 'Pontos de vida', value: idade, caminho: '/images/1Up.png', style: style.exp},
    ]

    return(
        <section className={style.home} id="home">
            <div className={style.foto} />
            <div className={style.geral}>
                <div className={style.title}>
                    <h1>RENATO ALVES,</h1>
                    <h1>{func}</h1>
                </div>
                <ul className={style.conteudo}>
                    {elementos.map((elemento) => (
                        <li key={elemento.key}>
                            <p className={style.titulo}>{elemento.title}</p>
                            <div className={style.legenda}>
                                <Image className={elemento.style} src={elemento.caminho} width={40} height={40}/>
                                <p className={style.value}>{elemento.value}</p>
                            </div>
                        </li>
                    ))}
                    <BiSolidHelpCircle onMouseEnter={() => (dispatch({type: 'HelpOpen', payload: true}))} onMouseLeave={() => (dispatch({type: 'HelpOpen', payload: false}))} />
                    {helpOpen ? <p>Teste</p> : null}
                </ul>
                <ul className={style.icones}>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href='https://github.com/rena02to/'><FaSquareGithub /></a>
                    </li>
                    <li>
                        <a target="_blank" rel="noopener noreferrer" href='https://linkedin.com/in/rena02to/'><FaLinkedin /></a>
                    </li>
                </ul>
            </div>
        </section>
    )
}