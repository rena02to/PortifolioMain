'use client'
import { i18n } from './translate/i18n';
import HomePage from "@/components/Home";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home() {
  const [enAtivo, setEnAtivo] = useState(false);
  const [modoEscuro, setModoEscuro] = useState(false)

  return (
    <>
      <Navbar enAtivo={enAtivo} setEnAtivo={setEnAtivo} modoEscuro={modoEscuro} setModoEscuro={setModoEscuro} />
      <HomePage />
      <h1>{i18n.t('teste.app')}</h1>
    </>
  )
}
