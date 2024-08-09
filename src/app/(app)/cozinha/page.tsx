import { ContainerCozinha } from "@/components/ContainerCozinha";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import Link from "next/link";

export default function Cozinha(){
	return(
		<div className="min-h-screen">
			<ContainerCozinha/>
			<div className="flex justify-between mr-4">
				<SetorInfo setor="Cozinha"/>
				<div className="flex space-x-2">
                    <Link href='/cozinha/cardapios/padrao'>
                        <MyButton buttonText='Cardápio Padrão'/>
                    </Link>
					<Link href='/cozinha/cardapios/especial'>
                        <MyButton buttonText='Cardápio Especial'/>
                    </Link>
                    <Link href='/cozinha/estoque'>
                        <MyButton buttonText='Estoque'/>
                    </Link>
                </div>  
			</div>
		</div>
	)
};