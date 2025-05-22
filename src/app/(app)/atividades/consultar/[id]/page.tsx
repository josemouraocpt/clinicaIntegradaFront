"use client"
import { AtividadesListMin } from "@/components/AtividadesListMin"
import { ContainerAtividades } from "@/components/ContainerAtividades"
import { SetorInfo } from "@/components/SetorInfo"
import atividadesService from "@/services/atividadesService";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { toast, Toaster } from "sonner";

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

interface IHospedeEmAtividadeData{
    NOME_COMPLETO: string;
    HOSPEDE_idHOSPEDE: number;
    OBSERVACOES_HOSPEDE_ATIVIDADE?: string;
} 


export default function ConsultarPresencaId(){
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    const [data, setData] = useState<IAtividadeData>();
    const [hospedeData, setHospedeData] = useState<Array<IHospedeEmAtividadeData>>([]);
    const pathname = usePathname();
    const { getAtividadeById, getLista, deleteHospedeEmAtividade } = atividadesService;

    useEffect(() => {
        async function fetch(){
            const res1 = await getAtividadeById(Number(pathname.substring(22)), user.token);
            const res2 = await getLista(Number(pathname.substring(22)), user.token);
            setData(res1.data[0]);
            setHospedeData(res2.data);
        }
        fetch();
    }, [getAtividadeById, user, getLista]);

    async function handleDelete(hospedeId: number) {
        const res = await deleteHospedeEmAtividade(Number(pathname.substring(22)), user.token, hospedeId);
        if(res.type == "SUCCESS"){
            toast.success("Ação realizada com sucesso!");{}
            router.push("/atividades")
        } else {
            toast.error("Algo não está certo.Tente novamente!");
            return;
        }
    }

    return(
        <div className="min-h-screen">
            <Toaster richColors/>
            <ContainerAtividades/>
            <SetorInfo setor="Atividades"/>
            <div className="bg-white p-8 rounded-lg shadow-xl m-10">
                <h1 className="text-button text-2xl text-center">{data?.NOME}</h1>
                <div className="space-y-5 flex flex-row space-x-5">
                    <div className="w-1/3 flex flex-col space-y-6">
                        <label className="text-button text-sm">Atividade:
                            <h2 className="text-xl border border-button rounded-lg shadow-md p-1">{data?.DEPARTAMENTO}</h2>
                        </label>
                        <label className="text-button text-sm">Data:
                            <h2 className="text-xl border border-button rounded-lg shadow-md p-1">{new Date(data?.DATA_ATIVIDADE.substring(0,10)).toLocaleDateString("pt-BR")}</h2>
                        </label>
                        <label className="text-button text-sm">Professor responsável:
                            <h2 className="text-xl border border-button rounded-lg shadow-md p-1">{data?.RESPONSAVEL_NOME}</h2>
                        </label>
                        <label className="text-button text-sm">Horário de início:
                            <h2 className="text-xl border border-button rounded-lg shadow-md p-1">{data?.HORARIO_INICIO}</h2>
                        </label>
                        <label className="text-button text-sm">Horário de término:
                            <h2 className="text-xl border border-button rounded-lg shadow-md p-1">{data?.HORARIO_FIM}</h2>
                        </label>
                        <label className="text-button text-sm">Observações:
                            <p className="text-xl border border-button rounded-lg shadow-md p-1">{data?.OBSERVACOES}</p>
                        </label>
                    </div>
                    <div className="w-2/3">
                        <h2 className="text-button font-bold text-xl">Presença</h2>
                        <div className="flex space-x-2 mt-4 mb-1 w-full">
                            <h2 className="text-white font-bold bg-button w-4/12 p-1 text-center">Nome do hóspede</h2>
                            <h2 className="text-white font-bold bg-button w-4/12 p-1 text-center">Matrícula do hóspede</h2>
                            <h2 className="text-white font-bold bg-button w-4/12 p-1 text-center">Observações</h2>
                        </div>
                        {hospedeData.length > 0 && (
                            hospedeData.map((obj) => (
                                <div key={obj.HOSPEDE_idHOSPEDE} className="flex">
                                    <AtividadesListMin data={obj}/>
                                    <button type="button" onClick={() => {handleDelete(obj.HOSPEDE_idHOSPEDE)}}><MdDeleteForever size={28} className="text-button"/></button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}