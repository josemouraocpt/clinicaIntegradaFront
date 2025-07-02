import { AtividadeForm } from "@/components/AtividadeForm";
import { ContainerAtividades } from "@/components/ContainerAtividades";
import { SetorInfo } from "@/components/SetorInfo";

export default function CadastrarAtividade(){
	return(
		<div className="min-h-screen">
			<ContainerAtividades/>
			<SetorInfo setor="Atividades"/>
			<AtividadeForm action="CRIAR"/>
		</div>
	)
}