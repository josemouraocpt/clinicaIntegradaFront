'use client';
import { AtividadesListMin } from "@/components/AtividadesListMin";
import { ContainerAtividades } from "@/components/ContainerAtividades";
import { LancarPresencaList } from "@/components/LancarPresencaList";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import atividadesService from "@/services/atividadesService";
import hospedeService from "@/services/hospedeService";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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


interface IHospedeData {
    idHOSPEDE: number;
    DADOS_MEDICOS_idDADOS_MEDICOS: number;
    NOME_COMPLETO: string;
    NOME_SOCIAL?: string;
    APELIDO?: string;
    RG: string;
    CPF: string;
    NACIONALIDADE: string;
    NATURALIDADE: string;
    ESTADO_CIVIL: string;
    DATA_NASCIMENTO: Date;
    NOME_MAE: string;
    NOME_PAI?: string;
    TELEFONE: string;
    PROFISSAO?: string;
    TITULO_ELEITOR?: string;
    ENDERECO: string;
    CIDADE: string;
    UF: string;
    CEP: string;
    DATA_ENTRADA: Date;
    RESPONSAVEL: string;
    STATUS_HOSPEDE: string;
}

interface IReqBodyStruct{
    ATIVIDADES_idATIVIDADES: number;
    HOSPEDE_idHOSPEDE: number;
    OBSERVACOES_HOSPEDE_ATIVIDADE?: string;
}

export default function LancarPresencaId(){
    const [hospedeId, setHospedeId] = useState<string>();
    const [lista, setLista] = useState<Array<IReqBodyStruct>>([]);
    const [observation, setObservation] = useState<string>();
    const [dummy, setDummy] = useState<Array<number>>([]);
    const [hospedesList, setHospedesList] = useState([]);
    const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState<IAtividadeData>();
    const [hospedeData, setHospedeData] = useState<Array<IHospedeData>>([]);
    const pathname = usePathname();
    const router = useRouter();
    const { getAtividadeById, lancarPresencaByAtividadeId, getLista } = atividadesService;
    const { getHospedesAtivos } = hospedeService;

    useEffect(() => {
        async function fecth(){
            const res1 = await getAtividadeById(Number(pathname.substring(19)),user.token); 
            const res2 = await getHospedesAtivos(user.token);
            const res3 = await getLista(Number(pathname.substring(19)),user.token);
            setData(res1.data[0]);
            setHospedeData(res2.data);
            setLista(res3.data);
        }
        fecth();
    }, [user, getAtividadeById, getHospedesAtivos])

    async function handleSubmit(event: React.SyntheticEvent){
        event.preventDefault();

        const dataToSend = [];

        const data = {
            ATIVIDADES_idATIVIDADES: Number(pathname.substring(19)),
            HOSPEDE_idHOSPEDE:  Number(hospedeId),
            OBSERVACOES_HOSPEDE_ATIVIDADE: observation
        }
        dataToSend.push(data);

        hospedesList.map((obj) => {
            //@ts-ignore
            if(obj.OBSERVACOES_HOSPEDE_ATIVIDADE !== undefined){
                dataToSend.push(obj)
            }
        });
        
        const res = await lancarPresencaByAtividadeId(Number(pathname.substring(19)), dataToSend, user.token);
        if(res.type == "SUCCESS"){
            router.push("/atividades")
        }
    }

    function handleChangeField1(value: string){
        setHospedeId(value);
    }

    function handleChangeField2(value: string){
        setObservation(value);
    }

    function handleCounter(){
        setDummy(state => [...state, 1]);
        const data = {
            ATIVIDADES_idATIVIDADES: Number(pathname.substring(19)),
            HOSPEDE_idHOSPEDE:  Number(hospedeId),
            OBSERVACOES_HOSPEDE_ATIVIDADE: observation
        }
        setHospedesList(state => [...state, data]);
    }

    return(
        <div className="min-h-screen">
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
                        <div className="flex justify-around my-5">
                            <h2 className="text-button font-bold text-xl">Presença</h2>
                            <MyButton buttonText="Inserir" buttonType="button" handleClick={handleCounter}/>
                        </div>
                        <div className="flex space-x-2 mt-4 mb-1 w-full">
                            <h2 className="text-white font-bold bg-button w-4/12 p-1 text-center">Nome do hóspede</h2>
                            <h2 className="text-white font-bold bg-button w-4/12 p-1 text-center">Observações</h2>
                        </div>
                        <form onSubmit={(e: React.SyntheticEvent) => {return handleSubmit(e)}}>
                            {dummy.length > 0 && (
                                dummy.map((item, index) => (
                                    <LancarPresencaList key={index} data={hospedeData} handleChange1={handleChangeField1} handleChange2={handleChangeField2}/>
                                ))
                            )}
                            <div className="mt-5 flex justify-end space-x-2">
                                <MyButton buttonText="Salvar" buttonType="submit"/>
                            </div>
                        </form>
                        <div>
                            {lista.length > 0 && (
                                <div className="border border-button rounded-md p-3 my-3">
                                    <h1 className="text-center text-xl my-2">Hospedes presentes na atividade.</h1>
                                    {lista.map((value) => (
                                        <AtividadesListMin key={value.HOSPEDE_idHOSPEDE} data={value}/>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}