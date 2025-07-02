'use client'
import { ContainerCozinha } from "@/components/ContainerCozinha";
import { EstoqueCard } from "@/components/EstoqueCard";
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import cozinhaService from "@/services/cozinhaService";
import { useEffect, useState } from "react";

interface IEstoqueData{
    idESTOQUE: number
    USUARIO_idUSUARIO: number
    NOME: string
    QUANTIDADE: number
    VALOR_UNITARIO: number
    VALOR_TOTAL: number
    VALIDADE: string
    DATA_INCLUSAO: string
    DATA_ALTERACAO: string
    ALTERADO_POR: string
    TIPO: string
}

export default function Estoque(){
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
	const [data, setData] = useState<Array<IEstoqueData>>([]);
	const [auxData, setAuxData] = useState<Array<IEstoqueData>>([]);
    const { getMercadorias } = cozinhaService;

    useEffect(() => {
		async function fetchAll(){
			const res = await getMercadorias(user.token);
			if(res.type == "SUCCESS"){
				setData(res.data);
				setAuxData(res.data);
			}
		}
		if(user.token !== undefined){
			fetchAll()
		}
	}, []);
    
    return(
        <div className="min-h-screen">
            <ContainerCozinha/>
            <SetorInfo setor="Estoque"/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} path={["SOCIAL", "ADMIN", "SAUDE-Cozinha"].includes(user.user.access) ? '/cozinha/estoque/cadastrar' : null} keys={["idESTOQUE", "NOME"]} />
                <div>
                    {auxData && auxData.length > 0 ? (
                        <div className="grid grid-cols-2">
                            {auxData.map((obj) => (
                                <EstoqueCard key={obj.idESTOQUE} data={obj} path={`/cozinha/estoque/editar/${obj.idESTOQUE}`}/>
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