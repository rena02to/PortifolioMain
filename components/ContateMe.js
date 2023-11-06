'use client'
import style from './../styles/css/ContateMe.module.css';
import { FaSquareGithub, FaLinkedin } from 'react-icons/fa6';
import { Formik, ErrorMessage, Form, Field } from 'formik';
import * as Yup from 'yup';
import emailjs from 'emailjs-com';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function ContateMe({ i18n }){
    const dispatch = useDispatch();
    const { enviado, enviando, sendEmail } = useSelector(rootReducer => rootReducer.useReducer)

    const initialValues = {
        name: '',
        email: '',
        assunto: '',
        conteudo: '',
    }

    const validationSchema = Yup.object().shape({
        name : Yup.string().min(3, i18n.t('contato.error.message1')).required(i18n.t('contato.error.message2')).matches(/^[A-Za-zÀ-ÖØ-öø-ÿ ]+$/, i18n.t('contato.error.message3')),
        email: Yup.string().email(i18n.t('contato.error.message4')).required(i18n.t('contato.error.message5')),
        assunto : Yup.string().min(5, i18n.t('contato.error.message6')).required(i18n.t('contato.error.message7')),
        conteudo : Yup.string().min(10, i18n.t('contato.error.message8')).required(i18n.t('contato.error.message9')),
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
            <h2>{i18n.t('contato.title')}</h2>
            <span className={style.main}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={Enviar} >
                    {({ touched, setTouched }) =>(
                        <Form>
                            <h3>{i18n.t('contato.subtitle1')}</h3>
                            <div className={style.inputBox}>
                                <Field id="name" name="name" type="text" required />
                                <label htmlFor="name">{i18n.t('contato.input1')}</label>
                                <ErrorMessage name='name' component='div' className={style.errorMessage} />
                            </div>
                            <div className={style.inputBox}>
                                <Field id="email" name="email" type="text" required/>
                                <label htmlFor="email">{i18n.t('contato.input2')}</label>
                                <ErrorMessage name='email' component='div' className={style.errorMessage} />
                            </div>
                            <div className={style.inputBox}>
                                <Field id="assunto" name="assunto" type="text" required/>
                                <label htmlFor="assunto">{i18n.t('contato.input3')}</label>
                                <ErrorMessage name='assunto' component='div' className={style.errorMessage} />
                            </div>
                            <div className={style.inputBox}>
                                <Field id="conteudo" name="conteudo" as="textarea" required/>
                                <label htmlFor="conteudo">{i18n.t('contato.input4')}</label>
                                <ErrorMessage name='conteudo' component='div' className={style.errorMessage} />
                            </div>
                            <button type='submit'>{i18n.t('contato.submit')}</button>
                        </Form>
                    )}
                </Formik>
                <div className={style.links}>
                    <h3>{i18n.t('contato.subtitle2')}</h3>
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
                                <p>{i18n.t('contato.poupUp.enviando.mensagem1')}</p>
                                <p>{i18n.t('contato.poupUp.enviando.mensagem2')}</p>
                                <span className={style.loadingBar} />
                            </>
                            : 
                            <>
                                {enviado ? 
                                <>
                                    <p>{i18n.t('contato.poupUp.enviado.mensagem1')}</p>
                                    <p>{i18n.t('contato.poupUp.enviado.mensagem2')}</p>
                                </> : 
                                <>
                                    <p>{i18n.t('contato.poupUp.enviado.mensagem1')}</p>
                                    <p>{i18n.t('contato.poupUp.enviado.mensagem2')}</p>
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