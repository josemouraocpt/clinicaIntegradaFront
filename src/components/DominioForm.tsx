'use client'
import * as yup from "yup";
import { MyButton } from "./MyButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldErrors, useForm } from "react-hook-form";
import sistemaService from "@/services/sistemaService";
import { requiredString } from "./ErroPreenchimento";
import { toast, Toaster } from "sonner";

interface IDominioFormProps{
    action: string
}

const schema = yup.object({
    idSTATUS_DOMAIN: yup.number(),
    STATUS_VALUE: requiredString('Valor do dominio obrigatório'),
    STATUS_TYPE: requiredString('Tipo do dominio obrigatório'),
    STATUS_DESCRIPTION: requiredString('Descrição do dominio obrigatório'),
});

type FormData = yup.InferType<typeof schema>;

export function DominioForm({action}: IDominioFormProps){
    const router = useRouter();
    const pathname = usePathname();
    const [canEdit, setCanEdit] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
    const { getDominio, editDominio, createDominio } = sistemaService;

    async function onSubmit(data: FormData){
        if(action == "EDITAR"){
            const res = await editDominio(data.idSTATUS_DOMAIN, data, user.token);
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                return router.push("/sistema/dominios")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }else{
            const res = await createDominio(data, user.token);
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                return router.push("/sistema/dominios")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }
	};

    useEffect(() => {
        async function fetch(){
            const res = await getDominio(Number(pathname.substring(25)), user.token);
            setValues(res.data[0]);
            console.log(res.data)
        }
        if(action == "CRIAR"){
            setCanEdit(!canEdit);
        }else{
            fetch();
        }
    }, [user, getDominio]);

    function setValues(data: any) {
        if (!data) return;
        setValue("idSTATUS_DOMAIN", data.idSTATUS_DOMAIN);
        setValue("STATUS_TYPE", data.STATUS_TYPE);
        setValue("STATUS_VALUE", data.STATUS_VALUE);
        setValue("STATUS_DESCRIPTION", data.STATUS_DESCRIPTION);
    }

    async function onError(formErrors: FieldErrors<FormData>) {
        for (const value of Object.entries(formErrors)) {
            toast.error(value[1].message)
        }
    } 

    return(
        <div className="bg-white p-5 rounded-md mb-20 shadow-lg mx-10">
            <form onSubmit={handleSubmit(onSubmit, onError)}>
                <Toaster richColors/>
                <label className="flex flex-col">Tipo do dominio: 
                    <input disabled={!canEdit} type="text" className="input" {...register("STATUS_TYPE")} />
                </label>
                <label className="flex flex-col">Valor do dominio: 
                    <input disabled={!canEdit} type="text" className="input" {...register("STATUS_VALUE")} />
                </label>
                <label className="flex flex-col">Descrição do dominio: 
                    <input disabled={!canEdit} type="text" className="input" {...register("STATUS_DESCRIPTION")} />
                </label>
                <div className="my-2 flex justify-end space-x-2">
                    {action == "EDITAR" && (
                        <MyButton buttonText="Editar" buttonType="button" handleClick={() => { setCanEdit(!canEdit) }}/>
                    )}
                    <MyButton buttonText="Enviar" buttonType="submit"/>
                </div>
            </form>
        </div>
    )
}