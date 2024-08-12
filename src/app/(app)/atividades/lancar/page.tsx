import { AtividadeCard } from "@/components/AtividadeCard";
import { ContainerAtividades } from "@/components/ContainerAtividades";

export default function LancarPresenca(){
	return(
		<div className="min-h-screen">
			<ContainerAtividades/>
			<div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
				<h1>COMPONENTE DE PESQUISA</h1>
				<div className="grid grid-cols-2">
					<AtividadeCard btnText="Lançar" path="/atividades/lancar/1"/>
					<AtividadeCard btnText="Lançar" path="/atividades/lancar/1"/>
					<AtividadeCard btnText="Lançar" path="/atividades/lancar/1"/>
					<AtividadeCard btnText="Lançar" path="/atividades/lancar/1"/>
					<AtividadeCard btnText="Lançar" path="/atividades/lancar/1"/>
					<AtividadeCard btnText="Lançar" path="/atividades/lancar/1"/>
					<AtividadeCard btnText="Lançar" path="/atividades/lancar/1"/>
				</div>
			</div>
		</div>
	)
}