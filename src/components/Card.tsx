import { MdPermIdentity } from "react-icons/md";
import { MyButton } from "./MyButton";

export function Card(){
	return(
		<div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md">
			<div className="flex space-x-5">
				<div>
					<MdPermIdentity size={96}/>
				</div>
				<div className="flex flex-col">
					<h3 className="font-bold">02ED4# <span className="text-button">LAUANA APARECIDA</span></h3>
					<ul className="columns-2">
						<li>Dia de entrada: 00/00/0000</li>
						<li>Idade: 00</li>
						<li>Nível de dependencia: --</li>
						<li>Leito: --</li>
						<li>Nº Quarto: --</li>
						<li>Responsavel: --</li>
					</ul>
				</div>
			</div>
				<div className="flex justify-end">
					<MyButton buttonText="Ver mais"/>
				</div>
		</div>
	)
};