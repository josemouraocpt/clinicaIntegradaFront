import { ContainerCozinha } from "@/components/ContainerCozinha";
import { EstoqueCard } from "@/components/EstoqueCard";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import Link from "next/link";

export default function Estoque(){
    return(
        <div className="min-h-screen">
            <ContainerCozinha/>
            <SetorInfo setor="Estoque"/>
            <div className="mx-10 flex justify-end">
                <Link href='/cozinha/estoque/cadastrar'>
                    <MyButton buttonText='Cadastrar'/>
                </Link>
            </div>
            <div className="m-10 grid grid-cols-3 gap-5 bg-white p-4 rounded-lg shadow-sm">
                <EstoqueCard path={`/cozinha/estoque/editar/${1}`}/>
                <EstoqueCard path={`/cozinha/estoque/editar/${2}`}/>
                <EstoqueCard path={`/cozinha/estoque/editar/${3}`}/>
                <EstoqueCard path={`/cozinha/estoque/editar/${4}`}/>
                <EstoqueCard path={`/cozinha/estoque/editar/${5}`}/>
            </div>
        </div>
    )
}