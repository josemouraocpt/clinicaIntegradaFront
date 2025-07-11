import { ContainerFarmacia } from "@/components/ContainerFarmacia"
import { FormFarmacia } from "@/components/FormFarmacia"

export default function CadastrarMedicamento(){
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <div className="m-10">
                <FormFarmacia type="MEDICAMENTO" action="CRIAR"/>
            </div>
        </div>
    )
}