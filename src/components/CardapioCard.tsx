'use client'
import { useSelector } from "react-redux";
import { ActionsBox } from "./ActionsBox";
import { useRouter } from "next/navigation";
import cozinhaService from "@/services/cozinhaService";

interface ICardapioCardProps{
    path: string
    data: ICardapioData
}

interface ICardapioData{
    idCARDAPIO:  number
    USUARIO_idUSUARIO: number
    DATA_CARDAPIO: string
    HORARIO: string
    DESCRICAO: string
    NOME: string
    TIPO: string
    STATUS_CARDAPIO: string
}

export function CardapioCard({path, data}: ICardapioCardProps){
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    const { deleteCardapio } = cozinhaService;

    async function handleDelete(id: number){
        const res = await deleteCardapio(id, user.token);
        if(res.type == "SUCCESS"){
            router.push("/cozinha");
        }
    }

    return(
        <div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
            <h1 className="font-bold text-2xl text-center">{data.NOME}</h1>
            <div>
                <ul>
                    <li>Data da refeição: {new Date(data.DATA_CARDAPIO.substring(0, 10)).toLocaleDateString("pt-BR")}</li>
                    <li>Horário da refeição: {data.HORARIO}</li>
                </ul>
                <div>
                    <p>
                        {data.DESCRICAO}
                    </p>
                </div>
                <h3>Status: {data.STATUS_CARDAPIO}</h3>
            </div>
            <div className="flex justify-end">
                <ActionsBox path={path} deleteFunc={() => { handleDelete(data.idCARDAPIO) }}/>
            </div>
        </div>
    )
}