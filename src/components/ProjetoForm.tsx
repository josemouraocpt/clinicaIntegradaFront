'use client';
import { useEffect, useState } from "react";
import { MyButton } from "./MyButton";
import { ProjetoHospedeInput } from "./ProjetoHospedeInput";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import * as yup from "yup";
import projetoService from "@/services/projetosService";
import hospedeService from "@/services/hospedeService";
import { requiredString } from "./ErroPreenchimento";
import { toast, Toaster } from "sonner";
import { MdDeleteForever } from "react-icons/md";

const priceRegexBR = /\d+\.\d+/;

const schema = yup.object({
    name: requiredString('Nome obrigatório'),
    projectDate: requiredString('Data do projeto obrigatório'),
    scope: requiredString('Escopo do projeto obrigatório'),
    activity: requiredString('Atividade obrigatório'),
    restriction: requiredString('Restrições obrigatório'),
    cost: requiredString('Custo do projeto obrigatório').matches(priceRegexBR, { message: "Deve ser um número decimal com ponto." }),
    type: requiredString('Tipo do projeto obrigatório'),
    userId: yup.number(),
    cc: requiredString('Centro de custo obrigatório'),
    status: requiredString('Status do projeto obrigatório'),
    presentation: requiredString('Apresentação obrigatório'),
    identification: requiredString('Identificação obrigatório'),
    justification: requiredString('Justificação obrigatório'),
    methodology: requiredString('Métodologia obrigatório'),
    objectives: requiredString('Objetivos obrigatório'),
    public: requiredString('Público beneficiário obrigatório'),
    expectedResults: requiredString('Resultados esperados obrigatório'),
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
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    const [hospedesList, setHospedesList] = useState<Array<IHospedeEmProjeto>>([]);
    const [dummy, setDummy] = useState<Array<number>>([]);
    const [hospedeAtivos, setHospedesAtivos] = useState<Array<IHospedeData>>([]);
    const [canEdit, setCanEdit] = useState(false);
    const [statusList, setStatusList] = useState();
    const [lista, setLista] = useState<Array<IParticipantesListData>>([]);
    const router = useRouter();
    const pathname = usePathname();
    const { createProjeto, getProjetoStatus, editProjeto, getProjetoById, addParticipante, getListaParticipantes, deleteHospedeEmProjeto } = projetoService;
    const { getHospedesAtivos } = hospedeService;
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	async function onSubmit(data: FormData){
        if(action == "CRIAR"){
            const res = await createProjeto(data, user.token);
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                return router.push("/projetos")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }else{
            const res = await editProjeto(Number(pathname.substring(17)), data, user.token);
            if(hospedesList.length > 0){
                const res = await addParticipante(hospedesList, user.token);
            }
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                return router.push("/projetos")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
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
    }, []);

    function setValues(data: any) {
        if (!data) return;
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
        setValue("projectDate", data.DATA_PROJETO.substring(0, 10));
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

    async function onError(formErrors: FieldErrors<FormData>) {
        for (const value of Object.entries(formErrors)) {
            toast.error(value[1].message)
        }
    }

    async function handleDelete(hospedeId: number) {
        const res = await deleteHospedeEmProjeto(Number(pathname.substring(17)), user.token, hospedeId);
        if(res.type == "SUCCESS"){
            toast.success("Ação realizada com sucesso!");{}
            router.push("/projetos")
        } else {
            toast.error("Algo não está certo.Tente novamente!");
            return;
        }
    }



    return(
        <div className="bg-white p-5 rounded-md mb-20 shadow-lg m-10">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Toaster richColors/>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="flex flex-col">Nome do projeto:
                            <input disabled={!canEdit} type="text" className="input" {...register("name")}/>
                        </label>
                        <label className="flex flex-col">Data do projeto:
                            <input disabled={!canEdit} type="date" className="input" {...register("projectDate")}/>
                        </label>
                        <label className="flex flex-col">Escopo do projeto:
                            <textarea disabled={!canEdit} className="input"  {...register("scope")} rows={10}></textarea>
                        </label>
                        <label className="flex flex-col">Atividade:
                            <textarea disabled={!canEdit} className="input" {...register("activity")} rows={10}></textarea>
                        </label>
                        <label className="flex flex-col">Resultados esperados:
                            <textarea disabled={!canEdit} className="input" {...register("expectedResults")} rows={10}></textarea>
                        </label>
                        <label className="flex flex-col">Objetivos:
                            <textarea disabled={!canEdit} className="input" {...register("objectives")} rows={10}></textarea>
                        </label>
                        <label className="flex flex-col">Metodologia:
                            <textarea disabled={!canEdit} className="input" {...register("methodology")} rows={10}></textarea>
                        </label>
                    </div>
                    <div>
                        <label className="flex flex-col">Custo do projeto:
                            <input disabled={!canEdit} type="text" className="input" {...register("cost")}/>
                        </label>
                        <label className="flex flex-col">Tipo do projeto:
                            <input disabled={!canEdit} type="text" className="input" {...register("type")}/>
                        </label>
                        <label className="flex flex-col">Centro de custo:
                            <input disabled={!canEdit} type="text" className="input" {...register("cc")}/>
                        </label>
                        <label className="flex flex-col">Público beneficiário:
                            <input disabled={!canEdit} type="text" className="input" {...register("public")}/>
                        </label>
                        <label className="flex flex-col">Identificação:
                            <input disabled={!canEdit} type="text" className="input" {...register("identification")}/>
                        </label>
                        <label className="flex flex-col">Justificativa:
                            <textarea disabled={!canEdit} className="input" {...register("justification")} rows={10}></textarea>
                        </label>
                        <label className="flex flex-col">Restrições:
                            <textarea disabled={!canEdit} className="input" {...register("restriction")} rows={10}></textarea>
                        </label>
                        <label className="flex flex-col">Apresentação:
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
                                    <MyButton buttonText="Inserir" buttonType="button" handleClick={handleCounter} disable={!canEdit} hidden={["SOCIAL", "ADMIN", "SAUDE-Projetos"].includes(user.user.access) ? false : true}/>
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
                                                <div key={value.HOSPEDE_idHOSPEDE} className="my-2 flex flex-col justify-items-center space-y-2 border-2 shadow-md p-2 rounded-md">
                                                    <label>Nome do hóspede:
                                                        <p className="input">{value.NOME_COMPLETO}</p>
                                                    </label>
                                                    <label>ID do hóspede:
                                                        <p className="input">{value.HOSPEDE_idHOSPEDE}</p>
                                                    </label>
                                                    <button type="button" className="m-auto" onClick={() => {handleDelete(value.HOSPEDE_idHOSPEDE)}}><MdDeleteForever size={28} className="text-button"/></button>
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
                            <MyButton buttonText="Editar" buttonType="button" handleClick={() => setCanEdit(!canEdit)} hidden={["SOCIAL", "ADMIN", "SAUDE-Projetos"].includes(user.user.access) ? false : true}/>
                            <MyButton buttonText="Salvar" buttonType="submit"/>
                        </>
                    )}
                    
                </div>
            </form>
        </div>
    )
}