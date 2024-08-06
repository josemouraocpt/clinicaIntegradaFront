import { ContainerFarmacia } from "@/components/ContainerFarmacia"
import { MyButton } from "@/components/MyButton"
import { SetorInfo } from "@/components/SetorInfo"
import Link from "next/link"


export default function Vacinas(){
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <div className="flex justify-between mr-4">
                <SetorInfo setor="Vacinas"/>
                <div className="flex space-x-2">
                    <Link href='/farmacia/vacinas/cadastrar'>
                        <MyButton buttonText='Cadastrar'/>
                    </Link>
                    <Link href='/farmacia/vacinas/lista'>
                        <MyButton buttonText='Verificar'/>
                    </Link>
                </div>              
            </div>
        </div>
    )
}