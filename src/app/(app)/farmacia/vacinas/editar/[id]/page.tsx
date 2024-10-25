import CadastroVacina from "@/components/CadastroVacina";
import { ContainerFarmacia } from "@/components/ContainerFarmacia";

export default function EditarVacina(){
    return(
        <div>
            <ContainerFarmacia/>
            <div>
                <h1 className="text-center text-2xl font-bold">Editar os dados da vacina: </h1>
                <CadastroVacina action="EDITAR"/>
            </div>
        </div>
    )
}