'use client';
import './globals.css';
import { Roboto } from 'next/font/google';
import dynamic from 'next/dynamic';
import Spinner from '@/components/Spinner';
import { useEffect, useState } from 'react';

const roboto = Roboto({ subsets: ['latin'], weight: '400' });

const DynamicProvider = dynamic(() => import('@/components/ProviderComponent'), {
  ssr: false,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer); 
  }, []);

  return (
    <html lang="pt-br">
      <body className={`${roboto.className} bg-background`}>
        {isLoading ? <Spinner /> : <DynamicProvider>{children}</DynamicProvider>}
      </body>
    </html>
  );
}
