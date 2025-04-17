import { LoginForm } from "@/components/LoginForm";
import Link from "next/link";

export default function Login(){
	return(
		<div className="flex justify-center h-screen">
			<div className="bg-white p-10 h-fit mt-14 rounded-lg shadow-md">
				<h2 className="font-bold">Insira seus dados de acesso:</h2>
				<p className="text-xs">Lembre-se de não compartilhar seus dados com ninguém</p>
				<LoginForm/>
				<p className="text-xs text-center mt-3">
					Ainda não possui conta? <span className="text-yellow-500 hover:text-yellow-600"><Link href="/register">Registre-se</Link></span>
				</p>
				<p className="text-xs text-center mt-3">
					Esqueceu sua senha? <span className="text-yellow-500 hover:text-yellow-600"><Link href="/restore">Recuperar senha</Link></span>
				</p>
			</div>
		</div>
	)
};
