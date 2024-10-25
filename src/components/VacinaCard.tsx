'use client'
import { useRouter } from "next/navigation";
import { ActionsBox } from "./ActionsBox";
import farmaciaService from "@/services/farmaciaService";
import { useSelector } from "react-redux";

interface IVacinaProps{
    data: IVacinaData
}
interface IVacinaData{
    idFARMACOS: number
    NOME: string
    DOSAGEM: string
    VALIDADE: string
    LOTE: string
    DATA_FABRICACAO: string
    FABRICANTE: string
    TIPO_ARMAZENAMENTO: string
    CONDICAO_ARMAZENAMENTO: string
    DATA_ALTERACAO: string
    ALTERADO_POR: string
    CNPJ: string
    QUANTIDADE: number
    FORNECEDOR_NOME: string
}

export function VacinaCard({data}: IVacinaProps){
    const router = useRouter();
    const { deleteVacina } = farmaciaService;
    const { user } = useSelector((state) => state.auth);

    async function handleDelete(id: number){
        const res = await deleteVacina(id, user.token);
        if(res.type == "SUCCESS"){
            router.push("/farmacia");
        }
    }

    return(
        <div className="bg-background max-w-[50vw] p-5 rounded-md shadow-md">
            <h1 className="text-lg font-bold text-center">{data.NOME}</h1>
            <div className="grid grid-cols-2">
                <ul>
                    <li>Fabricante: {data.FABRICANTE}</li>
                    <li>Validade: {new Date(data.VALIDADE.substring(0, 10)).toLocaleDateString("pt-BR")}</li>
                    <li>Data de fabricação: {new Date(data.DATA_FABRICACAO.substring(0, 10)).toLocaleDateString("pt-BR")}</li>
                    <li>Lote: {data.LOTE}</li>
                    <li>Dosagem: {data.DOSAGEM}</li>
                    <li>Tipo de armazenamento: {data.TIPO_ARMAZENAMENTO}</li>
                </ul>
                <ul>
                    <li>Condição do armazenamento: {data.CONDICAO_ARMAZENAMENTO}</li>
                    <li>Quantidade em estoque: {data.QUANTIDADE}</li>
                    <li>Fornecedor: {data.FORNECEDOR_NOME}</li>
                    <li>CPNJ do fornecedor: {data.CNPJ}</li>
                </ul>
            </div>
            <div className="my-2">
                <h3>Alterado por: {data.ALTERADO_POR}</h3>
                <h3>Data da alteração: {new Date(data.DATA_ALTERACAO.substring(0, 10)).toLocaleDateString("pt-BR")}</h3>
            </div>
            <div className="flex justify-end"> 
                <ActionsBox path={`/farmacia/vacinas/editar/${data.idFARMACOS}`} deleteFunc={() => { handleDelete(data.idFARMACOS) }}/>
            </div>
        </div>
    )
}