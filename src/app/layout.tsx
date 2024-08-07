'use client';

import { NavBar } from '@/components/NavBar'
import './globals.css'
import { Roboto } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Provider } from 'react-redux'
import { store } from '@/store'

const roboto = Roboto({ subsets: ['latin'], weight: '400' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} bg-background`}>
        <Provider store={store}>
          <NavBar/>
            {children}
          <Footer/>
        </Provider>
			</body>
    </html>
  )
}
