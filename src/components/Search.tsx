'use client'

import Link from "next/link";
import { Card } from "./Card";
import { MyButton } from "./MyButton";
import { MdSearch } from "react-icons/md";
import userService from "@/services/userService";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function Search(){
	const { user } = useSelector((state) => state.auth);
	const [data, setData] = useState([]);
	const { getHospedes } = userService;

	useEffect(() => {
		async function fetchAll(){
			const res = await getHospedes(user.token);
			setData(res.guest)
		}
		fetchAll()
	}, [user, getHospedes])

	return(
		<div className="bg-white p-8 rounded-lg shadow-xl space-y-5">
			<div className="space-x-3 p-2">
				<Link href="/hospedes/cadastro">
					<MyButton buttonText="Realizar novo cadastro"/>
				</Link>
				<Link href="/dashboard">
					<MyButton buttonText="Cancelar"/>
				</Link>
			</div>
			{data.length !== 0 ? (
				<>
					<div>
						<form className="w-3/5 flex flex-row space-x-3">
							<input type="text" className="input" placeholder="Digite o nome de pesquisa ou o ID"/>
							<div>
								<MyButton buttonText="Pesquisar" buttonType="input"/>
							</div>
						</form>
					</div>
					<div className="grid grid-cols-2 gap-y-6">
						{/* {pesquisa ? (
							<div className="text-label min-h-[60vh] flex flex-col justify-center items-center">
								<MdSearch size={90}/>
								<p>Sem pesquisas no momento</p>
							</div>
						): (
							<>
							<Card/>
							</>
						)} */}
					</div>
				</>
			) : (
				<div>
					<h2>
						Sem hospedes cadastrados.
					</h2>
				</div>
			)}
			
		</div>
	)
};
