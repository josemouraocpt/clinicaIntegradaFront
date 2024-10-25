'use client'
import { useSelector } from "react-redux";
import { ActionsBox } from "./ActionsBox";
import { useRouter } from "next/navigation";
import atividadesService from "@/services/atividadesService";

interface IAtividadeCardProps{
    path: string
    data: IAtividadeData
}

interface IAtividadeData{
	idATIVIDADES: number
	NOME: string
	DEPARTAMENTO: string 
	RESPONSAVEL_NOME: string
	RESPONSAVEL_DOCUMENTO: string
	FREQUENCIA: string
	STATUS_ATIVIDADE: string
	DATA_ATIVIDADE: string
	HORARIO_INICIO: string
	HORARIO_FIM: string
	OBSERVACOES: string
	ANEXO: any
}

export function AtividadeCard({path, data}: IAtividadeCardProps){
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    const { deleteAtividade } = atividadesService;

    async function handleDelete(id: number){
        const res = await deleteAtividade(id, user.token);
        if(res.type == "SUCCESS"){
            router.push("/atividades");
        }
    }

    return(
        <div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4"> 
            <h1 className="font-bold text-2xl text-center">{data.NOME}</h1>
            <ul className="grid grid-cols-2 gap-x-5">
                <li>Departamento: {data.DEPARTAMENTO}</li>
                <li>Responsável: {data.RESPONSAVEL_NOME}</li>
                <li>Frequência: {data.FREQUENCIA}</li>
                <li>Data da atividade: {new Date(data.DATA_ATIVIDADE.substring(0,10)).toLocaleDateString("pt-BR")}</li>
                <li>Horário de início: {data.HORARIO_INICIO}</li>
                <li>Horário de fim: {data.HORARIO_FIM}</li>
            </ul>
            <p>{data.OBSERVACOES}</p>
            <div className="flex justify-end">
                <ActionsBox path={path} deleteFunc={() => { handleDelete(data.idATIVIDADES) }}/>
            </div>
        </div>
    )
}