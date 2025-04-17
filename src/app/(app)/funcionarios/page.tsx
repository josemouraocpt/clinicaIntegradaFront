'use client';

import { CardFuncionarios } from "@/components/CardFuncionarios";
import { ContainerUsuarios } from "@/components/ContainerUsuarios";
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import userService from "@/services/userService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface IFuncionarioData {
    idUSUARIO: number;
    NOME: string;
    // Add other properties as needed
}

export default function Funcionarios(){
	const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState<IFuncionarioData[]>([]);
	const [auxData, setAuxData] = useState<IFuncionarioData[]>([]);
	const { getFuncionarios } = userService;
	
	useEffect(() => {
		async function fetchAll(){
			const res = await getFuncionarios(user.token);
			if(res.type == "SUCCESS"){
				setData(res.data);
				setAuxData(res.data);
			}
		}
		if(user.token !== undefined){
			fetchAll()
		}
	}, [user, getFuncionarios]); 

	return(
		<div className="p-4 min-h-screen">
			<ContainerUsuarios/>
			<SetorInfo setor="Funcionários"/>
			<div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} path="/register" keys={["idUSUARIO","NOME"]} />
                <div>
                    {auxData && auxData.length > 0 ? (
                        <div className="grid grid-cols-2">
                            {auxData.map((obj) => (
                                <CardFuncionarios key={obj.idUSUARIO} data={obj}/>
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
