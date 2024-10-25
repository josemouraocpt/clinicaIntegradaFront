"use client"

import { useRouter } from "next/navigation";
import { useState } from "react"

interface IItemCardData{
    nome?: string
    id: number
    type: string
}

export function ItemCard({nome, id, type}: IItemCardData){
    const [hidden, setHidden] = useState(true);
    const router = useRouter();
    function handleClick(){
        if(type == "MEDICAMENTO"){
            router.push(`/farmacia/medicamentos/editar/${id}`)
        }else{
            router.push(`/farmacia/itens/editar/${id}`)
        }
    }
    return(
        <div className="flex flex-col space-y-2">
            <div className="flex justify-center">
                <button onClick={handleClick} className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover">
                    {nome ? nome : "teste"}
                </button>
            </div>
            <div className={hidden == false ? "bg-background p-5 rounded-md shadow-md" : "hidden"}>
                <ul>
                    <li>Entrada do estoque: </li>
                    <li>Valor unitário: R$</li>
                    <li>Quantidade em estoque: </li>
                    <li>Valor total: R$</li>
                    <li>Última retirada: </li>
                </ul>
            </div>
        </div>
    )
}