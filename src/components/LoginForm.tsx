"use client"
import { MyButton } from "@/components/MyButton";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "@/slices/authSlice";
<<<<<<< HEAD
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
=======
import { requiredEmail, requiredPassword } from "./ErroPreenchimento";
import { toast,Toaster } from "sonner";

>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb

const schema = yup.object({
    email: requiredEmail('Email obrigatório'),
    password: requiredPassword('Senha obrigatória'),
});

type FormData = yup.InferType<typeof schema>;



export function LoginForm() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const router = useRouter();
<<<<<<< HEAD
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
=======
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
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb

    useEffect(() => {
        dispatch(reset());
    }, [dispatch]);

    return (
        <form className="flex flex-col space-y-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
<<<<<<< HEAD
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
=======
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
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
        </form>
    )
}
