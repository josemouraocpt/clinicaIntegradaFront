import AboutUs from '@/components/AboutUs'
import { Roboto } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import banner from '../../public/images/banner.png'
import MyButton from '@/components/MyButton'

const roboto = Roboto({ subsets: ['latin'], weight: '400' })

export default function Home() {
  return (
			<main>
				<div className='bg-banner h-screen'>
					<div className='flex flex-col justify-center w-1/3 '>
						<h1 className='text-white text-6xl font-bold mb-24 self-center mt-44'>GENT 2.0</h1>
						<div className='self-center'>
							<Link href='#'>
								<MyButton buttonText='Blog da Assopoc'/>
							</Link>
						</div>
					</div>
				</div>
				<AboutUs/>
		</main>
  )
}
