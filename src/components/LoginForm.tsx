"use client" 
import { MyButton } from "@/components/MyButton";
import { useForm, FieldErrors } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { requiredEmail, requiredPassword } from "./ErroPreenchimento";
import { toast,Toaster } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import authService from "@/services/authService";

const schema = yup.object({
    email: requiredEmail('Email obrigatório'),
    password: requiredPassword('Senha obrigatória'),
});

type FormData = yup.InferType<typeof schema>;

 

export function LoginForm() {
    const [visibility, setVisibility] = useState(false);
    const { login } = authService;
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });

    async function onSubmit(data: FormData) {
        const res = await login(data);
        if (res.type === "ERROR") {
            toast.error(res.message);
            return;
        } else {
            toast.success("Login realizado com sucesso!");{}
            router.push('/dashboard');
        }
    }

    async function onError(formErrors: FieldErrors<FormData>) {
        if (formErrors.email) toast.error(formErrors.email.message);
        if (formErrors.password) toast.error(formErrors.password.message);
    }

    return (
        <form className="flex flex-col space-y-3 mt-3" onSubmit={handleSubmit(onSubmit, onError)}>
            <Toaster richColors/>
            <input 
                placeholder="Email" 
                {...register("email")} 
                className="input"
            />

            <div className="flex space-x-2">
                <input placeholder="Senha" {...register("password")} className="input" type={visibility ? "text" : "password"}/>
                {!visibility ? (
                    <button type="button" onClick={() => { setVisibility(!visibility) }}><FaEye size={24} /></button>
                ) : (
                    <button type="button" onClick={() => { setVisibility(!visibility) }}><FaEyeSlash size={24} /></button>
                )}
            </div>
            <MyButton buttonText="Entrar" buttonType="submit" />
        </form>
    )
}
