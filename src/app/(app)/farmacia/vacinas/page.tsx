import { ContainerFarmacia } from "@/components/ContainerFarmacia"
import { MyButton } from "@/components/MyButton"
import Link from "next/link"


export default function Vacinas(){
    return(
        <div>
            <ContainerFarmacia/>
            <div >
				<h2 className="font-bold text-lg mb-5 ">
					    Você está no setor de: <span className="text-red-500">Vacinas</span>
                </h2>
                <div className="text-center">
                    <Link href='/farmacia/vacinas/cadastrar'>
                        <MyButton buttonText='Cadastrar'/>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}