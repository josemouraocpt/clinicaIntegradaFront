"use client"
import { ContainerFarmacia } from "@/components/ContainerFarmacia";
import remedyService from "@/services/remedyService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Medicamentos(){
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState();
    const { getRemedys } = remedyService;

    useEffect(() => {
        async function fetch() {
            const res = await getRemedys(user.token)
            setData(res.remedys)
        }
        fetch()
    }, [user])

    return(
        <div>
            <ContainerFarmacia/>
            <div>
                <h1>Lista de Medicamentos:</h1>
                <select>
                    <option disabled={true}></option>
                    {data && (
                        data.map((valor) => (
                            <option value={valor.idREMEDIOS} key={valor.idREMEDIOS}>{valor.NOME}</option>
                        ))
                    )}
                </select>
            </div>
        </div>
    )
}