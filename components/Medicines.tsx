'use client'

import { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai"

const DUMMY_DATA = [
	{
		nome: "Losartana",
		preço: 5.99
	},
	{
		nome: "Tylenol",
		preço: 9.99
	},
	{
		nome: "Amoxilina",
		preço: 99.99
	}
];


export function Medicines(){
	const [selec, setSelec] = useState(false);
	const [selec2, setSelec2] = useState(false)
	function t(){
		setSelec(!selec)
		selec2 == true ? setSelec2(!selec2) : undefined
	}
	function t2(){
		setSelec(!selec)
		setSelec2(!selec2)
	}
	return(
		<div>
			<h2>
				Você está no setor de <span>Medicamentos</span>
			</h2>
			<div>
				<h3>Medicamentos cadastrados:</h3>
				<div className="border-gray-500 rounded border flex items-center w-1/6 justify-between p-2">
					<h4 className="text-gray-700">Medicamentos</h4>
					<button className="pl-1 border-l border-gray-500" onClick={t}><AiFillCaretDown size={20}/></button>
				</div>
					{selec && (
						DUMMY_DATA.map((item, index) => (
							<div className="bg-gray-300 w-1/6 p-1" key={index}>
								<button  onClick={t2} className="border-b border-gray-500 w-full text-left">{item.nome}</button>
							</div>
						))
					)}
					{selec2 && (
						<div className="w-2/4 ml-auto">
							<h3>Informações sobre o medicamento NOME DO MEDICAMENTO</h3>
							<ul>
								<li>Nome: MEDICAMENTO</li>
								<li>Preço: R$10.99</li>
							</ul>
					</div>
					)}
			</div>
		</div>
	)
}