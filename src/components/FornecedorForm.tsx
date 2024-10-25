'use client'
import * as yup from "yup";
import { MyButton } from "./MyButton";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import sistemaService from "@/services/sistemaService";

interface IFornecedorFormProps{
    action: string
}

const schema = yup.object({
    idFORNECEDOR: yup.number(),
    NOME: yup.string(),
    EMAIL: yup.string(),
    TELEFONE: yup.string(),
    CNPJ: yup.string(),
    NOME_CONTATO: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

export function FornecedorForm({action}: IFornecedorFormProps){
    const router = useRouter();
    const pathname = usePathname();
    const [canEdit, setCanEdit] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
    const { getFornecedor, createFornecedor, editFornecedor } = sistemaService;

    async function onSubmit(data: FormData){
        if(action == "EDITAR"){
            const res = await editFornecedor(data.idFORNECEDOR, data, user.token);
            if(res.type == "SUCCESS"){
                return router.push("/sistema/fornecedores")
            }
        }else{
            const res = await createFornecedor(data,  user.token);
            if(res.type == "SUCCESS"){
                return router.push("/sistema/fornecedores")
            }
        }
	};

    useEffect(() => {
        async function fetch(){
            const res = await getFornecedor(Number(pathname.substring(29)), user.token);
            setValues(res.data[0]);
        }
        if(action == "CRIAR"){
            setCanEdit(!canEdit);
        }else{
            fetch()
        }
    }, [user, getFornecedor]);

    function setValues(data: any){
        setValue("idFORNECEDOR", data.idFORNECEDOR);
        setValue("NOME", data.NOME);
        setValue("EMAIL", data.EMAIL);
        setValue("TELEFONE", data.TELEFONE);
        setValue("CNPJ", data.CNPJ);
        setValue("NOME_CONTATO", data.NOME_CONTATO);
    }


    return(
        <div className="bg-white p-5 rounded-md mb-20 shadow-lg mx-10">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Nome: 
                    <input disabled={!canEdit} type="text" className="input" {...register("NOME")} />
                </label>
                <label>Email: 
                    <input disabled={!canEdit} type="text" className="input" {...register("EMAIL")} />
                </label>
                <label>Telefone: 
                    <input disabled={!canEdit} type="text" className="input" {...register("TELEFONE")} />
                </label>
                <label>CNPJ: 
                    <input disabled={!canEdit} type="text" className="input" {...register("CNPJ")} />
                </label>
                <label>Nome do contato: 
                    <input disabled={!canEdit} type="text" className="input" {...register("NOME_CONTATO")} />
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