import style from './../styles/css/ContateMe.module.css';
import { FaSquareGithub, FaLinkedin } from 'react-icons/fa6';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';

export default function ContateMe(){
    const initialValues = {
        name: '',
        email: '',
        assunto: '',
        conteudo: '',
    }

    const validationSchema = Yup.object().shape({
        name : Yup.string().min(3, 'O nome deve ter pelo menos 3 letras').required('O nome é obrigatório!').matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, 'Apenas letras são permitidas!'),
        email: Yup.string().email('Insira um endereço de e-mail válido!').required('O email é obrigatório!!'),
        assunto : Yup.string().min(5, 'O assunto deve ter pelo menos 5 letras').required('O assunto é obrigatório!'),
        conteudo : Yup.string().min(10, 'A mensagem deve ter pelo menos 10 letras').required('A mensagem é obrigatória!'),
    })

    return(
        <section className={style.contato} id="contato">
            <h2>Contate-me</h2>
            <span className={style.main}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} >
                    {({ errors }) =>(
                        <Form>
                            <h3>Me mande uma mensagem</h3>
                            <div className={style.inputBox}>
                                <Field id="name" name="name" type="text" required />
                                <label htmlFor="name">Seu nome e sobrenome</label>
                                {errors.name ? <div className={style.error}><p>{errors.name}</p></div> : null}
                            </div>
                            <div className={style.inputBox}>
                                <Field id="email" name="email" type="text" required/>
                                <label htmlFor="email">Seu e-mail</label>
                                {errors.email ? <div className={style.error}><p>{errors.email}</p></div> : null}
                            </div>
                            <div className={style.inputBox}>
                                <Field id="assunto" name="assunto" type="text" required/>
                                <label htmlFor="assunto">Assunto</label>
                                {errors.assunto ? <div className={style.error}><p>{errors.assunto}</p></div> : null}
                            </div>
                            <div className={style.inputBox}>
                                <Field id="conteudo" name="conteudo" as="textarea" required/>
                                <label htmlFor="conteudo">Sua mensagem...</label>
                                {errors.conteudo ? <div className={style.error}><p>{errors.conteudo}</p></div> : null}
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