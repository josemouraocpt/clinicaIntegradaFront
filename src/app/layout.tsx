import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Clínica Integrada Unibh - HelthLab 4.0',
  description: 'Clínica Integrada Unibh - HelthLab 4.0',
		viewport: {
			with: 'device-width',
			initialScale: 1,
			maximumScale: 1
		}
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
							{children}
						</body>
    </html>
  )
}
