import { ReactNode } from "react"

interface IInfoContainerProps{
	icon: React.ReactNode;
	title: string;
	itens: string[];
	title2: string;
	itens2: string[];
	icon2: React.ReactNode;
	title3: string;
	itens3: string[];
}

export function ContainerAbout( { icon, title, itens, title2, itens2, icon2, title3, itens3}: IInfoContainerProps ){
	return(
		<div className="w-fit bg-white rounded-3xl px-16 py-10 mb-16 border-0 border-solid border-bord shadow-md">
			<p className="text-center text-xl text-zinc-700 font-medium backdrop-blur-sm mx-96">Entre em contato conosco para saber como você pode fazer a<br></br>diferença na vida de nossos idosos ou para obter informações<br></br>sobre nossos programas e como contribuir. Sua ligação<br></br>ou mensagem é importante para nós. Juntos, tornamos a terceira<br></br>idade mais feliz e confortável!</p>	
			
			<div className="flex">	
				
				<div>
					<div>
						<h2 className="text-2xl mb-2 flex items-baseline"><span className="text-container">{icon}</span>{title}</h2>
						<ul className="text-info text-xl">
							{itens.map((item) => (
								<>
									<li key={item}>{item}</li>
								</>
							))}
						</ul>
					</div>
					<div className="mt-4">
						<h2 className="text-2xl mb-2">{title2}</h2>
						<ul className="text-info text-xl">
							{itens2?.map((item) => (
								<>
									<li key={item}>{item}</li>
								</>
							))}
						</ul>
					</div>
					<div className="mt-5">
						<h2 className="text-2xl flex items-baseline mb-2"><span className="text-container">{icon2}</span>{title3}</h2>
						<ul className="text-info text-2xl">
							{itens3?.map((item) => (
								<>
									<li key={item}>{item}</li>
								</>
							))}
						</ul>
					</div>
				</div>
				
				<form>
					<fieldset className="mt-5 ml-60 w-min">
					  <label for="usuario" className="absolute hidden">Usuario Nome</label>
						<input type="text" id="usuario" className="h-20 pl-7 pr-96 py-7 border-inp border-2 rounded placeholder:text-info placeholder:text-sm" placeholder="Usuário Nome"></input>
						
						<label for="emailUser" className="absolute hidden">Usuario E-mail</label>
						<input type="email" id="emailUser" className="mt-6 h-20 pl-7 pr-96 py-7 border-inp border-2 rounded placeholder:text-info placeholder:text-sm" placeholder="Usuário E-mail"></input>
						
						<label for="mensagem" className="absolute hidden">Escreva sua mensagem...</label>
						<input type="text" id="mensagem" className="mt-6 h-52 pl-7 pb-48 pr-96 py-7 border-inp border-2 rounded placeholder:text-info placeholder:text-sm" placeholder="Escreva sua mensagem..."></input>
					
					</fieldset>
				</form>
			</div>

			<div className="flex gap-3.5 justify-end">
				<button type="button" value="Voltar" className="w-28 h-12 bg-container text-white rounded-xl">Voltar</button>
				<button type="submit" value="Submit" className="w-28 h-12 bg-container text-white rounded-xl">Enviar</button>
			</div>
			
		</div>
	)
};