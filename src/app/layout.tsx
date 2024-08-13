'use client';
import './globals.css';
import { Roboto } from 'next/font/google';
import dynamic from 'next/dynamic';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

const DynamicProvider = dynamic(() => import('@/components/ProviderComponent'), { ssr: false, loading: () => <p>Carregando...</p> })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} bg-background`}>
        <DynamicProvider children={children}/>
			</body>
    </html>
  )
}
