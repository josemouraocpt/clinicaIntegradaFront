'use client'

import Link from "next/link"
import { MyButton } from "./MyButton"
import { Dispatch, SetStateAction, useState } from "react";
import { MdSearch } from "react-icons/md";

interface ISearchBarProps{
    data?: Array<any>
    setAuxData: Dispatch<SetStateAction<never[]>>
    path?: string
	keys: Array<string>
}
 
export function SearchBar({data, setAuxData, path, keys}: ISearchBarProps){
	const [search, setSearch] = useState("");

    function handleChange(e: React.FormEvent<HTMLInputElement>){
		setSearch(e.currentTarget.value)
		if(e.currentTarget.value == ""){
			setAuxData(data)
		}
	}

	function handleClick(){
		if(search == ""){
			return;
		}
		let newArr = [];
		const id = keys[0]
		const nome = keys[1]
		data.map((obj) => {
			if(obj[id] == search || obj[nome].includes(search)){
				newArr.push(obj);
			}
		})
		setAuxData(newArr);
	}


    return(
        <div>
			<div className="flex justify-end my-4">
				{path  && (
					<Link href={path}>
						<MyButton buttonText="Realizar novo cadastro"/>
					</Link>
				)}
			</div>
			{ data !== undefined &&  data?.length > 0 ? (
                <div className="flex gap-x-6">
                    <input type="text" className="input" value={search} placeholder="Digite o nome de pesquisa ou o ID" name="pesquisa" onChange={handleChange}/>
                    <div>
                        <button type="button" onClick={handleClick} className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover">Pesquisar</button>
                    </div>
                </div>
			) : (
				<div className="text-label min-h-[60vh] flex flex-col justify-center items-center">
					<MdSearch size={90}/>
					<p>Sem registros no momento.</p>
				</div>
			)}
		</div>
    )
}