'use client'
import { useSelector } from "react-redux";
import { ActionsBox } from "./ActionsBox";
import { useRouter } from "next/navigation";
import projetoService from "@/services/projetosService";
interface IProjetoCardPros{
    data: IProjetoData
}

interface IProjetoData{
	idPROJETO: number
	USUARIO_idUSUARIO: number 
	NOME: string
	DATA_PROJETO: string 
	ESCOPO: string
	ATIVIDADE: string
	RESTRICAO: string
	CUSTO: number
	TIPO: string
	CENTRO_DE_CUSTO: string
	STATUS_PROJETO: string
	RESULTADOS_ESPERADOS: string
	OBJETIVOS: string
	PUBLICO_BENEFICIARIO: string 
	METODOLOGIA: string
	JUSTIFICATIVA: string
	APRESENTACAO: string
	IDENTIFICACAO: string
    RESPONSAVEL: string
}

export function ProjetoCard({data}: IProjetoCardPros){
	const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    const { deleteProjeto } = projetoService;

    async function handleDelete(id: number){
        const res = await deleteProjeto(id, user.token);
        if(res.type == "SUCCESS"){
            router.push("/atividades");
        }
    }
    return(
        <div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
            <h1 className="text-button font-bold text-xl">{data.NOME}</h1>
            <ul>
                <li>Data: {new Date(data.DATA_PROJETO.substring(0, 10)).toLocaleDateString("pt-BR")}</li>
                <li>Escopo: {data.ESCOPO}</li>
                <li>Custo: R$ {data.CUSTO}</li>
                <li>Responsável: {data.RESPONSAVEL}</li>
            </ul>
            <div className="flex justify-end">
                <ActionsBox path={`/projetos/editar/${data.idPROJETO}`} deleteFunc={() => { handleDelete(data.idPROJETO) }}/>
            </div>
        </div>
    )
}