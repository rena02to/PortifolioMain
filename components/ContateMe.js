import style from './../styles/css/ContateMe.module.css';
import { FaSquareGithub, FaLinkedin } from 'react-icons/fa6';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function ContateMe(){
    return(
        <section className={style.contato} id="contato">
            <h2>Contate-me</h2>
            <span className={style.main}>
                <Formik>
                    {() =>(
                        <Form>
                            <h3>Me mande uma mensagem</h3>
                            <div className={style.inputBox}>
                                <Field id="name" name="name" type="text" required />
                                <label htmlFor="name">Seu nome e sobrenome</label>
                            </div>
                            <div className={style.inputBox}>
                                <Field id="email" name="email" type="text" required/>
                                <label htmlFor="email">Seu e-mail</label>
                            </div>
                            <div className={style.inputBox}>
                                <Field id="assunto" name="assunto" type="text" required/>
                                <label htmlFor="assunto">Assunto</label>
                            </div>
                            <div className={style.inputBox}>
                                <Field id="conteudo" name="conteudo" as="textarea" required/>
                                <label htmlFor="conteudo">Sua mensagem...</label>
                            </div>
                            <button type='submit'>Enviar</button>
                        </Form>
                    )}
                </Formik>
                <div className={style.links}>
                    <h3>Ou me adicione nas redes sociais</h3>
                    <a href='https://linkedin.com/in/rena02to' className={style.linkedin}>
                        <FaLinkedin />
                        <p>/in/rena02to/</p>
                    </a>
                    <a href='https://github.com/rena02to' className={style.github}>
                        <FaSquareGithub />
                        <p>/rena02to/</p>
                    </a>
                </div>
            </span>
        </section>
    );
}