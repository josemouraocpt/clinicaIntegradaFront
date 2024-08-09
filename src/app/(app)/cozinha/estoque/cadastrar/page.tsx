import { ContainerCozinha } from "@/components/ContainerCozinha";
import { EstoqueForm } from "@/components/EstoqueForm";

export default function CadastrarEstoque(){
    return(
        <div className="min-h-screen">
            <ContainerCozinha/>
            <div>
                <h1 className="text-center text-2xl font-bold">Cadastrar novo produto</h1>
                <div className='m-4'>
                    <h2 className='text-2xl text-center'>Insira <span className="text-red-500">todos</span> os dados necessários</h2>
                </div>
                <EstoqueForm type="CADASTRAR"/>
            </div>
        </div>
    )
}