"use client"

import { MyButton } from "@/components/MyButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "@/slices/authSlice";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const schema = yup.object({
	email: yup.string().required("Insira o e-mail").email("Insira um e-mail válido"),
	password: yup.string().required("Insira a senha")
});

type FormData = yup.InferType<typeof schema>;

export function LoginForm(){
    const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
    const router = useRouter();
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
	async function onSubmit(data: FormData){
		const res  = await dispatch(login(data))
        if(res.type == "/login/rejected"){
            return alert(res.payload)
        }else{
            router.push('/dashboard')
        }
	};
    const [visibility, setVisibility] = useState("password")

    useEffect(() => {
        dispatch(reset());
    }, [dispatch])

    return(
        <form className="flex flex-col space-y-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Email" {...register("email")} className="input"/>
            <span className="text-red-500">{errors.email?.message}</span>
            <div className="flex items-center gap-x-2">
                <div className="grow">
                    <input placeholder="Senha" {...register("password")} className="input" type={visibility} />
                    
                </div>
                {visibility == "password" ? 
                    (<FaEye size={28} onClick={()=>setVisibility("text")} />) : 
                    (<FaEyeSlash size={28} onClick={()=>setVisibility("password")} />)
                }
            </div>
            <span className="text-red-500">{errors.password?.message}</span>
            <MyButton buttonText="Entrar" buttonType="submit"/>
        </form>
    )
}