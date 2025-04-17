"use client"
import farmaciaService from "@/services/farmaciaService";
import { ActionsBox } from "./ActionsBox";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import cozinhaService from "@/services/cozinhaService";

interface IEstoqueCardProps{
    data: IEstoqueData
    path: string
}

interface IEstoqueData{
    idESTOQUE: number
    USUARIO_idUSUARIO: number
    NOME: string
    QUANTIDADE: number
    VALOR_UNITARIO: number
    VALOR_TOTAL: number
    VALIDADE: string
    DATA_INCLUSAO: string
    DATA_ALTERACAO: string
    ALTERADO_POR: string
    TIPO: string
}

export function EstoqueCard({path, data}: IEstoqueCardProps){
    const router = useRouter();
    const { deleteMedicamento, deleteItem } = farmaciaService;
    const { deleteMercadoria } = cozinhaService;
    const { user } = useSelector((state) => state.auth);
    
    async function handleDelete(id: number){
        console.log(path)
        if(path.includes("medicamentos")){
            const res = await deleteMedicamento(id, user.token);
            if(res.type == "SUCCESS"){
                router.push("/farmacia");
            }
        }
        if(path.includes("itens")){
            const res = await deleteItem(id, user.token);
            if(res.type == "SUCCESS"){
                router.push("/farmacia");
            }
        }
        if(path.includes("estoque")){
            const res = await deleteMercadoria(id, user.token);
            if(res.type == "SUCCESS"){
                router.push("/cozinha");
            }
        }

    }

    return(
        <div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
            <h1 className="font-bold text-2xl text-center my-2">{data.NOME}</h1>
            <div>
                <ul>
                    <li>Quantidade em estoque: {data.QUANTIDADE}</li>
                    <li>Valor unitário: R$ {data.VALOR_UNITARIO}</li>
                    <li>Valor total: R$ {data.VALOR_TOTAL}</li>
                    <li>Data da inclusão: {new Date(data.DATA_INCLUSAO.substring(0, 10)).toLocaleDateString("pt-BR")}</li>
                    <li>Alterado por: {data.ALTERADO_POR}</li>
                    {data.DATA_ALTERACAO && (
                        <li>Data da alteração: {new Date(data.DATA_ALTERACAO.substring(0, 10)).toLocaleDateString("pt-BR")}</li>
                    )}
                </ul>
            </div>
            <div className="flex justify-end">
                <ActionsBox path={path} deleteFunc={() => { handleDelete(data.idESTOQUE) }}/>
            </div>
        </div>
    )
}