"use client"

import { MyButton } from "@/components/MyButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "@/slices/authSlice";

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
            return
        }else{
            router.push('/dashboard')
        }
	};

    useEffect(() => {
        dispatch(reset());
    }, [dispatch])

    return(
        <form className="flex flex-col space-y-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Email" {...register("email")} className="input"/>
            <span>{errors.email?.message}</span>
            <input placeholder="Senha" {...register("password")} className="input" type="password" />
            <span>{errors.password?.message}</span>
            <MyButton buttonText="Entrar" buttonType="submit"/>
        </form>
    )
}