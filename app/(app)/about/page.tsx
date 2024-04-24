import { AboutUs } from '@/components/About'

export default function About(){
	return(
		<div className="mt-10 flex flex-col align-center">
			<div className="m-auto">
				<h1 className="text-container text-4xl font-medium ml-20">Entre em Contato Conosco!</h1>
			</div>
			<div className='m-auto'>
				<AboutUs/>
			</div>
		</div>
	)
}