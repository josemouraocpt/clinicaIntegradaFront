'use client'
import { ContainerProjeto } from "@/components/ContainerProjeto";
import { ProjetoCard } from "@/components/ProjetoCard";
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import projetoService from "@/services/projetosService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
interface IProjetoData{
	idPROJETO: number
	USUARIO_idUSUARIO: number 
	NOME: string
	DATA_PROJETO: string 
	ESCOPO: string
	ATIVIDADE: string
	RESTRICAO: string
	CUSTO: number
	TIPO: string
	CENTRO_DE_CUSTO: string
	STATUS_PROJETO: string
	RESULTADOS_ESPERADOS: string
	OBJETIVOS: string
	PUBLICO_BENEFICIARIO: string 
	METODOLOGIA: string
	JUSTIFICATIVA: string
	APRESENTACAO: string
	IDENTIFICACAO: string
	RESPONSAVEL: string
}

export default function Projetos(){
	const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState<Array<IProjetoData>>([]);
	const [auxData, setAuxData] = useState<Array<IProjetoData>>([]);
	const { getProjetos } = projetoService;
	
	useEffect(() => {
		async function fetchAll(){
			const res = await getProjetos(user.token);
			setData(res.data);
			setAuxData(res.data);
		}
		if(user.token !== undefined){
			fetchAll()
		}
	}, [user, getProjetos]); 

	return(
		<div className="min-h-screen">
			<ContainerProjeto/>
			<SetorInfo setor="Projetos"/>
			<div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} path="/projetos/cadastrar" keys={["idPROJETO","NOME"]} />
                <div>
                    {auxData && (
                        <div className="grid grid-cols-2">
                            {auxData.map((obj) => (
                                <ProjetoCard key={obj.idPROJETO} data={obj} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
		</div>
	)
};