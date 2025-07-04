import { MyButton } from "@/components/MyButton";
import Link from "next/link";
import { ContainerFarmacia } from "@/components/ContainerFarmacia";
 
export default function Farmacia(){
	return(
		<div className="p-4 min-h-screen">
			<ContainerFarmacia/>
			<div>
				<h2 className="font-bold text-lg mb-5 ml-10">
					Você deseja acessar: 
				</h2>
				<div className="flex justify-around">
					<Link href='/farmacia/medicamentos'>
						<MyButton buttonText='Medicamentos'/>
					</Link>
					<Link href='/farmacia/registros' >
						<MyButton buttonText='Registros'/>
					</Link>
					<Link href='/farmacia/fichas_medicas' >
						<MyButton buttonText='Fichas Médicas'/>
					</Link>
					<Link href='/farmacia/itens' >
						<MyButton  buttonText='Itens'/>
					</Link>
					<Link href='/farmacia/vacinas' >
						<MyButton buttonText='Vacinas'/>
					</Link>
				</div>
				
			</div>
		</div>
	)
};