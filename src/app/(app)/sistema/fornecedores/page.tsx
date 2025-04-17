'use client'

import { ContainerFornecedores } from "@/components/ContainerFornecedores"
import { MyButton } from "@/components/MyButton";
import sistemaService from "@/services/sistemaService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDeleteForever, MdRemoveRedEye } from "react-icons/md";
import { useSelector } from "react-redux";

interface IFornecedorData {
    idFORNECEDOR: number;
    NOME: string;
    EMAIL: string;
    TELEFONE: string;
    CNPJ: string;
    NOME_CONTATO: string;
}

export default function Fornecedores(){
    const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState<IFornecedorData[]>([]);
	const { getAllFornecedor, deleteFornecedor } = sistemaService;
    const router = useRouter();

	useEffect(() => {
		async function fetchAll(){
			const res = await getAllFornecedor(user.token); 
			setData(res.data);
		}
		fetchAll()
	}, [user, getAllFornecedor]);

    async function handleDelete(id: number){
        const res = await deleteFornecedor(id, user.token);
        if(res.type == "SUCCESS"){
            const newD = data.filter((obj) => {
                return obj.idFORNECEDOR !== id
            })
            setData(newD);
        }
    }
    
    return(
        <div className="min-h-screen">
            <ContainerFornecedores/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                <h1 className="text-center text-xl font-bold">Fornecedores cadastrados</h1>
                <div className="flex justify-end">
                    <MyButton buttonText="Criar" buttonType="button" handleClick={() => { router.push("/sistema/fornecedores/cadastrar") }}/>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {data && data.length > 0 ? data.map((obj) => (
                        <ul key={obj.idFORNECEDOR} className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
                            <li>Nome: {obj.NOME}</li>
                            <li>E-mail: {obj.EMAIL}</li>
                            <li>Telefone: {obj.TELEFONE}</li>
                            <li>CNPJ: {obj.CNPJ}</li>
                            <li>Nome do contato: {obj.NOME_CONTATO}</li>
                            <li><button type="button" onClick={() => handleDelete(Number(obj.idFORNECEDOR))}><MdDeleteForever size={24} className="text-button inline"/></button> <a href={`/sistema/fornecedores/editar/${obj.idFORNECEDOR}`}><MdRemoveRedEye size={24} className="text-button inline" /></a></li>
                        </ul>
                    )) : (
                        <div className="col-span-2 text-center p-4">
                            <p className="text-gray-500">Nenhum fornecedor cadastrado</p>
                        </div>
                    )}
                </div>
            </div>
        </div>  
    )
}