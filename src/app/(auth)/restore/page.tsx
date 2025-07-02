"use client"

import { MyButton } from "@/components/MyButton";
import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import authService from "@/services/authService";
import { toast, Toaster } from "sonner";

const schema = yup.object({
	email: yup.string().required("Insira o e-mail").email("Insira um e-mail válido"),
	password: yup.string().required("Insira a senha"),
    confirmPassword: yup.string().required("Insira a confirmação de senha").oneOf([yup.ref('password')], 'As senhas devem ser iguais')
});

type FormData = yup.InferType<typeof schema>;

export default function Restore(){
    const router = useRouter();
    const { recuperarSenha } = authService;
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
	async function onSubmit(data: FormData){
		const res = await recuperarSenha(data);
        if(res.type == "ERROR"){
            toast.error(res.message);
            return
        }else{
            toast.success("Ação realizada com sucesso!");{}
            router.push('/login')
        }
	};
    const [visibility1, setVisibility1] = useState("password");
    const [visibility2, setVisibility2] = useState("password");

    async function onError(formErrors: FieldErrors<FormData>) {
        for (const value of Object.entries(formErrors)) {
            toast.error(value[1].message)
        }
    }

    return(
        <div>
            <div className="flex justify-center h-screen">
			<div className="bg-white p-10 h-fit mt-14 rounded-lg shadow-md">
                <form className="flex flex-col space-y-3 mt-3" onSubmit={handleSubmit(onSubmit, onError)}>
                <Toaster richColors/>
                <div>
                    <label>Informe o e-mail cadastrado:
                        <input placeholder="Email" {...register("email")} className="input"/>
                    </label>
                </div>
                <label>Nova senha:</label>
                <div className="flex items-center gap-x-2">
                    <div className="grow">
                        <input placeholder="Senha" {...register("password")} className="input" type={visibility1} />
                    </div>
                    {visibility1 == "password" ? 
                        (<FaEye size={28} onClick={()=>setVisibility1("text")} />) : 
                        (<FaEyeSlash size={28} onClick={()=>setVisibility1("password")} />)
                    }
                </div>
                <label>Confirmar nova senha:</label>
                <div className="flex items-center gap-x-2">
                    <div className="grow">
                        <input placeholder="Senha" {...register("confirmPassword")} className="input" type={visibility2} />
                    </div>
                    {visibility2 == "password" ? 
                        (<FaEye size={28} onClick={()=>setVisibility2("text")} />) : 
                        (<FaEyeSlash size={28} onClick={()=>setVisibility2("password")} />)
                    }
                </div>
                <MyButton buttonText="Enviar" buttonType="submit"/>
                </form>
			</div>
		</div>
        </div>
    )
}