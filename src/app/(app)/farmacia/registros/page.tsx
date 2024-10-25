"use client";

import { ContainerFarmacia } from "@/components/ContainerFarmacia";
import { RegistrosCard } from "@/components/RegistrosCard";
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import hospedeService from "@/services/hospedeService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface HospedeCardData{
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

export default function Registros(){
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState<Array<HospedeCardData>>([]);
    const [auxData, setAuxData] = useState<Array<HospedeCardData>>([]);
    const { getHospedes } = hospedeService;
    useEffect(() => {
        async function fetch() {
            const res = await getHospedes(user.token)
            setData(res.data);
            setAuxData(res.data);
        }
        fetch() 
    }, [user, getHospedes])
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <SetorInfo setor="Registros"/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} keys={["idHOSPEDE","NOME_COMPLETO"]} />
                <div>
                    {auxData && (
                        <div className="grid grid-cols-2"> 
                            {auxData.map((obj) => (
                                <RegistrosCard key={obj.idHOSPEDE} data={obj}/> 
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
