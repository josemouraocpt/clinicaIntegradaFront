import { AtividadeForm } from "@/components/AtividadeForm"
import { ContainerAtividades } from "@/components/ContainerAtividades"

export default function AlterarAtividadeId(){
    return(
        <div className="min-h-screen">
            <ContainerAtividades/>
            <AtividadeForm/>
        </div>
    )
}