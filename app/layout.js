import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Renato Alves | Desenvolvedor Front-end',
  description: 'Site desenvolvido por Renato Alves, desenvolvedor front-end',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <link rel='icon' href='/images/favicon.png/' />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
