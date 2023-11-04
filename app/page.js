'use client'
import { Provider } from 'react-redux';
import { useTranslation } from 'react-i18next';
import store from './../redux/store';
import { i18n } from './translate/i18n';
import HomePage from "@/components/Home";
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';
import ContateMe from '@/components/ContateMe';

export default function Home() {
  const{ t, i18n: {changeLanguage, Language} } = useTranslation();

  return (
    <>
      <Provider store={store}>
        <Navbar i18n={i18n} changeLanguage={changeLanguage} />
        <main>
          <HomePage i18n={i18n} />
          <ContateMe i18n={i18n} />
        </main>
        <Footer i18n={i18n} />
      </Provider>
    </>
  )
}