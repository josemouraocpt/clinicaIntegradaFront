"use client"
import { MdPermIdentity } from "react-icons/md";
import { MyButton } from "./MyButton";
import Link from "next/link";

interface ICardProps{
	data: any
	path: string
}

export function Card({data, path}: ICardProps){
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
	return(
		<div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4 space-y-4">
			<div className="flex space-x-5">
				{/* <div>
					<MdPermIdentity size={96}/>
				</div> */}
				<div className="flex flex-col">
					<h3 className="font-bold">{data.idHOSPEDE} <span className="text-button">{data.NOME_COMPLETO}</span></h3>
					<ul className="columns-2">
						<li>Dia de entrada: {formatDate(data.DATA_ENTRADA)}</li>
						<li>Idade: {getAge(data.DATA_NASCIMENTO)} anos</li>
						<li>Nível de dependencia: {data.GRAU_DEPENDENCIA}</li>
						<li>Leito: {data.LEITO}</li>
						<li>Nº Quarto: {data.QUARTO}</li>
						<li>Responsavel: {data.NOME}</li>
					</ul>
				</div>
			</div>
			<div className="flex justify-end space-x-2">
				<Link href={path} >
					<MyButton buttonText="Ver dados"/>
				</Link>
				{path.includes('/hospedes') && (
					<Link href={`/hospedes/atividades/${data.idHOSPEDE}`}>
						<MyButton buttonText="Ver atividades"/>
					</Link>
				)}
			</div>
		</div>
	)
};