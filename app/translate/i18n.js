import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { messages } from './languages';

i18n.use(initReactI18next).init({
    debug:false,
    defaultNS: ['translations'],
    fallbackLng: 'pt',
    ns: ['translations'],
    resources: messages
})

export { i18n }