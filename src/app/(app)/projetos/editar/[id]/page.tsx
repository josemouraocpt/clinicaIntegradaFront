import { ContainerProjeto } from "@/components/ContainerProjeto"
import { ProjetoForm } from "@/components/ProjetoForm"

export default function EditarProjeto(){
    return(
        <div className="min-h-screen">
            <ContainerProjeto/>
            <ProjetoForm/>
        </div>
    )
}