import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CV FUMDIR',
  description: 'Alista tus documentos solicitados por el Talento Humano en FUMDIR',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <p className='items-center text-center md:pt-7'>
          © 2024 <a className='text-blue_button hover:text-blue_button_hover' target="_blank" href={`https://github.com/Alexhenao99`}> &#128049;Alexhenao99</a> | Todos los derechos reservados | <a className='text-blue_button hover:text-blue_button_hover' target="_blank" href={`https://fumdir.org`}> FUMDIR</a> 
        </p>
      </body>
    </html>
  )
}
