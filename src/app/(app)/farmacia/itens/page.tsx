import { ContainerFarmacia } from "@/components/ContainerFarmacia"
import { SetorInfo } from "@/components/SetorInfo"

export default function Itens(){
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <SetorInfo setor="Itens"/>
            <h1>.</h1>
        </div>
    )
}
