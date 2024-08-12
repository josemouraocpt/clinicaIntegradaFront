import Link from "next/link";
import { MyButton } from "./MyButton";

interface IAtividadeCardProps{
    path: string
    btnText: string
}

export function AtividadeCard({path, btnText}: IAtividadeCardProps){
    return(
        <div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4"> 
            <h1 className="font-bold text-2xl text-center">Nome da atividade</h1>
            <ul className="grid grid-cols-2 gap-x-5">
                <li>Departamento: </li>
                <li>Responsável: </li>
                <li>Frequência: </li>
                <li>Data da atividade: </li>
                <li>Horário de início: </li>
                <li>Horário de fim: </li>
            </ul>
            <p>OBSERVAÇÕES</p>
            <div className="flex justify-end mt-2">
                <Link href={path}>
                    <MyButton buttonText={btnText}/>
                </Link>
            </div>
        </div>
    )
}