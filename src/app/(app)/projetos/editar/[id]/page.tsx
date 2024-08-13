import { ContainerProjeto } from "@/components/ContainerProjeto"
import { ProjetoForm } from "@/components/ProjetoForm"
import { SetorInfo } from "@/components/SetorInfo"

export default function EditarProjeto(){
    return(
        <div className="min-h-screen">
            <ContainerProjeto/>
            <SetorInfo setor="Projetos"/>
            <ProjetoForm/>
        </div>
    )
}