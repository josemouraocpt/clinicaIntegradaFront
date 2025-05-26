'use client'
import { CardapioCard } from "@/components/CardapioCard";
import { ContainerCozinha } from "@/components/ContainerCozinha";
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import cozinhaService from "@/services/cozinhaService";
import { useEffect, useState } from "react";

interface ICardapioData{
    idCARDAPIO:  number
    USUARIO_idUSUARIO: number
    DATA_CARDAPIO: string
    HORARIO: string
    DESCRICAO: string
    NOME: string
    TIPO: string
    STATUS_CARDAPIO: string
}

export default function Padrao(){
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
	const [data, setData] = useState<Array<ICardapioData>>([]);
	const [auxData, setAuxData] = useState<Array<ICardapioData>>([]);
    const { getCardapiosPadrao } = cozinhaService;
    
    useEffect(() => {
		async function fetchAll(){
			const res = await getCardapiosPadrao(user.token);
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
            <SetorInfo setor="Cardápios padrão"/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} path="/cozinha/cardapios/cadastro" keys={["idCARDAPIO", "NOME"]} />
                <div>
                    {auxData && auxData.length > 0 ? (
                        <div className="grid grid-cols-2">
                            {auxData.map((obj) => (
                                <CardapioCard key={obj.idCARDAPIO} data={obj} path={`/cozinha/cardapios/editar/${obj.idCARDAPIO}`}/>
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