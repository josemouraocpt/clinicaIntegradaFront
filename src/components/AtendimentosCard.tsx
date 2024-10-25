"use client"
import { ActionsBox } from "./ActionsBox";

interface IAtendimentoCardProps{
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
    GRAU_DEPENDENCIA: number
    OBSERVACOES: string
}


export function AtendimentosCard({data}: IAtendimentoCardProps){
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
				<div className="flex flex-col">
					<h3 className="font-bold">{data.idHOSPEDE} <span className="text-button">{data.NOME_COMPLETO}</span></h3>
					<ul className="columns-2">
						<li>Dia de entrada: {formatDate(data.DATA_ENTRADA)}</li>
						<li>Idade: {getAge(data.DATA_NASCIMENTO)} anos</li>
						<li>Nível de dependencia: {data.GRAU_DEPENDENCIA}</li>
						<li>Leito: {data.LEITO}</li>
						<li>Nº Quarto: {data.QUARTO}</li>
						<li>Responsavel: {data.RESPONSAVEL}</li>
					</ul>
				</div>
			</div>
			<div className="flex justify-end">
				<ActionsBox path={`/atendimentos/editar/${data.idHOSPEDE}`}/>
			</div>
		</div>
	)
};