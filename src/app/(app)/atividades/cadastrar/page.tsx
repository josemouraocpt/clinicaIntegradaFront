import { AtividadeForm } from "@/components/AtividadeForm";
import { ContainerAtividades } from "@/components/ContainerAtividades";

export default function CadastrarAtividade(){
	return(
		<div className="min-h-screen">
			<ContainerAtividades/>
			<AtividadeForm/>
		</div>
	)
}