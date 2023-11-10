import Image from 'next/image';
import style from './../styles/css/Habilidades.module.css';
import { TbBrandRedux, TbBrandNextjs } from 'react-icons/tb';
import { FaReact, FaSass, FaNodeJs } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';

export default function Habilidades({ i18n }){
    const dispatch = useDispatch();
    const { descricao, enAtivo } = useSelector(rootReducer => rootReducer.useReducer)


    const tecnologias = [
        { key: 1, value: 'HTML', status: 'unlocked', icone: <Image src='/images/html.png' height={65} width={60} />, text: 'html' },
        { key: 2, value: 'CSS', status: 'unlocked', icone: <Image src='/images/css.png' height={65} width={60} />, text: 'css' },
        { key: 3, value: 'JavaScript', status: 'unlocked', icone: <Image src='/images/js.png' height={60} width={60} />, text: 'js' },
        { key: 4, value: 'React', status: 'unlocked', icone: <FaReact className={style.react} />, text: 'react' },
        { key: 5, value: 'Redux', status: 'unclocked', icone: <TbBrandRedux className={style.redux} />, text: 'redux' },
        { key: 6, value: 'Next.js', status: 'unlocked', icone: <TbBrandNextjs className={style.next} />, text: 'next' },
        { key: 7, value: 'Node.js', status: 'locked', icone: <FaNodeJs className={style.node}/>, text: 'node' },
    ]

    const boosters = [
        { key: 1, value: 'Sass', status: 'unlocked', icone: <FaSass className={style.sass} />, text: 'sass' },
        { key: 2, value: 'GitHub', status: 'unlocked', icone: <Image src='/images/github.png' height={60} width={60} />, text: 'github' },
        { key: 3, value: 'UI design', status: 'unlocked', icone: <Image src='/images/ui.png' width={60} height={60} />, text: 'ui' },
        { key: 4, value: 'UX design', status: 'unlocked', icone: <Image src='/images/ux.png' width={60} height={60} />, text: 'ux' },
        { key: 5, value: 'MySQL', status: 'locked', icone: <Image src='/images/mysql.png' height={60} width={60} />, text: 'mysql' },
        { key: 6, value: 'TypeScript', status: 'locked', icone: <Image src='/images/ts.png' height={60} width={60} />, text: 'ts' },
        { key: 7, value: (enAtivo ? 'English' : 'Inglês'), status: 'locked', icone: <Image src='/images/eua.png' width={60} height={60} />, text: 'ingles' },
    ]

    return(
        <section className={style.habilidades} id="habilidades">
            <div className={style.tecnologias}>
                <p className={style.title}>{i18n.t('habilidades.title')}</p>
                <ul className={style.tecnologiasContainer}>
                    {tecnologias.map((tecnologia) => (
                        <li key={tecnologia.key} title={tecnologia.value} onClick={() => {dispatch({type: 'setDescricao', payload: tecnologia.text}); dispatch({type: 'ChangeDescricaoDefault', payload: false})}}>
                            {tecnologia.icone}
                        </li>
                    ))}
                </ul>
                <div className={style.descricao}>
                    <p className={style.subtitle}>Descrição</p>
                    <p>{i18n.t(`habilidades.descricao.${descricao}`)}</p>
                </div>
            </div>
            <Image src='/images/leon.png' width={400} height={800} />
            <div className={style.boosters}>
                <p className={style.title}>BOOSTERS</p>
                <ul className={style.boostersContainer}>
                    {boosters.map((booster) => (
                        <li key={booster.key} title={booster.value} onClick={() => {dispatch({type: 'setDescricao', payload: booster.text}); dispatch({type: 'ChangeDescricaoDefault', payload: false})}}>
                            {booster.icone}
                        </li>
                    ))}
                </ul>
                <div className={style.infos}>
                    <p className={style.subtitle}>RENATO ALVES</p>
                    <div className={style.personagem}>
                        <p><span>Avatar:</span> Leon S. Kenedy | Resident Evil</p>
                        <p><span>{i18n.t('habilidades.level')}:</span> 999+</p>
                    </div>
                    <div className={style.nivelHabilidade}>
                        <div className={style.habilidades}>
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
        </section>
    );
}