"use client"
import { MdPermIdentity } from "react-icons/md";
import { MyButton } from "./MyButton";
import { useState } from "react";
import remedyService from "@/services/remedyService";
import Link from "next/link";

export function RegistrosCard({data, token}: any){
	const [infoData, setInfoData] = useState();
	const [isHidden, setIsHidden] = useState(false);
	const { getRemedyInfo } = remedyService;

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

    async function handleClick(id: number){
        const res = await getRemedyInfo(token, id);
		console.log(res)
		setInfoData(res.data);
		setIsHidden(!isHidden)
    }

	return(
		<div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
			<div className="flex space-x-4">
				<div>
					<MdPermIdentity size={96}/>
				</div>
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
            <div className={isHidden === true ? "hidden" :"flex gap-x-2 flex-row-reverse"}>
                <MyButton buttonText="Visualizar" handleClick={() => handleClick(data.DADOS_MEDICOS_idDADOS_MEDICOS)}/>
            </div>
			<div className={isHidden === false ? "hidden" : "mt-5"}>
				<h1 className="font-bold text-lg">Dados sobre os medicamentos do usuário</h1>
				{infoData &&  (
					infoData.map((med) => (
						<div className="mt-2" key={med.idREMEDIOS}>
							<ul>
								<li><span className="font-bold">Medicamento ministrado: </span>{med.NOME}</li>
								<li><span className="font-bold">Dosagem ministrada: </span>{med.DOSAGEM}</li>
								<li><span className="font-bold">Observações: </span>{med.OBSERVACOES}</li>
							</ul>
					</div>
					))
				)}
				<div className="flex gap-x-2 flex-row-reverse">
					<Link href={`/hospedes/1`}>
						<MyButton buttonText="Editar"/>
					</Link>
                	<MyButton buttonText="Fechar" handleClick={() => setIsHidden(!isHidden)}/>
           		</div>
			</div>
		</div>
	)
};