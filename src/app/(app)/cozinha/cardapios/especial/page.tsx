'use client'
import { CardapioCard } from "@/components/CardapioCard";
import { ContainerCozinha } from "@/components/ContainerCozinha";
import { SearchBar } from "@/components/SearchBar";
import { SetorInfo } from "@/components/SetorInfo";
import cozinhaService from "@/services/cozinhaService";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

export default function Especial(){
    const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState<Array<ICardapioData>>([]);
	const [auxData, setAuxData] = useState<Array<ICardapioData>>([]);
    const { getCardapiosEspecial } = cozinhaService;

    useEffect(() => {
		async function fetchAll(){
			const res = await getCardapiosEspecial(user.token);
			if(res.type == "SUCCESS"){
				setData(res.data);
				setAuxData(res.data);
			}
		}
		if(user.token !== undefined){
			fetchAll()
		}
	}, [user, getCardapiosEspecial]); 
    
    return(
        <div className="min-h-screen">
            <ContainerCozinha/>
            <SetorInfo setor="Cardáprios especiais"/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <SearchBar data={data} setAuxData={setAuxData} path="/cozinha/cardapios/cadastro" keys={["idCARDAPIO", "NOME"]} />
                <div>
                    {auxData && (
                        <div className="grid grid-cols-2">
                            {auxData.map((obj) => (
                                <CardapioCard key={obj.idCARDAPIO} data={obj} path={`/cozinha/cardapios/editar/${obj.idCARDAPIO}`}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}