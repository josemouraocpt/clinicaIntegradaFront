import { ContainerProjeto } from "@/components/ContainerProjeto";
import { MyButton } from "@/components/MyButton";
import { ProjetoCard } from "@/components/ProjetoCard";
import { SetorInfo } from "@/components/SetorInfo";
import Link from "next/link";

export default function Projetos(){
	return(
		<div className="min-h-screen">
			<ContainerProjeto/>
			<SetorInfo setor="Projetos"/>
			<div className="mx-10 flex justify-end">
				<Link href="/projetos/cadastrar">
					<MyButton buttonText="Cadastrar"/>
				</Link>
			</div>
			<div className="m-10 grid grid-cols-3 gap-5 bg-white p-4 rounded-lg shadow-sm">
				<ProjetoCard id={1}/>
				<ProjetoCard id={1}/>
				<ProjetoCard id={1}/>
				<ProjetoCard id={1}/>
				<ProjetoCard id={1}/>
				<ProjetoCard id={1}/>
				<ProjetoCard id={1}/>
			</div>
		</div>
	)
};