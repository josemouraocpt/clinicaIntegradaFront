import './globals.css';
import { Roboto } from 'next/font/google';
import { Footer } from '@/components/Footer';
const roboto = Roboto({ subsets: ['latin'], weight: '400' });

export default function RootLayout({ children }: { children: React.ReactNode}) {
  return (
    <html lang="pt-br">
      <body className={`${roboto.className} bg-background`}>
          {children}
        <Footer/> 
      </body>
    </html>
  );
}