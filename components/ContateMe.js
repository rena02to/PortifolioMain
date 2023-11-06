'use client'
import style from './../styles/css/ContateMe.module.css';
import { FaSquareGithub, FaLinkedin } from 'react-icons/fa6';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ContateMe(){
    const dispatch = useDispatch();
    const { enviado, enviando, sendEmail} = useSelector(rootReducer => rootReducer.useReducer)

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

    const FecharPoupUp = () => {
        document.body.classList.remove(style.abrirPoupUp);
        dispatch({type: 'SendEmail'});
    }

    const Enviar = (values, { setTouched }) => {
        const serviceId = 'gmail_rena0to';
        const templateId = 'template_wz4rv4k';
        const userId = 'eviXOsPjXHdpw_97H';

        const emailData = {
            from_name: values.name,
            from_email: values.email,
            subject: values.assunto,
            message: values.conteudo,
        }

        emailjs.send(serviceId, templateId, emailData, userId)
            .then((response) => {
                values.name = '';
                values.email = '';
                values.assunto = '';
                values.conteudo = '';
                dispatch({
                    type: 'Enviado',
                    payload: true,
                })
                setTouched({ name: false, email: false, assunto: false, conteudo: false });
            })
        .catch((error) => {
            dispatch({
                type: 'Enviado',
                payload: false,
            })
        })

        document.body.classList.add(style.abrirPoupUp);
        dispatch({type: 'SendEmail',});
        dispatch({type: 'Enviando'});
    }

    useEffect(() => {
        if (enviando) {
          setTimeout(() => {
            dispatch({type: 'Enviando'});
          }, 3500);
        }
    }, [enviando]);

    return(
        <section className={style.contato} id="contato">
            <h2>Contate-me</h2>
            <span className={style.main}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={Enviar} >
                    {({ touched, setTouched }) =>(
                        <Form>
                            <h3>Me mande uma mensagem</h3>
                            <div className={style.inputBox}>
                                <Field id="name" name="name" type="text" required />
                                <label htmlFor="name">Seu nome e sobrenome</label>
                                <ErrorMessage name='name' component='div' className={style.errorMessage} />
                            </div>
                            <div className={style.inputBox}>
                                <Field id="email" name="email" type="text" required/>
                                <label htmlFor="email">Seu e-mail</label>
                                <ErrorMessage name='email' component='div' className={style.errorMessage} />
                            </div>
                            <div className={style.inputBox}>
                                <Field id="assunto" name="assunto" type="text" required/>
                                <label htmlFor="assunto">Assunto</label>
                                <ErrorMessage name='assunto' component='div' className={style.errorMessage} />
                            </div>
                            <div className={style.inputBox}>
                                <Field id="conteudo" name="conteudo" as="textarea" required/>
                                <label htmlFor="conteudo">Sua mensagem...</label>
                                <ErrorMessage name='conteudo' component='div' className={style.errorMessage} />
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
            {sendEmail ? 
                <div className={style.mainPoupUp}>
                    <div className={style.poupUpEmail}>
                        {enviando ? 
                            <>
                                <p>Aguarde,</p>
                                <p>sua mensagem está sendo enviada...</p>
                                <span className={style.loadingBar} />
                            </>
                            : 
                            <>
                                {enviado ? 
                                <>
                                    <p>Mensagem enviada com sucesso!</p>
                                    <p>Te respondo o mais breve possível!</p>
                                </> : 
                                <>
                                    <p>Erro ao enviar mensagem!</p>
                                    <p>Tente novamente...</p>
                                </>
                                }
                                <button type='button' onClick={FecharPoupUp}>Ok!</button>
                            </>
                        }
                    </div>
                </div>
                : null
            }
        </section>
    );
}