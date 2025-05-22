'use client';
import { AtendimentosCard } from "@/components/AtendimentosCard";
import { ContainerAtendimento } from "@/components/ContainerAtendimento";
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import hospedeService from "@/services/hospedeService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

export default function Atendimentos(){
	const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState<Array<IHospedeData>>([]);
	const [auxData, setAuxData] = useState<Array<IHospedeData>>([]);
	const { getHospedesComAtendimento } = hospedeService;

	useEffect(() => {
		async function fetchAll(){
			const res = await getHospedesComAtendimento(user.token); 
			setData(res.data);
			setAuxData(res.data);
		}
		fetchAll()
	}, [user, getHospedesComAtendimento]);

	return(
		<div className="min-h-screen">
			<ContainerAtendimento/>
			<SetorInfo setor="Atendimentos"/>
			<div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} path="/atendimentos/cadastrar" keys={["idHOSPEDE","NOME_COMPLETO"]}/>
                <div>
                    {auxData && auxData.length > 0 ? (
                        <div className="grid grid-cols-2">
                            {auxData.map((obj) => (
                                <AtendimentosCard key={obj.idHOSPEDE} data={obj} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center p-4">
                            
                        </div>
                    )}
                </div>
            </div>
		</div>
	)
};