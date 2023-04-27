import AboutUs from '@/components/AboutUs'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
			<main>
				<h1>Conteudo Principal</h1>
				<AboutUs/>
		</main>
  )
}
