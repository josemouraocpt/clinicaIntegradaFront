'use client'
import * as yup from "yup";
import { MyButton } from "./MyButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import sistemaService from "@/services/sistemaService";

interface IDominioFormProps{
    action: string
}

const schema = yup.object({
    idSTATUS_DOMAIN: yup.number(),
    STATUS_VALUE: yup.string().required('O valor é obrigatório'),
    STATUS_TYPE: yup.string().required('O tipo é obrigatório'),
    STATUS_DESCRIPTION: yup.string().required('A descrição é obrigatória'),
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
                return router.push("/sistema/dominios")
            }
        }else{
            const res = await createDominio(data, user.token);
            if(res.type == "SUCCESS"){
                return router.push("/sistema/dominios")
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

    return(
        <div className="bg-white p-5 rounded-md mb-20 shadow-lg mx-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Tipo do dominio: 
                        <input disabled={!canEdit} type="text" className="input" {...register("STATUS_TYPE")} />
                    </label>
                    <span className="text-red-500">{errors.STATUS_TYPE?.message}</span>
                </div>
                <div>
                    <label>Valor do dominio: 
                        <input disabled={!canEdit} type="text" className="input" {...register("STATUS_VALUE")} />
                    </label>
                    <span className="text-red-500">{errors.STATUS_VALUE?.message}</span>
                </div>
                <div>
                    <label>Descrição do dominio: 
                        <input disabled={!canEdit} type="text" className="input" {...register("STATUS_DESCRIPTION")} />
                    </label>
                    <span className="text-red-500">{errors.STATUS_DESCRIPTION?.message}</span>
                </div>
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