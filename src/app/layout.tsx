'use client';
import './globals.css';
import { Roboto } from 'next/font/google';
import { store } from "@/store";
import { Provider } from "react-redux";
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });


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
  );
}
