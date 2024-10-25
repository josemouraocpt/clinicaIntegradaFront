"use client"
import { usePathname, useRouter } from "next/navigation";
import { MyButton } from "./MyButton";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import atividadesService from "@/services/atividadesService";

const schema = yup.object({
    name: yup.string(),
    department: yup.string(),
    responsibleName: yup.string(),
    responsibleDocument: yup.string(),
    frequency: yup.string(),
    status: yup.string(),
    activityDate: yup.string(),
    startTime: yup.string(),
    endTime: yup.string(),
    observation: yup.string(),
    attachment: yup.mixed(),
});

type FormData = yup.InferType<typeof schema>;

interface IAtividadeFormProps{
    action: string
}

export function AtividadeForm({action}: IAtividadeFormProps){
    const router = useRouter();
    const pathname = usePathname();
    const [statusData, setStatusData] = useState();
    const [canEdit, setCanEdit] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { getAtividadeStatus, createAtividade, getAtividadeById, editAtiviadade } = atividadesService;
 	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

    async function onSubmit(data: FormData){
        if(action == "CRIAR"){
            data.attachment = data.attachment[0].name;
            const res = await createAtividade(data, user.token);
            if(res.type == "SUCCESS"){
                router.push("/atividades")
            }
        }else{
            const res = await editAtiviadade(Number(pathname.substring(20)),data, user.token);
            if(res.type == "SUCCESS"){
                router.push("/atividades")
            }
        }

	};

    useEffect(() => {
        async function fetch(){
            const res = await getAtividadeStatus(user.token);
            setStatusData(res.data);
            if(action == "EDITAR"){
                const res2 = await getAtividadeById(Number(pathname.substring(20)), user.token);
                setValues(res2.data[0])
            }
        }
        fetch()
        setValue("usuarioId", user.user.userId);
        if(action == "CRIAR"){
            setCanEdit(!canEdit);
        }
    }, [user, getAtividadeById, getAtividadeStatus]);

    function setValues(data: any){
        setValue("activityDate", data.DATA_ATIVIDADE.substring(0,10));
        setValue("department", data.DEPARTAMENTO);
        setValue("endTime", data.HORARIO_FIM);
        setValue("frequency", data.FREQUENCIA);
        setValue("name", data.NOME);
        setValue("observation", data.OBSERVACOES);
        setValue("responsibleDocument", data.RESPONSAVEL_DOCUMENTO);
        setValue("responsibleName", data.RESPONSAVEL_NOME);
        setValue("startTime", data.HORARIO_INICIO);
        setValue("status", data.STATUS_ATIVIDADE);
    }

    return(
        <div className="bg-white p-5 rounded-md mb-20 shadow-lg mx-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>Nome da atividade:
                            <input disabled={!canEdit} type="text" className="input" {...register("name")} />
                        </label>
                        <label>Departamento responsável:
                            <input disabled={!canEdit} type="text" className="input" {...register("department")}/>
                        </label>
                        <label>Profissional responsável:
                            <input disabled={!canEdit} type="text" className="input" {...register("responsibleName")}/>
                        </label>
                        <label>Documento do responsável:
                            <input disabled={!canEdit} type="text" className="input" {...register("responsibleDocument")}/>
                        </label>
                        <label>Frequência:
                            <input disabled={!canEdit} type="text" className="input" {...register("frequency")}/>
                        </label>
                        <label>Data da atividade:
                            <input disabled={!canEdit} type="date" className="input" {...register("activityDate")}/>
                        </label>
                    </div>
                    <div>
                        <label>Horário de início:
                            <input disabled={!canEdit} type="text" className="input" {...register("startTime")}/>
                        </label>
                        <label>Horário de fim:
                            <input disabled={!canEdit} type="text" className="input" {...register("endTime")}/>
                        </label>
                        <label>Status:
                            <select className="input" {...register("status")} disabled={!canEdit}>
                                <option hidden={true}></option>
                                {statusData && (
                                    //@ts-ignore
                                    statusData.map((status) => (
                                        <option value={status.STATUS_VALUE} key={status.idSTATUS_DOMAIN}>{status.STATUS_DESCRIPTION}</option>
                                    ))
                                )}
                            </select>
                        </label>
                        <label>Observações:
                            <textarea disabled={!canEdit} className="input" rows={10} {...register("observation")}></textarea>
                        </label>
                        <label>Anexo:
                            <input disabled={!canEdit} type="file" className="input" {...register("attachment")} />
                        </label>
                    </div>
                </div>
                <div className="my-2 flex justify-end space-x-2">
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