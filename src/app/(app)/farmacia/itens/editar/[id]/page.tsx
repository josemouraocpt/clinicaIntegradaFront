import { ContainerFarmacia } from "@/components/ContainerFarmacia";
import { FormFarmacia } from "@/components/FormFarmacia";

export default function EditarItem(){
    return(
        <div>
            <ContainerFarmacia/>
            <div>
                <h1 className="text-center text-2xl font-bold">Editar os dados do item: </h1>
                <div className='m-4'>
                    <h2 className='text-2xl text-center'>Insira <span className="text-red-500">todos</span> os dados necessários</h2>
                </div>
                <FormFarmacia action="EDITAR" type="ITEM"/>
            </div>
        </div>
    )
}