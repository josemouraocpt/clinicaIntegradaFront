import { ContainerHospedes } from "@/components/ContainerHospedes";
import { HospedeFormEdit } from "@/components/HospedeFormEdit";
import { MyButton } from "@/components/MyButton";
import Link from "next/link";

export default function Cadastro(){
	return(
		<div className="p-4 space-y-5 min-h-screen">
			<ContainerHospedes/>
			<div>
				<h2 className="text-lg font-bold mt-5 mx-10">Dados do hospede</h2>
			</div>
			<div>
				<HospedeFormEdit/>
			</div>
		</div>
	)
};