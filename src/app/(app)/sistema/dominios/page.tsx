'use client'
import { ContainerDominios } from "@/components/ContainerDominios"
import { MyButton } from "@/components/MyButton";
import sistemaService from "@/services/sistemaService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdRemoveRedEye } from "react-icons/md";
interface IDominioData {
    idSTATUS_DOMAIN: number;
    STATUS_TYPE: string;
    STATUS_VALUE: string;
    STATUS_DESCRIPTION: string;
}

export default function Dominios(){
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
	const [data, setData] = useState<IDominioData[]>([]);
	const { getAllDominio, deleteDominio } = sistemaService;
    const router = useRouter();

	useEffect(() => {
		async function fetchAll(){
			const res = await getAllDominio(user.token); 
			setData(res.data);
		}
		fetchAll();
	}, []);

    async function handleDelete(id: number){
        const res = await deleteDominio(id, user.token);
        if(res.type == "SUCCESS"){
            const newD = data.filter((obj) => {
                return obj.idSTATUS_DOMAIN !== id
            })
            setData(newD);
        }
    }

    return(
        <div className="min-h-screen">
            <ContainerDominios/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <h1 className="text-center text-xl font-bold">Dominios cadastrados</h1>
                <div className="flex justify-end">
                    <MyButton buttonText="Criar" buttonType="button" handleClick={() => { router.push("/sistema/dominios/cadastrar") }}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {data && data.length > 0 ? data.map((obj) => (
                        <ul key={obj.idSTATUS_DOMAIN} className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
                            <li>Tipo: {obj.STATUS_TYPE}</li>
                            <li>Valor: {obj.STATUS_VALUE}</li>
                            <li>Descrição: {obj.STATUS_DESCRIPTION}</li>
                            <li><button type="button" onClick={() => handleDelete(Number(obj.idSTATUS_DOMAIN))}><MdDeleteForever size={24} className="text-button inline"/></button> <a href={`/sistema/dominios/editar/${obj.idSTATUS_DOMAIN}`}><MdRemoveRedEye size={24} className="text-button inline" /></a></li>
                        </ul>
                    )) : (
                        <div className="col-span-2 text-center p-4">
                            <p className="text-gray-500">Nenhum domínio cadastrado</p>
                        </div>
                    )}
                </div>
            </div>
        </div>  
    )
}