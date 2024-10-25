import { AtividadeForm } from "@/components/AtividadeForm"
import { ContainerAtividades } from "@/components/ContainerAtividades"
import { SetorInfo } from "@/components/SetorInfo"

export default function AlterarAtividadeId(){
    return(
        <div className="min-h-screen">
            <ContainerAtividades/>
            <SetorInfo setor="Atividades"/>
            <AtividadeForm action="EDITAR"/>
        </div>
    )
}