import { AtividadeCard } from "@/components/AtividadeCard";
import { ContainerAtividades } from "@/components/ContainerAtividades";
import { SetorInfo } from "@/components/SetorInfo";

export default function AlterarAtividade(){
	return(
		<div className="min-h-screen">
			<ContainerAtividades/>
			<SetorInfo setor="Atividades"/>
			<div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
				<h1>COMPONENTE DE PESQUISA</h1>
				<div className="grid grid-cols-2">
					<AtividadeCard btnText="Editar" path="/atividades/alterar/1"/>
					<AtividadeCard btnText="Editar" path="/atividades/alterar/1"/>
					<AtividadeCard btnText="Editar" path="/atividades/alterar/1"/>
					<AtividadeCard btnText="Editar" path="/atividades/alterar/1"/>
					<AtividadeCard btnText="Editar" path="/atividades/alterar/1"/>
					<AtividadeCard btnText="Editar" path="/atividades/alterar/1"/>
					<AtividadeCard btnText="Editar" path="/atividades/alterar/1"/>
				</div>
			</div>
		</div>
	)
}