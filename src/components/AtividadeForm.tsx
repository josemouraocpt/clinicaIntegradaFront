"use client"
import { usePathname, useRouter } from "next/navigation";
import { MyButton } from "./MyButton";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import atividadesService from "@/services/atividadesService";
import { requiredString } from "./ErroPreenchimento";
import { toast, Toaster } from "sonner";
import sistemaService from "@/services/sistemaService";

const schema = yup.object({
    name: requiredString('Nome da atividade obrigatório'),
    department: requiredString('Departamento responsável obrigatório'),
    responsibleName: requiredString('Profissional responsável obrigatório'),
    responsibleDocument: requiredString('Documento responsável obrigatório'),
    frequency: requiredString('Frequência obrigatório'),
    status: requiredString('Status obrigatório'),
    activityDate: requiredString('Data da atividade obrigatório'),
    startTime: requiredString('Horário de início brigatório'),
    endTime: requiredString('Horário de fim obrigatório'),
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
    const [attachmentName, setSttachmentName] = useState("");
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    const { getAtividadeStatus, createAtividade, getAtividadeById, editAtiviadade } = atividadesService;
 	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
    const { generateDownloadURL } = sistemaService;

    async function onSubmit(data: FormData){ 
        if(action == "CRIAR"){
            const res = await createAtividade(data, user.token); 
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                router.push("/atividades")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }else{
            const res = await editAtiviadade(Number(pathname.substring(20)),data, user.token);
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                router.push("/atividades")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
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
    }, []);

    function setValues(data: any){
        setSttachmentName(data.ANEXO);
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
        setValue("attachment", data.ANEXO);
    }

    function getAttachmentName(attachmentKey: string){
		const start = attachmentKey.search("-");
		return(attachmentKey.slice(start+1));
	}

	async function getDownloadUrl(key:string){
		try {
			const url = await generateDownloadURL(key);
			const res = await fetch(url);
			const blob = await res.blob();
			const blobUrl = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = blobUrl;
			a.download = getAttachmentName(key);
			a.click();
			a.remove();
			window.URL.revokeObjectURL(blobUrl); // Clean up the URL object
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	}

    async function onError(formErrors: FieldErrors<FormData>) {
        for (const value of Object.entries(formErrors)) {
            toast.error(value[1].message)
        } 
    } 

    return(
        <div className="bg-white p-5 rounded-md mb-20 shadow-lg mx-10">
            <form onSubmit={handleSubmit(onSubmit, onError)}  method="POST" encType="multipart/form-data">
                <Toaster richColors/>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="flex flex-col">Nome da atividade:
                            <input disabled={!canEdit} type="text" className="input" {...register("name")} />
                        </label>
                        <label className="flex flex-col">Departamento responsável:
                            <input disabled={!canEdit} type="text" className="input" {...register("department")}/>
                        </label>
                        <label className="flex flex-col">Profissional responsável:
                            <input disabled={!canEdit} type="text" className="input" {...register("responsibleName")}/>
                        </label>
                        <label className="flex flex-col">Documento do responsável:
                            <input disabled={!canEdit} type="text" className="input" {...register("responsibleDocument")}/>
                        </label>
                        <label className="flex flex-col">Frequência:
                            <input disabled={!canEdit} type="text" className="input" {...register("frequency")}/>
                        </label>
                        <label className="flex flex-col">Data da atividade:
                            <input disabled={!canEdit} type="date" className="input" {...register("activityDate")}/>
                        </label>
                    </div>
                    <div>
                        <label className="flex flex-col">Horário de início:
                            <input disabled={!canEdit} type="text" className="input" {...register("startTime")}/>
                        </label>
                        <label className="flex flex-col">Horário de fim:
                            <input disabled={!canEdit} type="text" className="input" {...register("endTime")}/>
                        </label>
                        <label className="flex flex-col">Status:
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
                        {attachmentName == "" ? (
                            <label>Anexo:
                                <input disabled={!canEdit} type="file" className="input" {...register("attachment")}/>
                            </label>
                        ): (
                            <div>
                                <h3 className="text-center font-bold text-lg">Anexo</h3>
                                <div className="border-2 rounded shadow-md p-2">
                                    <h4 className="text-lg">Nome: {getAttachmentName(attachmentName)}</h4>
                                    <button type="button" className="w-full mt-4 bg-button text-white py-2 px-4 rounded-lg hover:bg-button-hover transition" onClick={() => {getDownloadUrl(attachmentName)}}>Baixar</button>
                                </div>
                            </div>
                        )}
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