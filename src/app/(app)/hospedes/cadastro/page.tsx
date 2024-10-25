import { ContainerHospedes } from "@/components/ContainerHospedes";
import { HospedeForm } from "@/components/HospedeForm";

export default function Cadastro(){
	return(
		<div className="p-4 space-y-5 min-h-screen">
			<ContainerHospedes/>
			<div className="mx-10">
				<h2 className="text-lg font-bold mt-5">Cadastro de hospede</h2>
				<p className="text-sm">Informe os dados</p>
			</div>
			<div>
				<HospedeForm action="CRIAR"/>
			</div>
		</div>
	)
};