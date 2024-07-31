"use client";

import { ContainerFarmacia } from "@/components/ContainerFarmacia";
import { RegistrosCard } from "@/components/RegistrosCard";
import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Registros(){
    const { user } = useSelector((state) => state.auth);
    const [data, setData] = useState([]);
    const { getHospedes } = userService;
    useEffect(() => {
        async function fetch() {
            const res = await getHospedes(user.token)
            setData(res.guest)
        }
        fetch()
    }, [user])
    return(
        <div>
            <ContainerFarmacia/>
            <div className="bg-white p-6 m-10 rounded-lg">
                {data && (
                    <div className="grid grid-cols-2"> 
                        {data.map((obj) => (
                            <RegistrosCard key={obj.idHOSPEDE} data={obj}/>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
