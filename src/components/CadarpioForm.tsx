"use client"
import { usePathname, useRouter } from "next/navigation";
import { FieldErrors, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cozinhaService from "@/services/cozinhaService";
import { useEffect, useState } from "react";
import { MyButton } from "./MyButton";
import { requiredString } from "./ErroPreenchimento";
import { toast, Toaster } from "sonner";

const schema = yup.object({
    date: requiredString('Data do cardápio obrigatório'),
    time: requiredString('Horário do cardápio obrigatório'),
    name: requiredString('Título do cardápio obrigatório'),
    description: requiredString('Descrição do cardápio obrigatório'),
    userId: yup.number(),
    type: requiredString('Tipo do cardápio obrigatório'),
    status: requiredString('Status do cardápio obrigatório'),
});

type FormData = yup.InferType<typeof schema>;

interface ICardapioProps{
    action: string
}

export function CardapioForm({action}: ICardapioProps){
    const router = useRouter();
    const pathname = usePathname();
    const [status, setStatus] = useState();
    const [canEdit, setCanEdit] = useState(false);
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    const { createCardapio, getCardapioStatus, editCardapio, getCardapioById } = cozinhaService;
 	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

    async function onSubmit(data: FormData){
        if(action == "CRIAR"){
            const res = await createCardapio(data, user.token);
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                router.push("/cozinha")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }else{
            const res = await editCardapio(Number(pathname.substring(26)), data, user.token);
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                router.push("/cozinha")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }
	};

    useEffect(() => {
        async function fetch(){
            try{
                const res = await getCardapioStatus(user.token);
            if(action == "EDITAR"){
                const res2 = await getCardapioById(Number(pathname.substring(26)), user.token);
                setCadapioData(res2.data[0]);
            }
            setStatus(res.data);
        }catch (error) {
            alert(`Erro: ${error.message || "Algo deu errado ao buscar os dados do cardápio."}`);
            console.error("Erro ao buscar dados:", error); 
        }
    }
            
        setValue("userId", user.user.userId);
        if(action == "CRIAR"){
            setCanEdit(!canEdit);
        }
        fetch()
    }, []);

    function setCadapioData(data: any){
        setValue("date", formatDate(data.DATA_CARDAPIO))
        setValue("status", data.STATUS_CARDAPIO)
        setValue("description", data.DESCRICAO)
        setValue("name", data.NOME)
        setValue("time", data.HORARIO)
        setValue("type", data.TIPO)
    };

    function formatDate(data: string){
		return data.substring(0,10)
	}

        async function onError(formErrors: FieldErrors<FormData>) {
            for (const value of Object.entries(formErrors)) {
                toast.error(value[1].message)
            }
        }

    return(
        <div className='bg-white p-5 rounded-md mb-20 shadow-lg m-10'>
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Toaster richColors/>
                <label className="flex flex-col">Título do cardápio:
                    <input className="input" readOnly={!canEdit} type="text" {...register("name")} />
                </label>
                <label className="flex flex-col">Data do cardápio:
                    <input className="input" readOnly={!canEdit} type="date" {...register("date")} />
                </label>
                <label className="flex flex-col">Horário do cardárpio:
                    <input className="input" readOnly={!canEdit} type="text" {...register("time")} />
                </label>
                <label className="flex flex-col">Descrição do cardápio:
                    <textarea className="input" readOnly={!canEdit} rows={10} {...register("description")}/>
                </label>
                <label className="flex flex-col">Tipo do cardárpio:
                    <select className="input" {...register("type")} disabled={!canEdit}>
                        <option hidden={true}></option>
                        <option value="PADRAO">Cardápio Padrão</option>
                        <option value="ESPECIAL">Cardápio Especial</option>
                    </select>
                </label>
                <label className="flex flex-col">Status do cardárpio:
                    <select className="input" {...register("status")} disabled={!canEdit}>
                        <option hidden={true}></option>
                        {status && (
                            //@ts-ignore
                            status.map((value) => (
                                <option value={value.STATUS_VALUE} key={value.idSTATUS_DOMAIN}>{value.STATUS_DESCRIPTION}</option>
                            ))
                        )}
                    </select>
                </label>
                <div className='flex space-x-2 items-center justify-end m-4'>
                    {action == "EDITAR" ? (
                        <>
                            <MyButton buttonText="Salvar" buttonType="submit"/>
                            <MyButton buttonText="Editar" buttonType="button" handleClick={() => setCanEdit(!canEdit)}/>
                        </>
                    ) : (
                        <MyButton buttonText="Cadastrar" buttonType="submit"/>
                    )}
                </div>
            </form>
        </div>
    )
}