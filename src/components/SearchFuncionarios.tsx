'use client'

import Link from "next/link";
import { MyButton } from "./MyButton";
import { MdSearch } from "react-icons/md";
import userService from "@/services/userService";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CardFuncionarios } from "./CardFuncionarios";
import { useRouter } from "next/navigation";


export function SearchFuncionarios(){
	const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState([]);
	const [auxData, setAuxData] = useState([]);
	const [search, setSearch] = useState("");
	const { getFuncionarios } = userService;
	const router = useRouter();

	useEffect(() => {
		async function fetchAll(){
			const res = await getFuncionarios(user.token);
            setData(res.users)
			setAuxData(res.users)
		}
		if(user.token !== undefined){
			fetchAll()
		}
	}, [user, getFuncionarios]);

	function handleClick(){
		if(search == ""){
			return
		}
		let newArr = []
		data.map((obj) => {
			if(obj.idUSUARIO == search || obj.NOME.includes(search)){
				newArr.push(obj)
			}
		})
		setAuxData(newArr)
	}

	function handleChange(e: React.FormEvent<HTMLInputElement>){
		setSearch(e.currentTarget.value)
		if(e.currentTarget.value == ""){
			setAuxData(data)
		}
	}

	return(
		<div className="bg-white p-8 rounded-lg shadow-xl space-y-5">
			<div className="space-x-3 p-2">
                <Link href="/register">
					<MyButton buttonText="Realizar novo cadastro"/>
				</Link>	
				<Link href="/dashboard">
					<MyButton buttonText="Voltar"/>
				</Link>
			</div>
			{auxData.length !== 0 ? (
				<>
					<div className="flex gap-x-6">
						<input type="text" className="input" value={search} placeholder="Digite o nome de pesquisa ou o ID" name="pesquisa" onChange={handleChange}/>
						<div>
							<button type="button" onClick={handleClick} className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover">Pesquisar</button>
						</div>
					</div>
					<div>
						{auxData && (
							<div className="grid grid-cols-2">
								{auxData.map((obj) => (
									<CardFuncionarios key={obj.idUSUARIO} data={obj}/>
								))}
							</div>
						)}
					</div>
				</>
			) : (
				<div className="text-label min-h-[60vh] flex flex-col justify-center items-center">
					<MdSearch size={90}/>
					<p>Sem pesquisas no momento</p>
				</div>
			)}
		</div>
	)
};
