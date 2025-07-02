'use client'
import { ContainerHospedes } from "@/components/ContainerHospedes";
import { MyButton } from "@/components/MyButton";
import hospedeService from "@/services/hospedeService";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import * as yup from "yup";
 
interface IRemedio {
    idREMEDIOS?: number;
    NOME: string;
    FREQUENCIA_USO: string;
    TEMPO_USO: string;
    DOSAGEM: string;
}

interface IDadosMedicos {
    idDADOS_MEDICOS?: number;
    REMEDIOS_idREMEDIOS: number;
    DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS: number;
    GRAU_DEPENDENCIA: number;
    OBSERVACOES: string;
}

interface IDoencasAlergiasDietas {
    idDOENCAS_ALERGIAS_DIETAS?: number;
    TIPO: string;
    DESCRICAO: string;
  }

const schema = yup.object({
    idREMEDIOS: yup.number(),
    NOME: yup.string().required("Nome do medicamento é obrigatório"),
    FREQUENCIA_USO: yup.string().required("Frequência de uso é obrigatório"),
    TEMPO_USO: yup.string().required("Tempo de uso é obrigatório"),
	DOSAGEM: yup.string().required("Dosagem é obrigatória"),
    idDADOS_MEDICOS: yup.number(),
    REMEDIOS_idREMEDIOS: yup.number(),
    DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS: yup.number(),
	GRAU_DEPENDENCIA: yup.string().required("Grau de dependência é obrigatório"),
	OBSERVACOES: yup.string().required("Observações é obrigatório"),
    HOSPEDE_idHOSPEDE: yup.number(),
    idDOENCAS_ALERGIAS_DIETAS: yup.number(),
	TIPO: yup.string().required("Tipo é obrigatório"),
	DESCRICAO: yup.string().required("Descrição é obrigatória"),

    idREMEDIOS2: yup.number(),
    NOME2: yup.string(),
    FREQUENCIA_USO2: yup.string(),
    TEMPO_USO2: yup.string(),
	DOSAGEM2: yup.string(),
    idDADOS_MEDICOS2: yup.number(),
    REMEDIOS_idREMEDIOS2: yup.number(),
    DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS2: yup.number(),
	GRAU_DEPENDENCIA2: yup.string(),
	OBSERVACOES2: yup.string(),
    HOSPEDE_idHOSPEDE2: yup.number(),
    idDOENCAS_ALERGIAS_DIETAS2: yup.number(),
	TIPO2: yup.string(),
	DESCRICAO2: yup.string(),

    idREMEDIOS3: yup.number(),
    NOME3: yup.string(),
    FREQUENCIA_USO3: yup.string(),
    TEMPO_USO3: yup.string(),
	DOSAGEM3: yup.string(),
    idDADOS_MEDICOS3: yup.number(),
    REMEDIOS_idREMEDIOS3: yup.number(),
    DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS3: yup.number(),
	GRAU_DEPENDENCIA3: yup.string(),
	OBSERVACOES3: yup.string(),
    HOSPEDE_idHOSPEDE3: yup.number(),
    idDOENCAS_ALERGIAS_DIETAS3: yup.number(),
	TIPO3: yup.string(),
	DESCRICAO3: yup.string(),
});


type FormData = yup.InferType<typeof schema>;

