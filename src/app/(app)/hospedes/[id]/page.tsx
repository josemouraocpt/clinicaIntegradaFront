import { ContainerHospedes } from "@/components/ContainerHospedes";
import { HospedeForm } from "@/components/HospedeForm";

export default function Cadastro(){
	return(
		<div className="p-4 space-y-5 min-h-screen">
			<ContainerHospedes/>
			<div>
				<h2 className="text-lg font-bold mt-5 mx-10">Dados do hospede</h2>
			</div>
			<div>
				<HospedeForm action="EDITAR"/>
			</div>
		</div>
	)
};