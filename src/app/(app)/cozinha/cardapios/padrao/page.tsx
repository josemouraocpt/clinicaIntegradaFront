import { CardapioCard } from "@/components/CardapioCard";
import { ContainerCozinha } from "@/components/ContainerCozinha";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import Link from "next/link";

export default function Padrao(){
    return(
        <div className="min-h-screen">
            <ContainerCozinha/>
            <SetorInfo setor="Cardápios padrão"/>
            <div className="flex justify-end mx-4">
                <Link href="/cozinha/cardapios/cadastro">
                    <MyButton buttonText="Cadastrar"/>
                </Link>
            </div>
            <div className="m-10 grid grid-cols-3 gap-5 bg-white p-4 rounded-lg shadow-sm">
                <CardapioCard path={`/cozinha/cardapios/editar/${1}`}/>
                <CardapioCard path={`/cozinha/cardapios/editar/${2}`}/>
                <CardapioCard path={`/cozinha/cardapios/editar/${3}`}/>
                <CardapioCard path={`/cozinha/cardapios/editar/${4}`}/>
                <CardapioCard path={`/cozinha/cardapios/editar/${5}`}/>
                <CardapioCard path={`/cozinha/cardapios/editar/${5}`}/>
            </div>
        </div>
    )
}