export default function Ficha(){
    const [canEdit, setCanEdit] = useState(false);
    const [canEdit2, setCanEdit2] = useState(false);
    const [count, setCount] = useState(0);
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    const pathname = usePathname();
    const router = useRouter();
    const { getHospedeRemedios, getHospedeFicha, getHospedeComplicacoes, postHospedeFicha, putHospedeFicha, postHospedeRemedio, putHospedeRemedio, postHospedeComplicacoes, putHospedeComplicacoes, deleteHospedeDadosMedicos } = hospedeService;
    const [hospedeData, setHospedeData] = useState([]);
    const { register, handleSubmit, formState: { errors }, setValue,  getValues } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

    function handleClick1(){
        setCount(count + 1);
        if(canEdit2 == false){
            setCanEdit2(!canEdit2);
        }
    }

    function setValuesRemedios(data: any, index: number){
        if(index == 0){
            setValue("idREMEDIOS", data.idREMEDIOS)
            setValue("NOME", data.NOME)
            setValue("FREQUENCIA_USO", data.FREQUENCIA_USO)
            setValue("TEMPO_USO", data.TEMPO_USO)
            setValue("DOSAGEM", data.DOSAGEM)
        }
        if(index == 1){
            setValue("idREMEDIOS2", data.idREMEDIOS)
            setValue("NOME2", data.NOME)
            setValue("FREQUENCIA_USO2", data.FREQUENCIA_USO)
            setValue("TEMPO_USO2", data.TEMPO_USO)
            setValue("DOSAGEM2", data.DOSAGEM)
        }
        if(index == 2){
            setValue("idREMEDIOS3", data.idREMEDIOS)
            setValue("NOME3", data.NOME)
            setValue("FREQUENCIA_USO3", data.FREQUENCIA_USO)
            setValue("TEMPO_USO3", data.TEMPO_USO)
            setValue("DOSAGEM3", data.DOSAGEM)
        }
    }

    function setValuesFicha(data: any, index: number){
        if(index == 0){
            setValue("idDADOS_MEDICOS", data.idDADOS_MEDICOS)
            setValue("REMEDIOS_idREMEDIOS", data.REMEDIOS_idREMEDIOS)
            setValue("DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS", data.DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS)
            setValue("GRAU_DEPENDENCIA", data.GRAU_DEPENDENCIA)
            setValue("OBSERVACOES", data.OBSERVACOES)
            setValue("HOSPEDE_idHOSPEDE", data.HOSPEDE_idHOSPEDE) 
        }
        if(index == 1){
            setValue("idDADOS_MEDICOS2", data.idDADOS_MEDICOS)
            setValue("REMEDIOS_idREMEDIOS2", data.REMEDIOS_idREMEDIOS)
            setValue("DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS2", data.DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS)
            setValue("GRAU_DEPENDENCIA2", data.GRAU_DEPENDENCIA)
            setValue("OBSERVACOES2", data.OBSERVACOES)
            setValue("HOSPEDE_idHOSPEDE2", data.HOSPEDE_idHOSPEDE)
        }
        if(index == 2){
            setValue("idDADOS_MEDICOS3", data.idDADOS_MEDICOS)
            setValue("REMEDIOS_idREMEDIOS3", data.REMEDIOS_idREMEDIOS)
            setValue("DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS3", data.DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS)
            setValue("GRAU_DEPENDENCIA3", data.GRAU_DEPENDENCIA)
            setValue("OBSERVACOES3", data.OBSERVACOES)
            setValue("HOSPEDE_idHOSPEDE3", data.HOSPEDE_idHOSPEDE)
        }
    }

    function setValuesComplicacoes(data: any, index: number){
        if(index == 0){
            setValue("idDOENCAS_ALERGIAS_DIETAS", data.idDOENCAS_ALERGIAS_DIETAS)
            setValue("TIPO", data.TIPO)
            setValue("DESCRICAO", data.DESCRICAO)
        }
        if(index == 1){
            setValue("idDOENCAS_ALERGIAS_DIETAS2", data.idDOENCAS_ALERGIAS_DIETAS)
            setValue("TIPO2", data.TIPO)
            setValue("DESCRICAO2", data.DESCRICAO)
        }
        if(index == 2){
            setValue("idDOENCAS_ALERGIAS_DIETAS3", data.idDOENCAS_ALERGIAS_DIETAS)
            setValue("TIPO3", data.TIPO)
            setValue("DESCRICAO3", data.DESCRICAO)
        }
    }

    async function onSubmit(data: FormData) {
        if(count >= 1){
            if(data.NOME2 === "") return toast.error("Nome do medicamento é obrigatório");
            if(data.FREQUENCIA_USO2 === "") return toast.error("Frequência de uso é obrigatório");
            if(data.TEMPO_USO2 === "") return toast.error("Tempo de uso é obrigatório");
            if(data.DOSAGEM2 === "") return toast.error("Dosagem é obrigatória");
            if(data.GRAU_DEPENDENCIA2 === "") return toast.error("Grau de dependência é obrigatório");
            if(data.OBSERVACOES2 === "") return toast.error("Observações é obrigatório");
            if(data.TIPO2 === "") return toast.error("Tipo é obrigatório");
            if(data.DESCRICAO2 === "") return toast.error("Descrição é obrigatória");

            if(data.NOME3 === "") return toast.error("Nome do medicamento é obrigatório");
            if(data.FREQUENCIA_USO3 === "") return toast.error("Frequência de uso é obrigatório");
            if(data.TEMPO_USO3 === "") return toast.error("Tempo de uso é obrigatório");
            if(data.DOSAGEM3 === "") return toast.error("Dosagem é obrigatória");
            if(data.GRAU_DEPENDENCIA3 === "") return toast.error("Grau de dependência é obrigatório");
            if(data.OBSERVACOES3 === "") return toast.error("Observações é obrigatório");
            if(data.TIPO3 === "") return toast.error("Tipo é obrigatório");
            if(data.DESCRICAO3 === "") return toast.error("Descrição é obrigatória");
        }
        
        const remediosToSend =  [];
        const dadosMedicosToSend = [];
        const complicacoesToSend = [];
        //separar em objetos os campos do formulario
        const remedios = {
            idREMEDIOS: data.idREMEDIOS,
            NOME: data.NOME,
            FREQUENCIA_USO: data.FREQUENCIA_USO,
            TEMPO_USO: data.TEMPO_USO,
            DOSAGEM: data.DOSAGEM,
        };
        const dadosMedicos = {
            idDADOS_MEDICOS: data.idDADOS_MEDICOS,
            REMEDIOS_idREMEDIOS: data.REMEDIOS_idREMEDIOS,
            DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS: data.DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS,
            GRAU_DEPENDENCIA: data.GRAU_DEPENDENCIA,
            OBSERVACOES: data.OBSERVACOES,
            HOSPEDE_idHOSPEDE: Number(pathname.substring(16))
        };
        const compliacacoes = {
            idDOENCAS_ALERGIAS_DIETAS: data.idDOENCAS_ALERGIAS_DIETAS,
            TIPO: data.TIPO,
            DESCRICAO: data.DESCRICAO,
        };
        remediosToSend.push(remedios);
        dadosMedicosToSend.push(dadosMedicos);
        complicacoesToSend.push(compliacacoes);
        if(count >= 1 || hospedeData.length > 1){
            const remedios2 = {
                idREMEDIOS: data.idREMEDIOS2,
                NOME: data.NOME2,
                FREQUENCIA_USO: data.FREQUENCIA_USO2,
                TEMPO_USO: data.TEMPO_USO2,
                DOSAGEM: data.DOSAGEM2,
            };
            const dadosMedicos2 = {
                idDADOS_MEDICOS: data.idDADOS_MEDICOS2,
                REMEDIOS_idREMEDIOS: data.REMEDIOS_idREMEDIOS2,
                DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS: data.DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS2,
                GRAU_DEPENDENCIA: data.GRAU_DEPENDENCIA2,
                OBSERVACOES: data.OBSERVACOES2,
                HOSPEDE_idHOSPEDE: Number(pathname.substring(16))
            };
            remediosToSend.push(remedios2);
            dadosMedicosToSend.push(dadosMedicos2);
        }
        if(count >= 2 || hospedeData.length > 2){
            const remedios3 = {
                idREMEDIOS: data.idREMEDIOS3,
                NOME: data.NOME3,
                FREQUENCIA_USO: data.FREQUENCIA_USO3,
                TEMPO_USO: data.TEMPO_USO3,
                DOSAGEM: data.DOSAGEM3,
            };
            const dadosMedicos3 = {
                idDADOS_MEDICOS: data.idDADOS_MEDICOS3,
                REMEDIOS_idREMEDIOS: data.REMEDIOS_idREMEDIOS3,
                DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS: data.DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS3,
                GRAU_DEPENDENCIA: data.GRAU_DEPENDENCIA3,
                OBSERVACOES: data.OBSERVACOES3,
                HOSPEDE_idHOSPEDE: Number(pathname.substring(16))
            };
            remediosToSend.push(remedios3);
            dadosMedicosToSend.push(dadosMedicos3);
        }
        if(count >= 1 || hospedeData.length > 1){
            const compliacacoes2 = {
                idDOENCAS_ALERGIAS_DIETAS: data.idDOENCAS_ALERGIAS_DIETAS2,
                TIPO: data.TIPO2,
                DESCRICAO: data.DESCRICAO2,
            };
            complicacoesToSend.push(compliacacoes2);
        }
        if(count >= 2 || hospedeData.length > 2){
            const compliacacoes3 = {
                idDOENCAS_ALERGIAS_DIETAS: data.idDOENCAS_ALERGIAS_DIETAS3,
                TIPO: data.TIPO3,
                DESCRICAO: data.DESCRICAO3,
            };
            complicacoesToSend.push(compliacacoes3);
        }

        const remediosToUpdate = remediosToSend.filter((obj) => { return obj.idREMEDIOS !== undefined });
        const dadosMedicosToUpdate = dadosMedicosToSend.filter((obj) => { return obj.idDADOS_MEDICOS !== undefined });
        const complicacoesToUpdate = complicacoesToSend.filter((obj) => { return obj.idDOENCAS_ALERGIAS_DIETAS !== undefined });
        //enviar atualizações

        const res1 = await putHospedeComplicacoes(Number(pathname.substring(16)), complicacoesToUpdate, user.token);
        const res2 = await putHospedeFicha(Number(pathname.substring(16)), dadosMedicosToUpdate, user.token);
        const res3 = await putHospedeRemedio(Number(pathname.substring(16)), remediosToUpdate, user.token);

        //caso necessário enviar novos registros
        const remediosToCreate = remediosToSend.filter((obj) => { return obj.idREMEDIOS === undefined });
        const dadosMedicosToCreate = dadosMedicosToSend.filter((obj) => { return obj.idDADOS_MEDICOS === undefined });
        const complicacoesToCreate = complicacoesToSend.filter((obj) => { return obj.idDOENCAS_ALERGIAS_DIETAS === undefined });

        let remediosIds = [];
        let complicacoesIds = []

        if(remediosToCreate.length !== 0){
            remediosToCreate.map((obj) => {
                delete obj.idREMEDIOS 
            })
            const res = await postHospedeRemedio(remediosToCreate, user.token);
            remediosIds = res.data
        }

        if(complicacoesToCreate.length !== 0){
            complicacoesToCreate.map((obj) => {
                delete obj.idDOENCAS_ALERGIAS_DIETAS
            })
            const res = await postHospedeComplicacoes(complicacoesToCreate, user.token);
            complicacoesIds = res.data
        }

        if(dadosMedicosToCreate.length !== 0){
            dadosMedicosToCreate.map((obj, index) => {
                delete obj.idDADOS_MEDICOS
                obj.REMEDIOS_idREMEDIOS = remediosIds[index] 
                obj.DOENCAS_ALERGIAS_DIETAS_idDOENCAS_ALERGIAS_DIETAS = complicacoesIds[index]
            })
            await postHospedeFicha(dadosMedicosToCreate, user.token);
        }

        if(res1.type == "SUCCESS" && res2.type == "SUCCESS" && res3.type == "SUCCESS" ){
            router.push("/hospedes")
        }
    }

    async function handleDelete(id: number){
        const res = await deleteHospedeDadosMedicos(id, user.token);
        if(res.type == "SUCCESS"){
            toast.success("Ação realizada com sucesso!");{}
            router.push("/hospedes");
        } else {
            toast.error("Algo não está certo.Tente novamente!");
            return;
        }
    }

    useEffect(() => {
        async function fecth() {
            const res1 = await getHospedeFicha(Number(pathname.substring(16)), user.token);
            const res2 = await getHospedeComplicacoes(Number(pathname.substring(16)), user.token);
            const res3 = await getHospedeRemedios(Number(pathname.substring(16)), user.token);
            setHospedeData(res1.data)
            res1.data.map((obj, index) => {
                setValuesFicha(obj, index);
            })
            res2.data.map((obj, index) => {
                setValuesComplicacoes(obj, index);
            })
            res3.data.map((obj, index) => {
                setValuesRemedios(obj, index)
            })            
        }
        fecth();
    }, []);

    async function onError(formErrors: FieldErrors<FormData>) {
        for (const value of Object.entries(formErrors)) {
            toast.error(value[1].message)
        }
    } 
    
    return(
        <div className="min-h-screen">
            <ContainerHospedes/>
            <div>
                <h1 className="text-center text-xl font-bold">Dados de saúde do Hospede.</h1>
            </div>
            <div className="bg-white m-10 p-4 rounded-md shadow-md">
                <form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit, onError)}>
                    <Toaster richColors/>
                    <div>
                        <div className="mt-4">
                            <h2 className="font-bold">Grau de dependência</h2>
                            <div className="space-x-3">
                                <select disabled={!canEdit} className="input" {...register("GRAU_DEPENDENCIA")}>
                                    <option hidden={true}></option>
                                    <option value="1">1 - Pouco dependente</option>
                                    <option value="2">2 - Dependente</option>
                                    <option value="3">3 - Muito dependente</option>
                                </select>
                            </div>
                            <small className="text-sm opacity-50">** 1 (Pouco dependente), 2 (Dependente), 3 (Muito dependente)</small>
                        </div>
                        <div>
                            <h2 className="font-bold">Histórico de Medicamentos</h2>
                            <div className="flex space-x-3">
                                <label>Nome do Medicamento:
                                    <input disabled={!canEdit} type="text" className="input" {...register("NOME")}/>
                                </label>
                                <label>Frequência do Medicamento:
                                    <input disabled={!canEdit} type="text" className="input" {...register("FREQUENCIA_USO")}/>
                                </label>
                                <label>Tempo de Uso:
                                    <input disabled={!canEdit} type="text" className="input" {...register("TEMPO_USO")}/>
                                </label>
                                <label>Dosagem:
                                    <input disabled={!canEdit} type="text" className="input" {...register("DOSAGEM")}/>
                                </label>
                            </div>
                        </div>
                        <div>
                            <h2 className="font-bold">Observações</h2>
                            <textarea disabled={!canEdit} placeholder="Descrição" className="input w-full resize-none" rows={2} {...register("OBSERVACOES")}/>
                        </div>
                        <div className="my-4" hidden={!(hospedeData.length > 1)}>
                            <MyButton buttonText="Remover" buttonType="button" handleClick={() => { handleDelete(getValues("idDADOS_MEDICOS")) }}/>
                        </div>
                    </div>
                    {(count >= 1 || hospedeData.length > 1) && (
                        <div>
                            <div className="mt-4">
                                <h2 className="font-bold">Grau de dependência</h2>
                                <div className="space-x-3">
                                    <select disabled={!canEdit2} className="input" {...register("GRAU_DEPENDENCIA2")}>
                                        <option hidden={true}></option>
                                        <option value="1">1 - Pouco dependente</option>
                                        <option value="2">2 - Dependente</option>
                                        <option value="3">3 - Muito dependente</option>
                                    </select>
                                </div>
                                <small className="text-sm opacity-50">** 1 (Pouco dependente), 2 (Dependente), 3 (Muito dependente)</small>
                            </div>
                            <div>
                                <h2 className="font-bold">Histórico de Medicamentos</h2>
                                <div className="flex space-x-3">
                                    <label>Nome do Medicamento:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("NOME2")}/>
                                    </label>
                                    <label>Frequência do Medicamento:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("FREQUENCIA_USO2")}/>
                                    </label>
                                    <label>Tempo de Uso:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("TEMPO_USO2")}/>
                                    </label>
                                    <label>Dosagem:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("DOSAGEM2")}/>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold">Observações</h2>
                                <textarea disabled={!canEdit2} placeholder="Descrição" className="input w-full resize-none" rows={2} {...register("OBSERVACOES2")}/>
                            </div>
                            { hospedeData.length > 1 && ( 
                                <div className="my-4">
                                    <MyButton buttonText="Remover" buttonType="button" handleClick={() => { handleDelete(getValues("idDADOS_MEDICOS2")) }}/>
                                </div>
                            )}
                        </div>
                    )}
                    {(count >= 2 || hospedeData.length > 2) && (
                        <div>
                            <div className="mt-4">
                                <h2 className="font-bold">Grau de dependência</h2>
                                <div className="space-x-3">
                                    <select disabled={!canEdit2} className="input" {...register("GRAU_DEPENDENCIA3")}>
                                        <option hidden={true}></option>
                                        <option value="1">1 - Pouco dependente</option>
                                        <option value="2">2 - Dependente</option>
                                        <option value="3">3 - Muito dependente</option>
                                    </select>
                                </div>
                                <small className="text-sm opacity-50">** 1 (Pouco dependente), 2 (Dependente), 3 (Muito dependente)</small>
                            </div>
                            <div>
                                <h2 className="font-bold">Histórico de Medicamentos</h2>
                                <div className="flex space-x-3">
                                    <label>Nome do Medicamento:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("NOME3")}/>
                                    </label>
                                    <label>Frequência do Medicamento:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("FREQUENCIA_USO3")}/>
                                    </label>
                                    <label>Tempo de Uso:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("TEMPO_USO3")}/>
                                    </label>
                                    <label>Dosagem:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("DOSAGEM3")}/>
                                    </label>
                                </div>
                            </div>
                            <div>
                                <h2 className="font-bold">Observações</h2>
                                <textarea disabled={!canEdit2} placeholder="Descrição" className="input w-full resize-none" rows={2} {...register("OBSERVACOES3")}/>
                            </div>
                            { hospedeData.length > 2 && ( 
                                <div className="my-4">
                                    <MyButton buttonText="Remover" buttonType="button" handleClick={() => { handleDelete(getValues("idDADOS_MEDICOS3")) }}/>
                                </div>
                            )}
                        </div>
                    )}
                    <div>
                        <h2 className="font-bold">Doenças, Alergias e Dietas</h2>
                        <div>
                            <div className="flex flex-col">
                                <label className="w-2/5">Tipo:
                                    <select disabled={!canEdit} className="input" {...register("TIPO")}>
                                        <option hidden={true}></option>
                                        <option value="alergia">Alergia</option>
                                        <option value="doenca">Doença</option>
                                        <option value="dieta">Dieta</option>
                                    </select>
                                </label>
                                <label className="w-2/5">Descrição:
                                    <input disabled={!canEdit} type="text" className="input" {...register("DESCRICAO")}/>
                                </label>
                            </div>
                        </div>
                    </div>
                    {(count >= 1 || hospedeData.length > 1) && (
                        <div>
                            <h2 className="font-bold">Doenças, Alergias e Dietas</h2>
                            <div>
                                <div className="flex flex-col">
                                    <label className="w-2/5">Tipo:
                                        <select disabled={!canEdit2} className="input" {...register("TIPO2")}>
                                            <option hidden={true}></option>
                                            <option value="alergia">Alergia</option>
                                            <option value="doenca">Doença</option>
                                            <option value="dieta">Dieta</option>
                                        </select>
                                    </label>
                                    <label className="w-2/5">Descrição:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("DESCRICAO2")}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                    {(count >= 2 || hospedeData.length > 2) && (
                        <div>
                            <h2 className="font-bold">Doenças, Alergias e Dietas</h2>
                            <div>
                                <div className="flex flex-col">
                                    <label className="w-2/5">Tipo:
                                        <select disabled={!canEdit2} className="input" {...register("TIPO3")}>
                                            <option hidden={true}></option>
                                            <option value="alergia">Alergia</option>
                                            <option value="doenca">Doença</option>
                                            <option value="dieta">Dieta</option>
                                        </select>
                                    </label>
                                    <label className="w-2/5">Descrição:
                                        <input disabled={!canEdit2} type="text" className="input" {...register("DESCRICAO3")}/>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}
                    {count == 3 && (
                        <h1>Não é possivel incluir mais que 3.</h1>
                    )}
                    <div className="flex justify-end space-x-2 m-3" hidden={["SOCIAL", "ADMIN"].includes(user.user.access) ? true : false}>
                        <MyButton buttonText="Editar" buttonType="button" handleClick={() => setCanEdit(!canEdit)} />
                        <MyButton buttonText="Incluir" buttonType="button" handleClick={handleClick1} disable={count == 3}/>
                        <MyButton buttonText="Enviar" buttonType="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}