import { CardapioForm } from "@/components/CadarpioForm";
import { ContainerCozinha } from "@/components/ContainerCozinha";

export default function EditarCardapio(){
    return(
        <div className="min-h-screen">
            <ContainerCozinha/>
            <div>
                <h1 className="text-center text-2xl font-bold">Editar os dados do cardápio: </h1>
                <div className='m-4'>
                    <h2 className='text-2xl text-center'>Insira <span className="text-red-500">todos</span> os dados necessários</h2>
                </div>
                <CardapioForm/>
            </div>
        </div>
    )
}