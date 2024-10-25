'use client';
import { useEffect, useState } from "react";
import { MyButton } from "./MyButton";
import { ProjetoHospedeInput } from "./ProjetoHospedeInput";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import * as yup from "yup";
import projetoService from "@/services/projetosService";
import hospedeService from "@/services/hospedeService";

const schema = yup.object({
    name: yup.string(),
    projectDate: yup.string(),
    scope: yup.string(),
    activity: yup.string(),
    restriction: yup.string(),
    cost: yup.string(),
    type: yup.string(),
    userId: yup.number(),
    cc: yup.string(),
    status: yup.string(),
    presentation: yup.string(),
    identification: yup.string(),
    justification: yup.string(),
    methodology: yup.string(),
    objectives: yup.string(),
    public: yup.string(),
    expectedResults: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

interface IProjetoFormProps{
    action: string
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

interface IHospedeEmProjeto {
    PROJETO_idPROJETO: number;
    HOSPEDE_idHOSPEDE: number;
}

interface IParticipantesListData{
    PROJETO_idPROJETO: number;
    HOSPEDE_idHOSPEDE: number;
    NOME_COMPLETO: string;
}

export function ProjetoForm({action}: IProjetoFormProps){
    const { user } = useSelector((state) => state.auth);
    const [hospedesList, setHospedesList] = useState<Array<IHospedeEmProjeto>>([]);
    const [dummy, setDummy] = useState<Array<number>>([]);
    const [hospedeAtivos, setHospedesAtivos] = useState<Array<IHospedeData>>([]);
    const [canEdit, setCanEdit] = useState(false);
    const [statusList, setStatusList] = useState();
    const [lista, setLista] = useState<Array<IParticipantesListData>>([]);
    const router = useRouter();
    const pathname = usePathname();
    const { createProjeto, getProjetoStatus, editProjeto, getProjetoById, addParticipante, getListaParticipantes } = projetoService;
    const { getHospedesAtivos } = hospedeService;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	async function onSubmit(data: FormData){
        if(action == "CRIAR"){
            const res = await createProjeto(data, user.token);
            if(res.type == "SUCCESS"){
                return router.push("/projetos")
            }
        }else{
            const res = await editProjeto(Number(pathname.substring(17)), data, user.token);
            if(hospedesList.length > 0){
                const res = await addParticipante(hospedesList, user.token);
            }
            if(res.type == "SUCCESS"){
                return router.push("/projetos")
            }
        }
        
	};


    useEffect(() => {
        async function fetch(){
            const res1 = await getProjetoStatus(user.token);
            const res3 = await getHospedesAtivos(user.token);
            setHospedesAtivos(res3.data);
            setStatusList(res1.data);
            if(action == "EDITAR"){
                const res2 = await getProjetoById(Number(pathname.substring(17)), user.token);
                const res4 = await getListaParticipantes(Number(pathname.substring(17)), user.token);
                setLista(res4.data);
                setValues(res2.data[0])
                
            }
        }
        fetch();
        setValue("userId", user.user.userId);
        if(action == "CRIAR"){
            setCanEdit(!canEdit);
        }
    }, [user, getProjetoStatus, getProjetoById, getHospedesAtivos]);

    function setValues(data: any){
        setValue("activity", data.ATIVIDADE);
        setValue("cc", data.CENTRO_DE_CUSTO);
        setValue("cost", data.CUSTO);
        setValue("expectedResults", data.RESULTADOS_ESPERADOS);
        setValue("identification", data.IDENTIFICACAO);
        setValue("justification", data.JUSTIFICATIVA);
        setValue("methodology", data.METODOLOGIA);
        setValue("name", data.NOME);
        setValue("objectives", data.OBJETIVOS);
        setValue("presentation", data.APRESENTACAO);
        setValue("projectDate", data.DATA_PROJETO.substring(0,10));
        setValue("public", data.PUBLICO_BENEFICIARIO);
        setValue("restriction", data.RESTRICAO);
        setValue("scope", data.ESCOPO);
        setValue("status", data.STATUS_PROJETO);
        setValue("type", data.TIPO);
    }

    function handleChange(value: string){
        const data: IHospedeEmProjeto = {
            HOSPEDE_idHOSPEDE: Number(value),
            PROJETO_idPROJETO: Number(pathname.substring(17))
        }
        setHospedesList(state => [...state, data]);
    }

    function handleCounter(){
        setDummy(state => [...state, 1]);
    }


    return(
        <div className="bg-white p-5 rounded-md mb-20 shadow-lg m-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label>Nome do projeto:
                            <input disabled={!canEdit} type="text" className="input" {...register("name")}/>
                        </label>
                        <label>Data do projeto:
                            <input disabled={!canEdit} type="date" className="input" {...register("projectDate")}/>
                        </label>
                        <label>Escopo do projeto:
                            <textarea disabled={!canEdit} className="input"  {...register("scope")} rows={10}></textarea>
                        </label>
                        <label>Atividade:
                            <textarea disabled={!canEdit} className="input" {...register("activity")} rows={10}></textarea>
                        </label>
                        <label>Resultados esperados:
                            <textarea disabled={!canEdit} className="input" {...register("expectedResults")} rows={10}></textarea>
                        </label>
                        <label>Objetivos:
                            <textarea disabled={!canEdit} className="input" {...register("objectives")} rows={10}></textarea>
                        </label>
                        <label>Metodologia:
                            <textarea disabled={!canEdit} className="input" {...register("methodology")} rows={10}></textarea>
                        </label>
                    </div>
                    <div>
                        <label>Custo do projeto:
                            <input disabled={!canEdit} type="text" className="input" {...register("cost")}/>
                        </label>
                        <label>Tipo do projeto:
                            <input disabled={!canEdit} type="text" className="input" {...register("type")}/>
                        </label>
                        <label>Centro de custo:
                            <input disabled={!canEdit} type="text" className="input" {...register("cc")}/>
                        </label>
                        <label>Público beneficiário:
                            <input disabled={!canEdit} type="text" className="input" {...register("public")}/>
                        </label>
                        <label>Identificação:
                            <input disabled={!canEdit} type="text" className="input" {...register("identification")}/>
                        </label>
                        <label>Justificativa:
                            <textarea disabled={!canEdit} className="input" {...register("justification")} rows={10}></textarea>
                        </label>
                        <label>Restrições:
                            <textarea disabled={!canEdit} className="input" {...register("restriction")} rows={10}></textarea>
                        </label>
                        <label>Apresentação:
                            <textarea disabled={!canEdit} className="input" {...register("presentation")} rows={10}></textarea>
                        </label>
                    </div>
                    <div>
                        <label>Status do projeto:
                            <select className="input" {...register("status")} disabled={!canEdit}>
                                <option hidden={true}></option>
                                {statusList && (
                                    //@ts-ignore
                                    statusList.map((status) => (
                                        <option value={status.STATUS_VALUE} key={status.idSTATUS_DOMAIN}>{status.STATUS_DESCRIPTION}</option>
                                    ))
                                )}
                            </select>
                        </label>
                        {action == "EDITAR" && (
                            <div>
                                <div className="flex justify-around my-5">
                                    <h2 className="mt-2">Lista de participantes</h2>
                                    <MyButton buttonText="Inserir" buttonType="button" handleClick={handleCounter} disable={!canEdit}/>
                                </div>
                                {dummy.length  > 0 && (
                                    dummy.map((value, index) => (
                                        <ProjetoHospedeInput key={index} data={hospedeAtivos} handleChange={handleChange}/>
                                    ))
                                )}
                                <div>
                                    {lista.length > 0 && (
                                        <div className="border border-black rounded-md p-3">
                                            <h1 className="text-center text-xl my-5">Participantes cadastrados</h1>
                                            {lista.map((value) => (
                                                <div key={value.HOSPEDE_idHOSPEDE} className="my-2">
                                                    <label>Nome do hóspede:
                                                        <p className="input">{value.NOME_COMPLETO}</p>
                                                    </label>
                                                    <label>ID do hóspede:
                                                        <p className="input">{value.HOSPEDE_idHOSPEDE}</p>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex justify-end m-4 space-x-2">
                    {/* <MyButton buttonText="Incluir hóspedede" buttonType="button" handleClick={handleClick}/> */}
                    {action == "CRIAR" ? (
                        <MyButton buttonText="Salvar" buttonType="submit"/>
                    ) : (
                        <>
                            <MyButton buttonText="Editar" buttonType="button" handleClick={() => setCanEdit(!canEdit)}/>
                            <MyButton buttonText="Salvar" buttonType="submit"/>
                        </>
                    )}
                    
                </div>
            </form>
        </div>
    )
}