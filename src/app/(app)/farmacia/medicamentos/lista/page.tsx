"use client"
import { ContainerFarmacia } from "@/components/ContainerFarmacia";
import { ItemCard } from "@/components/ItemCard";
import remedyService from "@/services/remedyService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface IMedicamentoData{
    idREMEDIOS: number
    DOSAGEM: string
    FREQUENCIA_USO: string
    NOME: string
    TEMPO_USO: string
}

export default function ListaMedicamentos(){
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState<Array<IMedicamentoData>>([]);
    const { getRemedys } = remedyService;

    useEffect(() => {
        async function fetch() {
            const res = await getRemedys(user.token)
            console.log(res.remedies)
            setData(res.remedies)
        }
        fetch()
    }, [user])
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <div className="m-10">
                <h1 className="text-bold text-2xl">Lista de Medicamentos:</h1>
                <div className="grid grid-cols-2 gap-5 bg-white p-4 rounded-lg shadow-sm">
                    {data && (
                        data.map((medicamento) => (
                            <ItemCard key={medicamento.idREMEDIOS} nome={medicamento.NOME}/>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}