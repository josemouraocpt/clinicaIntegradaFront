"use client"
import { ContainerFarmacia } from "@/components/ContainerFarmacia";
import { SetorInfo } from "@/components/SetorInfo";
import remedyService from "@/services/remedyService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Medicamentos(){
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState();
    const [hidden, setHidden] = useState(false);
    const { getRemedys } = remedyService;

    useEffect(() => {
        async function fetch() {
            const res = await getRemedys(user.token)
            setData(res.remedies)
        }
        fetch()
    }, [user])

    function handleChange(){
        setHidden(!hidden)
    }

    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <SetorInfo setor="Medicamentos"/>
            <div className="p-10">
                <h1 className="text-bold text-2xl">Lista de Medicamentos:</h1>
                <select className="input" onChange={handleChange}>
                    <option disabled={true} className="hidden"></option>
                    {data && (
                        data.map((valor) => (
                            <option value={valor.idREMEDIOS} key={valor.idREMEDIOS}>{valor.NOME}</option>
                        ))
                    )}
                </select>
                <div className={ hidden == false ? "hidden" : "rounded-b-md bg-gray-400 mx-1 p-3"}>
                    <ul>
                        <li className="text-lg">Quantidade de medicamentos: </li>
                        <li className="text-lg">Valor do medicamento: R$</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}