import Link from "next/link";
import { Card } from "./Card";
import { MyButton } from "./MyButton";
import { MdSearch } from "react-icons/md";

export function Search(){
	const pesquisa = false;
	return(
		<div className="bg-white p-8 rounded-lg shadow-xl space-y-5">
			<div className="space-x-3 p-2">
				<Link href="/hospedes/cadastro">
					<MyButton buttonText="Realizar novo cadastro"/>
				</Link>
				<MyButton buttonText="Cancelar"/>
			</div>
			<div>
				<form className="w-3/5 flex flex-row space-x-3">
					<input type="text" className="input" placeholder="Digite o nome de pesquisa ou o ID"/>
					<div>
						<MyButton buttonText="Pesquisar" buttonType="input"/>
					</div>
				</form>
			</div>
			<div className="grid grid-cols-2 gap-y-6">
				{pesquisa ? (
					<div className="text-label min-h-[60vh] flex flex-col justify-center items-center">
						<MdSearch size={90}/>
						<p>Sem pesquisas no momento</p>
					</div>
				): (
					<>
					<Card/>
					</>
				)}
			</div>
		</div>
	)
};
