import Image from 'next/image';
import style from './../styles/css/Habilidades.module.css';
import { TbBrandRedux, TbBrandNextjs } from 'react-icons/tb';
import { FaReact, FaSass, FaNodeJs, FaGithub } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Habilidades({ i18n }){
    const dispatch = useDispatch();
    const { descricao, enAtivo, tecnologiaAtiva, statusTecnologiaAtiva, windowSize, tipoTecnologiaAtiva } = useSelector(rootReducer => rootReducer.useReducer)

    const tecnologias = [
        { key: 1, value: 'HTML', status: 'Unlocked', icone: <Image src='/images/html.png' height={65} width={60} />, text: 'html' },
        { key: 2, value: 'CSS', status: 'Unlocked', icone: <Image src='/images/css.png' height={65} width={60} />, text: 'css' },
        { key: 3, value: 'JavaScript', status: 'Unlocked', icone: <Image src='/images/js.png' height={60} width={60} />, text: 'js' },
        { key: 4, value: 'React', status: 'Unlocked', icone: <FaReact className={style.react} />, text: 'react' },
        { key: 5, value: 'Redux', status: 'Unlocked', icone: <TbBrandRedux className={style.redux} />, text: 'redux' },
        { key: 6, value: 'Next.js', status: 'Unlocked', icone: <TbBrandNextjs className={style.next} />, text: 'next' },
        { key: 7, value: 'Node.js', status: 'Locked', icone: <FaNodeJs className={style.node}/>, text: 'node' },
    ]

    const boosters = [
        { key: 8, value: 'Sass', status: 'Unlocked', icone: <FaSass className={style.sass} />, text: 'sass' },
        { key: 9, value: 'GitHub', status: 'Unlocked', icone: <FaGithub className={style.github} />, text: 'github' },
        { key: 10, value: 'UI design', status: 'Unlocked', icone: <Image src='/images/ui.png' width={60} height={60} />, text: 'ui' },
        { key: 11, value: 'UX design', status: 'Unlocked', icone: <Image src='/images/ux.png' width={60} height={60} />, text: 'ux' },
        { key: 12, value: 'MySQL', status: 'Locked', icone: <Image src='/images/mysql.png' height={60} width={60} />, text: 'mysql' },
        { key: 13, value: 'TypeScript', status: 'Locked', icone: <Image src='/images/ts.png' height={60} width={60} />, text: 'ts' },
        { key: 14, value: (enAtivo ? 'English' : 'Inglês'), status: 'Locked', icone: <Image src='/images/eua.png' width={60} height={60} />, text: 'ingles' },
    ]

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

    return(
        <section className={style.habilidades} id="habilidades">
            {windowSize > 1000 ?
                <>
                    <div className={style.tecnologias}>
                        <p className={style.title}>{i18n.t('habilidades.title')}</p>
                        <ul className={style.tecnologiasContainer}>
                            {tecnologias.map((tecnologia) => (
                                <li className={tecnologia.key === tecnologiaAtiva ? (tecnologia.status === 'Unlocked' ? style.ativoUnlocked : style.ativoLocked) : (tecnologia.status === 'Locked' ? style.inativoLocked : style.inativoUnlocked)} key={tecnologia.key} title={tecnologia.value} onClick={() => {dispatch({type: 'setDescricao', payload: tecnologia.text}); dispatch({type: 'ChangeDescricaoDefault', payload: false}); dispatch({type: 'setTecnologiaAtiva', payload: tecnologia.key}); dispatch({type: 'setStatusTecnologiaAtiva', payload: tecnologia.status}); dispatch({type: 'setTipoTecnologiaAtiva', payload: enAtivo ? 'Technologie' : 'Tecnologia'})}}>
                                    {tecnologia.icone}
                                </li>
                            ))}
                        </ul>
                        <div className={style.descricao}>
                            <p className={style.subtitle}>Descrição</p>
                            <p className={style.descricaoText}>{i18n.t(`habilidades.descricao.${descricao}`)}</p>
                            {tecnologiaAtiva !== 0 ?
                                <>
                                    <p className={statusTecnologiaAtiva === 'Unlocked' ? style.verde : style.vermelho}>
                                        <span>STATUS: </span>{statusTecnologiaAtiva}
                                    </p>
                                    {statusTecnologiaAtiva === 'Locked'?
                                        <p>{i18n.t('habilidades.emDesenvolvimento')}</p>
                                        : null
                                    }
                                </>
                                : null
                            }
                        </div>
                    </div>
                    <Image className={style.leon} src='/images/leon.png' width={400} height={800} />
                    <div className={style.boosters}>
                        <p className={style.title}>BOOSTERS</p>
                        <ul className={style.boostersContainer}>
                            {boosters.map((booster) => (
                                <li className={booster.key === tecnologiaAtiva ? (booster.status === 'Unlocked' ? style.ativoUnlocked : style.ativoLocked) : (booster.status === 'Locked' ? style.inativoLocked : style.inativoUnlocked)} key={booster.key} title={booster.value} onClick={() => {dispatch({type: 'setDescricao', payload: booster.text}); dispatch({type: 'ChangeDescricaoDefault', payload: false}); dispatch({type: 'setTecnologiaAtiva', payload: booster.key}); dispatch({type: 'setStatusTecnologiaAtiva', payload: booster.status}); dispatch({type: 'setTipoTecnologiaAtiva', payload: 'Booster'})}}>
                                    {booster.icone}
                                </li>
                            ))}
                        </ul>
                        <div className={style.infos}>
                            <p className={style.subtitle}>RENATO ALVES</p>
                            <div className={style.personagem}>
                                <p className={style.avatar}><span>Avatar:</span> Leon S. Kenedy | Resident Evil</p>
                                <p><span>{i18n.t('habilidades.level')}:</span> 999+</p>
                            </div>
                            <div className={style.nivelHabilidade}>
                                <div className={style.habilidadesText}>
                                    <p>UI design</p>
                                    <p>{i18n.t('habilidades.responsividade')}</p>
                                    <p>{i18n.t('habilidades.frameworks')}</p>
                                </div>
                                <div className={style.nivel}>
                                    <span><div className={style.ui}></div></span>
                                    <span><div className={style.responsividade}></div></span>
                                    <span><div className={style.frameworks}></div></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            : null
            }
            {windowSize <= 1000 ?
                <div className={style.geral}>
                    <p className={style.title}>{i18n.t('habilidades.title')} / BOOSTERS</p>
                    <div className={style.layout}>
                        <Image className={style.leon} src='/images/leon.png' width={300} height={600} />
                        <ul>
                            {tecnologias.map((tecnologia, index) => (
                                <li className={tecnologia.key === tecnologiaAtiva ? (tecnologia.status === 'Unlocked' ? style.ativoUnlocked : style.ativoLocked) : (tecnologia.status === 'Locked' ? style.inativoLocked : style.inativoUnlocked)} key={tecnologia.key} title={tecnologia.value} onClick={() => {dispatch({type: 'setDescricao', payload: tecnologia.text}); dispatch({type: 'ChangeDescricaoDefault', payload: false}); dispatch({type: 'setTecnologiaAtiva', payload: tecnologia.key}); dispatch({type: 'setStatusTecnologiaAtiva', payload: tecnologia.status}); dispatch({type: 'setTipoTecnologiaAtiva', payload: enAtivo ? 'Technologie' : 'Tecnologia'})}}>
                                    {tecnologia.icone}
                                </li>
                            ))}
                            {boosters.map((booster, index) => (
                                <li className={booster.key === tecnologiaAtiva ? (booster.status === 'Unlocked' ? style.ativoUnlocked : style.ativoLocked) : (booster.status === 'Locked' ? style.inativoLocked : style.inativoUnlocked)} key={booster.key} title={booster.value} onClick={() => {dispatch({type: 'setDescricao', payload: booster.text}); dispatch({type: 'ChangeDescricaoDefault', payload: false}); dispatch({type: 'setTecnologiaAtiva', payload: booster.key}); dispatch({type: 'setStatusTecnologiaAtiva', payload: booster.status}); dispatch({type: 'setTipoTecnologiaAtiva', payload: 'Booster'})}}>
                                    {booster.icone}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={style.descricao}>
                        <p className={style.subtitle}>Descrição</p>
                        <p className={style.descricaoText}>{i18n.t(`habilidades.descricao.${descricao}`)}</p>
                        {tecnologiaAtiva !== 0 ?
                            <>
                                <p className={style.tipo}><span>TIPO:</span> {tipoTecnologiaAtiva}</p>
                                <p className={statusTecnologiaAtiva === 'Unlocked' ? style.verde : style.vermelho}>
                                    <span>STATUS: </span>{statusTecnologiaAtiva}
                                </p>
                                {statusTecnologiaAtiva === 'Locked'?
                                    <p className={style.legenda}>{i18n.t('habilidades.emDesenvolvimento')}</p>
                                    : null
                                }
                            </>
                            : null
                        }
                    </div>
                    <div className={style.infos}>
                        <p className={style.subtitle}>RENATO ALVES</p>
                        <div className={style.personagem}>
                            <p className={style.avatar}><span>Avatar:</span> Leon S. Kenedy | Resident Evil</p>
                            <p><span>{i18n.t('habilidades.level')}:</span> 999+</p>
                        </div>
                        <div className={style.nivelHabilidade}>
                            <div className={style.habilidadesText}>
                                <p>UI design</p>
                                <p>{i18n.t('habilidades.responsividade')}</p>
                                <p>{i18n.t('habilidades.frameworks')}</p>
                            </div>
                            <div className={style.nivel}>
                                <span><div className={style.ui}></div></span>
                                <span><div className={style.responsividade}></div></span>
                                <span><div className={style.frameworks}></div></span>
                            </div>
                        </div>
                    </div>
                </div>
                :null
            }
        </section>
    );
}