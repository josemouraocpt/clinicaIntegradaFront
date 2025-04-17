"use client"

import { MyButton } from "@/components/MyButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import authService from "@/services/authService";

const schema = yup.object({
	email: yup.string().required("Insira o e-mail").email("Insira um e-mail válido"),
	password: yup.string().required("Insira a senha"),
    confirmPassword: yup.string().required("Insira a senha").oneOf([yup.ref('password')], 'As senhas devem ser iguais')
});

export default function Restore(){
    const router = useRouter();
    const { recuperarSenha } = authService;
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
	async function onSubmit(data: FormData){
		const res = await recuperarSenha(data);
        if(res.type == "ERROR"){
            return alert(res.message)
        }else{
            router.push('/login')
        }
	};
    const [visibility1, setVisibility1] = useState("password")
    const [visibility2, setVisibility2] = useState("password")

    return(
        <div>
            <div className="flex justify-center h-screen">
			<div className="bg-white p-10 h-fit mt-14 rounded-lg shadow-md">
                <form className="flex flex-col space-y-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Informe o e-mail cadastrado:
                        <input placeholder="Email" {...register("email")} className="input"/>
                    </label>
                    <span className="text-red-500">{errors.email?.message}</span>
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
                <span className="text-red-500">{errors.password?.message}</span>
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
                <span className="text-red-500">{errors.confirmPassword?.message}</span>
                <MyButton buttonText="Enviar" buttonType="submit"/>
                </form>
			</div>
		</div>
        </div>
    )
}