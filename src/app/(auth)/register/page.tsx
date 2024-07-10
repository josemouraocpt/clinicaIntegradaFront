import { RegisterForm } from "@/components/RegisterForm";

export default function Register(){
	return(
		<div className="flex justify-center h-screen items-center">
			<div className="bg-white p-10 rounded-lg shadow-md">
				<h1 className="font-bold text-xl">Cadastro do usuário</h1>
				<div>
					<RegisterForm/>
				</div>
			</div>
		</div>
	)
} 