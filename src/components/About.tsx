import { MdLocationPin, MdCall } from "react-icons/md";
import { ContainerAbout } from "./ContainerAbout";

export function AboutUs() {
	return(
		<div className="flex justify-evenly text-white p-5">
				<ContainerAbout icon={<MdLocationPin size={44} />} title="Ondes Estamos" itens={["SEDE EM CRUCILÂNDIA", "Rua: São Vicente de Paula 175", "Vicentino - Crucilândia/MG"]}/>
				<ContainerAbout icon={<MdCall size={44} />} title="Escritório em Belo Horizonte" itens={["	Rua Engenheiro Ocelo Cirino, 55", "Estoril - Belo Horizonte/MG"]}/> 
				<ContainerAbout icon={<MdCall size={44} />} title="Nossos Contatos" itens={["E-mail: contato@assopoc.org.br", "Celular: (31) 98853-0144", "Telefone: (31) 3378-2107"]}/>
		</div>
	)
}