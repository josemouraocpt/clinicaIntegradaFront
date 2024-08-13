'use client';
import { useRouter } from "next/navigation";
import { MyButton } from "./MyButton";

interface IProjetoCardPros{
    id: number
}

export function ProjetoCard({id}: IProjetoCardPros){
    const router = useRouter();
    return(
        <div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
            <h1 className="text-button font-bold text-xl">Nome do projeto</h1>
            <ul>
                <li>Data: </li>
                <li>Escopo: </li>
                <li>Custo: R$</li>
                <li>Responsável: </li>
            </ul>
            <div className="flex justify-center mt-5 space-x-3">
                <MyButton buttonText="Excluir"/>
                <MyButton buttonText="Editar" handleClick={() => router.push(`/projetos/editar/${id}`)}/>
                <MyButton buttonText="Detalhes" handleClick={() => router.push(`/projetos/${id}`)}/>
            </div>
        </div>
    )
}