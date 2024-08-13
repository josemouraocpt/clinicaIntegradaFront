'use client';
import { Card } from "@/components/Card";
import { ContainerAtendimento } from "@/components/ContainerAtendimento";
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Atendimentos(){
	const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState([]);
	const [auxData, setAuxData] = useState([]);
	const { getHospedes } = userService;

	useEffect(() => {
		async function fetchAll(){
			const res = await getHospedes(user.token);
			setData(res.guest);
			setAuxData(res.guest);
		}
		fetchAll()
	}, [user, getHospedes]);

	return(
		<div className="min-h-screen">
			<ContainerAtendimento/>
			<SetorInfo setor="Atendimentos"/>
			<div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} path="/atendimentos/cadastrar" type="HOSPEDE"/>
                <div>
                    {auxData && (
                        <div className="grid grid-cols-2">
                            {auxData.map((obj) => (
                                <Card key={obj.idHOSPEDE} data={obj} path={`/atendimentos/editar/${obj.idHOSPEDE}`}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
		</div>
	)
};