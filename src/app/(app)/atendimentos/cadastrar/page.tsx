"use client"
import { ContainerAtendimento } from "@/components/ContainerAtendimento";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import atendimentoService from "@/services/atendimentoService";
import hospedeService from "@/services/hospedeService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import * as yup from "yup"; 

const schema = yup.object({
    hospedeId: yup.number(),
    usuarioId: yup.number(),
    tipo: yup.string().required("O tipo do atendimento é obrigatório"),
    dataAtendimento: yup.string().required("A data do atendimento é obrigatório"),
    motivo: yup.string().required("O motivo do atendimento é obrigatório"),
    procedimento: yup.string().required("O procedimento do atendimento é obrigatório"),
    recomendacoes: yup.string(),
    nomeMedico: yup.string().required("O médico do atendimento é obrigatório"),
    docMedico: yup.string().required("O documento do médico do atendimento é obrigatório"),
    anexo: yup.mixed(),
});

type FormData = yup.InferType<typeof schema>;

export default function CadastrarAtendimento(){
    const [hospedes, setHospedes] = useState();
    const { getHospedesAtivos } = hospedeService;
    const { createAtendimento } = atendimentoService;
    const router = useRouter();
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
 	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

    async function onSubmit(data: FormData){
        const res = await createAtendimento(data, user.token);
        if(res.type == "SUCCESS"){
            toast.success("Ação realizada com sucesso!");{}
            router.push("/atendimentos")
        } else {
            toast.error("Algo não está certo.Tente novamente!");
            return;
        }
	};

    useEffect(() => {
        async function fetch(){
            const res = await getHospedesAtivos(user.token);
            setHospedes(res.data)
        }
        fetch()
        setValue("usuarioId", user.user.userId);
    }, []);

    async function onError(formErrors: FieldErrors<FormData>) {
        for (const value of Object.entries(formErrors)) {
            toast.error(value[1].message)
        }
    }

    return( 
        <div className="min-h-screen">
            <ContainerAtendimento/>
            <SetorInfo setor="Atendimentos"/>
            <div className="m-10 bg-white p-8 rounded-lg shadow-xl">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <Toaster richColors/>
                    <div className="grid grid-cols-2 gap-2 gap-x-6">
                        <div>
                            <label>Tipo do atendimento:
                                <input type="text" className="input" {...register("tipo")} />
                            </label>
                            <label>Data do atendimento:
                                <input type="date" className="input" {...register("dataAtendimento")}/>
                            </label>
                            <label>Motivo do atendimento:
                                <input type="text" className="input" {...register("motivo")}/>
                            </label>
                            <label>Procedimento realizado:
                                <textarea className="input" rows={10} {...register("procedimento")}></textarea>
                            </label>
                            <label>Hóspede:
                                <select className="input" {...register("hospedeId")}>
                                    <option hidden={true}></option>
                                    {hospedes && (
                                        //@ts-expect-error
                                        hospedes.map((hospede) => (
                                            <option value={hospede.idHOSPEDE} key={hospede.idHOSPEDE}>{hospede.NOME_COMPLETO}</option>
                                        ))
                                    )}
                                </select>
                            </label>
                        </div>
                        <div>
                            <label>Recomendações:
                                <textarea className="input" rows={10} {...register("recomendacoes")}></textarea>
                            </label>
                            <label>Nome do Médico:
                                <input type="text" className="input" {...register("nomeMedico")} />
                            </label>
                            <label>Documento do Médico:
                                <input type="text" className="input" {...register("docMedico")} />
                            </label>
                            <label>Anexo:
                                <input type="file" className="input" {...register("anexo")} />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end m-2">
                        <MyButton buttonText="Salvar" buttonType="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}