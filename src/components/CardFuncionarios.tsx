"use client"
import { useRouter } from "next/navigation";
import { ActionsBox } from "./ActionsBox";
import userService from "@/services/userService";

export function CardFuncionarios({data}: any){
	const router = useRouter();
	const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
	const { deleteUser } = userService;

	async function handleDelete(id: number){
        const res = await deleteUser(id, user.token);
        if(res.type == "SUCCESS"){
            router.push("/dashboard");
        }
    }

	return(
		<div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
			<div className="flex space-x-5">
				<div className="flex flex-col">
					<h3 className="font-bold">{data.idUSUARIO} <span className="text-button">{data.NOME}</span></h3>
					<ul className="columns-2">
						<li>Setor: {data.DESCRICAO}</li>
						<li>Perfil: {data.DOMAIN_DESCRIPTION}</li>
					</ul>
				</div>
			</div>
				<div className="flex justify-end">
					<ActionsBox path={`/funcionarios/detalhes/${data.idUSUARIO}`} deleteFunc={() => { handleDelete(data.idUSUARIO) }}/>
				</div>
		</div>
	)
};