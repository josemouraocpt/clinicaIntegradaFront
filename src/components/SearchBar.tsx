'use client'

import Link from "next/link"
import { MyButton } from "./MyButton"
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";

interface ISearchBarProps{
    data: any
    setAuxData: Dispatch<SetStateAction<never[]>>
    path: string
	type: string
}

export function SearchBar({data, setAuxData, path, type}: ISearchBarProps){
	const [search, setSearch] = useState("");
    const router = useRouter();

    function handleClick(){
		if(search == ""){
			return;
		}
		let newArr = [];
		if(type == "HOSPEDE"){
			data.map((obj) => {
				if(obj.idHOSPEDE == search || obj.NOME_COMPLETO.includes(search)){
					newArr.push(obj);
				}
			})
		}else{
			data.map((obj) => {
				if(obj.idUSUARIO == search || obj.NOME.includes(search)){
					newArr.push(obj)
				}
			})
		}
		setAuxData(newArr);
	}

    function handleChange(e: React.FormEvent<HTMLInputElement>){
		setSearch(e.currentTarget.value)
		if(e.currentTarget.value == ""){
			setAuxData(data)
		}
	}

    return(
        <div>
			<div className="space-x-3 p-2">
				<Link href={path}>
					<MyButton buttonText="Realizar novo cadastro"/>
				</Link>
				<MyButton buttonText="Voltar" handleClick={() => router.back()}/>
			</div>
			{data !== undefined ? (
                <div className="flex gap-x-6">
                    <input type="text" className="input" value={search} placeholder="Digite o nome de pesquisa ou o ID" name="pesquisa" onChange={handleChange}/>
                    <div>
                        <button type="button" onClick={handleClick} className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover">Pesquisar</button>
                    </div>
                </div>
			) : (
				<div className="text-label min-h-[60vh] flex flex-col justify-center items-center">
					<MdSearch size={90}/>
					<p>Sem pesquisas no momento</p>
				</div>
			)}
		</div>
    )
}