"use client"
import { MyButton } from "@/components/MyButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "@/slices/authSlice";
import { requiredEmail, requiredPassword } from "./ErroPreenchimento";
import { toast,Toaster } from "sonner";


const schema = yup.object({
    email: requiredEmail('Email obrigatório'),
    password: requiredPassword('Senha obrigatória'),
});

type FormData = yup.InferType<typeof schema>;



export function LoginForm() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data: FormData) {
        const res = await dispatch(login(data));
        
        if (res.type === "/login/rejected") {
            toast.error("Falha no login. Verifique suas credenciais.");
            return;
        } else {
            toast.success("Login realizado com sucesso!");{}
            router.push('/dashboard');
        }
    }

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <form className="flex flex-col space-y-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
            <input 
                placeholder="Email" 
                {...register("email")} 
                className="input"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            
            <input 
                placeholder="Senha" 
                {...register("password")} 
                className="input" 
                type="password" 
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
            
            <MyButton buttonText="Entrar" buttonType="submit" />
        </form>
    )
}
