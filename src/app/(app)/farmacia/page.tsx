import { Actions } from "@/components/Actions";
import { Medicines } from "@/components/Medicines";
import { MyButton } from "@/components/MyButton";
import { PageInfoText } from "@/components/PageInfoText";
import { TbPill } from "react-icons/tb";

export default function Farmacia(){
	return(
		<div className="p-4 space-y-7 h-screen">
			<PageInfoText message="Você está na área da Farmácia"/>
			<Actions icon={<TbPill size={90}/>} title="Farmácia"/>
			<div>
				<h2 className="font-bold text-lg mb-5">
					Você deseja acessar: 
				</h2>
				<div className="flex justify-around">
					<MyButton buttonText="Medicamentos"/>
					<MyButton buttonText="Registros" styles="w-44"/>
					<MyButton buttonText="Fichas Médicas"/>
					<MyButton buttonText="Itens" styles="w-44"/>
					<MyButton buttonText="Cadatras Vacinas"/>
				</div>
				<div>
					<Medicines/>
				</div>
			</div>
		</div>
	)
};