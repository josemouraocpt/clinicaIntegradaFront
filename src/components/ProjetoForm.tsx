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
import { requiredString } from "./ErroPreenchimento";
import { toast } from "sonner";

const priceRegexBR = /^(R\$ ?)?\d{1,3}(\.\d{3})*,\d{2}$/;

const schema = yup.object({
<<<<<<< HEAD
    name: yup.string().required('O nome é obrigatório'),
    projectDate: yup.string().required('A data do projeto é obrigatória'),
    scope: yup.string().required('O escopo é obrigatório'),
    activity: yup.string().required('A atividade é obrigatória'),
    restriction: yup.string().required('A restrição é obrigatória'),
    cost: yup.string().required('O custo é obrigatório').matches(priceRegexBR, 'O preço deve ser um número'),
    type: yup.string().required('O tipo é obrigatório'),
    userId: yup.number(),
    cc: yup.string().required('O centro de custo é obrigatório'),
    status: yup.string().required('O status é obrigatório'),
    presentation: yup.string().required('A apresentação é obrigatória'),
    identification: yup.string().required('A identificação é obrigatória'),
    justification: yup.string().required('A justificativa é obrigatória'),
    methodology: yup.string().required('A metodologia é obrigatória'),
    objectives: yup.string().required('O objetivo é obrigatório'),
    public: yup.string().required('O publico é obrigatório'),
    expectedResults: yup.string().required('O resultado é obrigatório'),
=======
    name: requiredString('Nome obrigatório'),
    projectDate: requiredString('Data do projeto obrigatório'),
    scope: requiredString('Escopo do projeto obrigatório'),
    activity: requiredString('Atividade obrigatório'),
    restriction: requiredString('Restrições obrigatório'),
    cost: requiredString('Custo do projeto obrigatório'),
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
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
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
    }, [user, getProjetoStatus, getProjetoById, getHospedesAtivos]);

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
        setValue("projectDate", data.DATA_PROJETO ? data.DATA_PROJETO.substring(0, 10));
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
<<<<<<< HEAD
                        <div>
                            <label>Nome do projeto:
                                <input disabled={!canEdit} type="text" className="input" {...register("name")}/>
                            </label>
                            <span className="text-red-500">{errors.name?.message}</span>
                        </div>
                       <div>
                        <label>Data do projeto:
                                <input disabled={!canEdit} type="date" className="input" {...register("projectDate")}/>
                                <span className="text-red-500">{errors.projectDate?.message}</span>
                            </label>
                       </div>
                        <div>
                            <label>Escopo do projeto:
                                <textarea disabled={!canEdit} className="input"  {...register("scope")} rows={10}></textarea>
                                <span className="text-red-500">{errors.scope?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Atividade:
                                <textarea disabled={!canEdit} className="input" {...register("activity")} rows={10}></textarea>
                                <span className="text-red-500">{errors.activity?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Resultados esperados:
                                <textarea disabled={!canEdit} className="input" {...register("expectedResults")} rows={10}></textarea>
                                <span className="text-red-500">{errors.expectedResults?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Objetivos:
                                <textarea disabled={!canEdit} className="input" {...register("objectives")} rows={10}></textarea>
                                <span className="text-red-500">{errors.objectives?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Metodologia:
                                <textarea disabled={!canEdit} className="input" {...register("methodology")} rows={10}></textarea>
                                <span className="text-red-500">{errors.methodology?.message}</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Custo do projeto:
                                <input disabled={!canEdit} type="text" className="input" {...register("cost")}/>
                                <span className="text-red-500">{errors.cost?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Tipo do projeto:
                                <input disabled={!canEdit} type="text" className="input" {...register("type")}/>
                                <span className="text-red-500">{errors.type?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Centro de custo:
                                <input disabled={!canEdit} type="text" className="input" {...register("cc")}/>
                                <span className="text-red-500">{errors.cc?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Público beneficiário:
                                <input disabled={!canEdit} type="text" className="input" {...register("public")}/>
                                <span className="text-red-500">{errors.public?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Identificação:
                                <input disabled={!canEdit} type="text" className="input" {...register("identification")}/>
                                <span className="text-red-500">{errors.identification?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Justificativa:
                                <textarea disabled={!canEdit} className="input" {...register("justification")} rows={10}></textarea>
                                <span className="text-red-500">{errors.justification?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Restrições:
                                <textarea disabled={!canEdit} className="input" {...register("restriction")} rows={10}></textarea>
                                <span className="text-red-500">{errors.restriction?.message}</span>
                            </label>
                        </div>
                        <div>
                            <label>Apresentação:
                                <textarea disabled={!canEdit} className="input" {...register("presentation")} rows={10}></textarea>
                                <span className="text-red-500">{errors.presentation?.message}</span>
                            </label>
                        </div>
=======
                        <label className="flex flex-col">Nome do projeto:
                            <input disabled={!canEdit} type="text" className="input" {...register("name")}/>
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </label>
                        <label className="flex flex-col">Data do projeto:
                            <input disabled={!canEdit} type="date" className="input" {...register("projectDate")}/>
                            {errors.projectDate && <span className="text-red-500">{errors.projectDate.message}</span>}
                        </label>
                        <label className="flex flex-col">Escopo do projeto:
                            <textarea disabled={!canEdit} className="input"  {...register("scope")} rows={10}></textarea>
                            {errors.scope && <span className="text-red-500">{errors.scope.message}</span>}
                        </label>
                        <label className="flex flex-col">Atividade:
                            <textarea disabled={!canEdit} className="input" {...register("activity")} rows={10}></textarea>
                            {errors.activity && <span className="text-red-500">{errors.activity.message}</span>}
                        </label>
                        <label className="flex flex-col">Resultados esperados:
                            <textarea disabled={!canEdit} className="input" {...register("expectedResults")} rows={10}></textarea>
                            {errors.expectedResults && <span className="text-red-500">{errors.expectedResults.message}</span>}
                        </label>
                        <label className="flex flex-col">Objetivos:
                            <textarea disabled={!canEdit} className="input" {...register("objectives")} rows={10}></textarea>
                            {errors.objectives && <span className="text-red-500">{errors.objectives.message}</span>}
                        </label>
                        <label className="flex flex-col">Metodologia:
                            <textarea disabled={!canEdit} className="input" {...register("methodology")} rows={10}></textarea>
                            {errors.methodology && <span className="text-red-500">{errors.methodology.message}</span>}
                        </label>
                    </div>
                    <div>
                        <label className="flex flex-col">Custo do projeto:
                            <input disabled={!canEdit} type="text" className="input" {...register("cost")}/>
                            {errors.cost && <span className="text-red-500">{errors.cost.message}</span>}
                        </label>
                        <label className="flex flex-col">Tipo do projeto:
                            <input disabled={!canEdit} type="text" className="input" {...register("type")}/>
                            {errors.type && <span className="text-red-500">{errors.type.message}</span>}
                        </label>
                        <label className="flex flex-col">Centro de custo:
                            <input disabled={!canEdit} type="text" className="input" {...register("cc")}/>
                            {errors.cc && <span className="text-red-500">{errors.cc.message}</span>}
                        </label>
                        <label className="flex flex-col">Público beneficiário:
                            <input disabled={!canEdit} type="text" className="input" {...register("public")}/>
                            {errors.public && <span className="text-red-500">{errors.public.message}</span>}
                        </label>
                        <label className="flex flex-col">Identificação:
                            <input disabled={!canEdit} type="text" className="input" {...register("identification")}/>
                            {errors.identification && <span className="text-red-500">{errors.identification.message}</span>}
                        </label>
                        <label className="flex flex-col">Justificativa:
                            <textarea disabled={!canEdit} className="input" {...register("justification")} rows={10}></textarea>
                            {errors.justification && <span className="text-red-500">{errors.justification.message}</span>}
                        </label>
                        <label className="flex flex-col">Restrições:
                            <textarea disabled={!canEdit} className="input" {...register("restriction")} rows={10}></textarea>
                            {errors.restriction && <span className="text-red-500">{errors.restriction.message}</span>}
                        </label>
                        <label className="flex flex-col">Apresentação:
                            <textarea disabled={!canEdit} className="input" {...register("presentation")} rows={10}></textarea>
                            {errors.presentation && <span className="text-red-500">{errors.presentation.message}</span>}
                        </label>
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
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
<<<<<<< HEAD
                            <span className="text-red-500">{errors.status?.message}</span>
=======
                            {errors.status && <span className="text-red-500">{errors.status.message}</span>}
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
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