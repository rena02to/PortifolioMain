import style from './../styles/css/Footer.module.css';

export default function Footer({ i18n }){
    return(
        <footer className={style.footer}>
            <p>Renato Alves | {i18n.t('navbar.title')} &copy; 2023</p>
            <a target='_blank' rel='noopener noreferer' href='https://github.com/rena02to/PortifolioMain'>{i18n.t('footer.link')}</a>
        </footer>
    );
}