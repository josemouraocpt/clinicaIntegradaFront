import { ProfileForm } from "@/components/ProfileForm";

export default function Perfil(){
	return(
		<div className="p-4 space-y-20 mx-10 mb-24 h-screen">
			<div>
				<h2 className="text-lg font-bold mt-5">Você deseja mudar seus dados? </h2>
				<p className="text-sm">Se sim, informe os dados abaixo.</p>
			</div>
			<div className="bg-white p-10 rounded-lg shadow-md">
				<ProfileForm/>
			</div>
		</div>
	)
};