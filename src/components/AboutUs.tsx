import { MdLocationPin, MdCall } from "react-icons/md";
import { InfoContainer } from "./InfoContainer";

export function AboutUs() {
	return(
		<div className="flex flex-row justify-around bg-gradient text-white p-5">
				<InfoContainer icon={<MdLocationPin size={44} />} title="Ondes Estamos" itens={["SEDE EM CRUCILÂNDIA", "Rua: São Vicente de Paula 175", "Vicentino - Crucilândia/MG"]}/>
				<InfoContainer icon={<MdCall size={44} className="mt-2" />} title="Escritório em Belo Horizonte" itens={["	Rua Engenheiro Ocelo Cirino, 55", "Estoril - Belo Horizonte/MG"]}/> 
				<InfoContainer icon={<MdCall size={44} />} title="Nossos Contatos" itens={["E-mail: contato@assopoc.org.br", "Celular: (31) 98853-0144", "Telefone: (31) 3378-2107"]}/>
		</div>
	)
}