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

const phoneRegex = /^(\+?55\s?)?(\(?\d{2}\)?\s?)?(9\d{4}|\d{4})-?\d{4}$/;
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

const schema = yup.object({
    idFORNECEDOR: yup.number(),
    NOME: yup.string().required('O nome é obrigatório'),
    EMAIL: yup.string().required('O e-mail é obrigatório').email('Deve ser um e-mail válido'),
    TELEFONE: yup.string().required('O telefone é obrigatório').matches(phoneRegex, 'Deve estar no padrão 31912345678'),
    CNPJ: yup.string().required('O CNPJ é obrigatório').matches(cnpjRegex, 'Deve estar no padrão 00.000.000/0001-00'),
    NOME_CONTATO: yup.string().required('O nome do contato é obrigatório'),
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
        if(!data) return;
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
                <div>
                    <label>Nome: 
                        <input disabled={!canEdit} type="text" className="input" {...register("NOME")} />
                    </label>
                    <span className="text-red-500">{errors.NOME?.message}</span>
                </div>
                <div>
                    <label>Email: 
                        <input disabled={!canEdit} type="text" className="input" {...register("EMAIL")} />
                    </label>
                    <span className="text-red-500">{errors.EMAIL?.message}</span>
                </div>
                <div>
                    <label>Telefone: 
                        <input disabled={!canEdit} type="text" className="input" {...register("TELEFONE")} />
                    </label>
                    <span className="text-red-500">{errors.TELEFONE?.message}</span>
                </div>
                <div>
                    <label>CNPJ: 
                        <input disabled={!canEdit} type="text" className="input" {...register("CNPJ")} />
                    </label>
                    <span className="text-red-500">{errors.CNPJ?.message}</span>
                </div>
                <div>
                    <label>Nome do contato: 
                        <input disabled={!canEdit} type="text" className="input" {...register("NOME_CONTATO")} />
                    </label>
                    <span className="text-red-500">{errors.NOME_CONTATO?.message}</span>
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