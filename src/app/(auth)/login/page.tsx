'use client'
import { MyButton } from "@/components/MyButton";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";

const schema = yup.object({
	email: yup.string().required("Insira o e-mail").email("Insira um e-mail válido"),
	password: yup.string().required("Insira a senha")
});

type FormData = yup.InferType<typeof schema>;

// Criar um componente para o form e hidratar apenas ele

export default function Login(){
	const router = useRouter();
	const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
		router.push('/dashboard')
	};

	return(
		<div className="bg-background flex justify-center h-screen">
			<div className="bg-white p-10 h-fit mt-14 rounded-lg shadow-md">
				<h2 className="font-bold">Insira seus dados de acesso:</h2>
				<p className="text-xs">Lembre-se de não compartilhar seus dados com ninguém</p>
				<form className="flex flex-col space-y-3 mt-3" onSubmit={handleSubmit(onSubmit)}>
					<input placeholder="Email" {...register("email")} className="input"/>
					<span>{errors.email?.message}</span>
					<input placeholder="Senha" {...register("password")} className="input" type="password" />
					<span>{errors.password?.message}</span>
					<MyButton buttonText="Entrar" buttonType="submit"/>
				</form>
				<p className="text-xs text-center mt-3">
					Ainda não possui conta? <span className="text-yellow-500 hover:text-yellow-600"><Link href="/register">Registre-se</Link></span>
				</p>
			</div>
		</div>
	)
};
