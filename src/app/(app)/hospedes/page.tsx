import { ContainerHospedes } from "@/components/ContainerHospedes";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import Link from "next/link";

export default function Hospedes(){
	return(
		<div className="min-h-screen">
			<ContainerHospedes/>
			<div className="flex justify-between mr-4">
				<SetorInfo setor="Hóspede"/>
				<div className="flex space-x-2">
					<Link href='/hospedes/lista'>
                        <MyButton buttonText='Ver hóspedes'/>
                    </Link>
				</div>
			</div>
		</div>
	)
};
