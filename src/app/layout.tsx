'use client';
import './globals.css';
import { Roboto } from 'next/font/google';
// import { store } from "@/store";
// import { Provider } from "react-redux";
// import { NavBar } from '@/components/NavBar';
// import { Footer } from '@/components/Footer';
import { lazy, Suspense } from 'react';
import Spinner from '../components/Spinner';
import dynamic from 'next/dynamic';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });
const DynamicProvider = dynamic(() => import('../components/LazyComponent'), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} bg-background`}>
        <Suspense fallback={<Spinner/>}>
          <DynamicProvider children={children}/>
        </Suspense>
      </body>
    </html>
  );
}