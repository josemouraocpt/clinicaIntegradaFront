'use client';
import { ContainerHospedes } from "@/components/ContainerHospedes";
import { HospedeCard } from "@/components/HospedeCard";
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

export default function HospedesLista(){
    const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState<Array<IHospedeData>>([]);
	const [auxData, setAuxData] = useState<Array<IHospedeData>>([]);
	const { getHospedes } = hospedeService;

	useEffect(() => {
		async function fetchAll(){
			const res = await getHospedes(user.token);
            if(res.type == "SUCCESS"){
                setData(res.data);
                setAuxData(res.data);
            }

		}
		fetchAll()
	}, [user, getHospedes]);

    return(
        <div className="min-h-screen">
            <ContainerHospedes/>
            <SetorInfo setor="Hóspede"/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} path="/hospedes/cadastro" keys={["idHOSPEDE","NOME_COMPLETO"]}/>
                <div>
                    {auxData.length > 0 ? (
                        <div className="grid grid-cols-2">
                            {auxData.map((obj) => (
                                <HospedeCard key={obj.idHOSPEDE} data={obj}/>
                            ))}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </div>
    )
}