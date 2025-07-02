"use client"
import { MdAssignment, MdAttachMoney } from "react-icons/md";
import { ActionsBox } from "./ActionsBox";
import { useRouter } from "next/navigation";
import hospedeService from "@/services/hospedeService";

interface IHospedeCardProps{
	data: IHospedeData
}

interface IHospedeData{
    idHOSPEDE: number
    NOME_COMPLETO: string
    DATA_NASCIMENTO: string
    DATA_ENTRADA: string
    RESPONSAVEL: string
    STATUS_HOSPEDE: string
    QUARTO: string
    LEITO: string
} 

export function HospedeCard({data}: IHospedeCardProps){
	const router = useRouter();
	const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
	const { deleteHospede } = hospedeService;

	function formatDate(data: string){
		return new Date(data).toLocaleDateString("pt-BR")
	}

	function getAge(dateString: string) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

	async function handleDelete(id: number){
        const res = await deleteHospede(id, user.token, user.user.userId);
        if(res.type == "SUCCESS"){
            router.push("/hospedes");
        }
    }

	return(
		<div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4 space-y-4">
			<div className="flex space-x-5">
				<div className="flex flex-col">
					<h3 className="font-bold">{data.idHOSPEDE} <span className="text-button">{data.NOME_COMPLETO}</span></h3>
					<ul className="columns-2">
						<li>Dia de entrada: {formatDate(data.DATA_ENTRADA)}</li>
						<li>Idade: {getAge(data.DATA_NASCIMENTO)} anos</li>
						<li>Leito: {data.LEITO}</li>
						<li>Nº Quarto: {data.QUARTO}</li>
						<li>Responsavel: {data.RESPONSAVEL}</li>
						<li>Status: {data.STATUS_HOSPEDE}</li>
					</ul>
				</div>
			</div>
			<div className="flex justify-end">
				<ActionsBox path={`/hospedes/${data.idHOSPEDE}`} deleteFunc={() => { handleDelete(data.idHOSPEDE) }}/> 
				<button className="hover:opacity-75" onClick={() => router.push(`/hospedes/banco/${data.idHOSPEDE}`)} hidden={["SOCIAL", "ADMIN"].includes(user.user.access) ? false : true}>
                	<MdAttachMoney size={32} className="text-button"/>
            	</button>
				<button className="hover:opacity-75" onClick={() => router.push(`/hospedes/ficha/${data.idHOSPEDE}`)} hidden={["SOCIAL", "ADMIN"].includes(user.user.access)? false : true}>
                	<MdAssignment size={32} className="text-button"/>
            	</button> 
			</div>
		</div>
	)
};