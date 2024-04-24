import { MdLocationPin, MdCall } from "react-icons/md";
import { ContainerAbout } from "./ContainerAbout";

export function AboutUs() {
	return(
		<div className="mt-10">
				<ContainerAbout 
				icon={<MdLocationPin size={44} />} title="Onde Estamos" itens={["SEDE EM CRUCILÂNDIA", "Rua: São Vicente de Paula 175", "Vicentino - Crucilândia/MG"]} 
				title2="Escritório em Belo Horizonte" itens2={["	Rua Engenheiro Ocelo Cirino, 55", "Estoril - Belo Horizonte/MG"]} 
				icon2={<MdCall size={44} />} title3="Nossos Contatos" itens3={["E-mail:", "contato@assopoc.org.br", "Celular: (31) 98853-0144", "Telefone: (31) 3378-2107"]}
				/> 
		</div>
	)
}