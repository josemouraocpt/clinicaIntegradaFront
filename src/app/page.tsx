import { AboutUs } from '@/components/AboutUs'
import Link from 'next/link'
import { MyButton } from '@/components/MyButton'
import { NavBar } from '@/components/NavBar'

export const metadata = {
  title: 'Clínica Integrada Unibh - HelthLab 4.0',
  description: 'Clínica Integrada Unibh - HelthLab 4.0',
		viewport: {
			width: 'device-width',
			initialScale: 1,
			maximumScale: 1
		}
}

export default function Home() {
	return (
		<>
			<NavBar/>
			<main>
				<div className='bg-banner bg-no-repeat bg-cover h-screen'>
					<div className='flex flex-col justify-center w-1/3 '>
						<h1 className='text-white text-6xl font-bold mb-24 self-center mt-80'>GENT 2.0</h1>
						<div className='self-center'>
							<Link href='https://blog.assopoc.org.br/' target='_blank' rel='noreferrer noopener'>
								<MyButton buttonText='Blog da Assopoc'/>
							</Link>
						</div>
					</div>
				</div>
				<AboutUs/>
			</main>
		</>
	)
}
