"use client"
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import cozinhaService from "@/services/cozinhaService";
import { useEffect, useState } from "react";
import { MyButton } from "./MyButton";
import { requiredString } from "./ErroPreenchimento";

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
    const { user } = useSelector((state) => state.auth);
    const { createCardapio, getCardapioStatus, editCardapio, getCardapioById } = cozinhaService;
 	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

    async function onSubmit(data: FormData){
        if(action == "CRIAR"){
            const res = await createCardapio(data, user.token);
            if(res.type == "SUCCESS"){
                router.push("/cozinha")
            }
        }else{
            const res = await editCardapio(Number(pathname.substring(26)), data, user.token);
            if(res.type == "SUCCESS"){
                router.push("/cozinha")
            }
        }
	};

    useEffect(() => {
        async function fetch(){
            const res = await getCardapioStatus(user.token);
            if(action == "EDITAR"){
                const res2 = await getCardapioById(Number(pathname.substring(26)), user.token);
                setCadapioData(res2.data[0]);
            }
            setStatus(res.data);
        }
        setValue("userId", user.user.userId);
        if(action == "CRIAR"){
            setCanEdit(!canEdit);
        }
        fetch()
    }, [user, getCardapioStatus, getCardapioById]);

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

    return(
        <div className='bg-white p-5 rounded-md mb-20 shadow-lg m-10'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label className="flex flex-col">Título do cardápio:
                    <input className="input" readOnly={!canEdit} type="text" {...register("name")} />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </label>
                <label className="flex flex-col">Data do cardápio:
                    <input className="input" readOnly={!canEdit} type="date" {...register("date")} />
                    {errors.date && <span className="text-red-500">{errors.date.message}</span>}
                </label>
                <label className="flex flex-col">Horário do cardárpio:
                    <input className="input" readOnly={!canEdit} type="text" {...register("time")} />
                    {errors.time && <span className="text-red-500">{errors.time.message}</span>}
                </label>
                <label className="flex flex-col">Descrição do cardápio:
                    <textarea className="input" readOnly={!canEdit} rows={10} {...register("description")}/>
                    {errors.description && <span className="text-red-500">{errors.description.message}</span>}
                </label>
                <label className="flex flex-col">Tipo do cardárpio:
                    <select className="input" {...register("type")} disabled={!canEdit}>
                        <option hidden={true}></option>
                        <option value="PADRAO">Cardápio Padrão</option>
                        <option value="ESPECIAL">Cardápio Especial</option>
                    </select>
                    {errors.type && <span className="text-red-500">{errors.type.message}</span>}
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
                    {errors.status && <span className="text-red-500">{errors.status.message}</span>}
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