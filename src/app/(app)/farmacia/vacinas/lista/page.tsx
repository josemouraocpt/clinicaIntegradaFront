"use client"
import { ContainerFarmacia } from "@/components/ContainerFarmacia"
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import { VacinaCard } from "@/components/VacinaCard"
import farmaciaService from "@/services/farmaciaService";
import { useEffect, useState } from "react";

interface IVacinaData{
    idFARMACOS: number
    NOME: string
    DOSAGEM: string
    VALIDADE: string
    LOTE: string
    DATA_FABRICACAO: string
    FABRICANTE: string
    TIPO_ARMAZENAMENTO: string
    CONDICAO_ARMAZENAMENTO: string
    DATA_ALTERACAO: string
    ALTERADO_POR: string
    CNPJ: string
    QUANTIDADE: number
    FORNECEDOR_NOME: string
}

export default function ListaVacinas(){
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    const [data, setData] = useState<Array<IVacinaData>>([]);
    const [auxData, setAuxData] = useState<Array<IVacinaData>>([]);
    const { getVacinas } = farmaciaService;

    useEffect(() => {
        async function fetch() {
            const res = await getVacinas(user.token);
            setData(res.data)
            setAuxData(res.data);
        }
        fetch()
    }, [])
    
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <SetorInfo setor="Vacinas"/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} keys={["idFARMACOS","NOME"]} />
                <div>
                    {auxData && auxData.length > 0 ? (
                        <div className="grid grid-cols-2 gap-6"> 
                            {auxData.map((obj) => (
                                <VacinaCard data={obj} key={obj.idFARMACOS}/>
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
}