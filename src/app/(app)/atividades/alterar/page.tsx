'use client'
import { AtividadeCard } from "@/components/AtividadeCard";
import { ContainerAtividades } from "@/components/ContainerAtividades";
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import atividadesService from "@/services/atividadesService";
import { useEffect, useState } from "react";
interface IAtividadeData{
	idATIVIDADES: number
	NOME: string
	DEPARTAMENTO: string 
	RESPONSAVEL_NOME: string
	RESPONSAVEL_DOCUMENTO: string
	FREQUENCIA: string
	STATUS_ATIVIDADE: string
	DATA_ATIVIDADE: string
	HORARIO_INICIO: string
	HORARIO_FIM: string
	OBSERVACOES: string
	ANEXO: any
}

export default function AlterarAtividade(){
	const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
	const [data, setData] = useState<Array<IAtividadeData>>([]);
	const [auxData, setAuxData] = useState<Array<IAtividadeData>>([]);
	const { getAtividades } = atividadesService;

	useEffect(() => {
		async function fetchAll(){
			const res = await getAtividades(user.token);
			setData(res.data);
			setAuxData(res.data);
		}
		fetchAll()
	}, []);

	return(
		<div className="min-h-screen">
			<ContainerAtividades/>
			<SetorInfo setor="Atividades"/>
			<div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} path="/atividades/cadastrar" keys={["idATIVIDADES","NOME"]}/>
                <div>
                    {auxData && (
                        <div className="grid grid-cols-2">
                            {auxData.map((obj) => (
                                <AtividadeCard path={`/atividades/alterar/${obj.idATIVIDADES}`} key={obj.idATIVIDADES} data={obj}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
		</div>
	)
}