import { MdPermIdentity } from "react-icons/md";
import { MyButton } from "./MyButton";
import Link from "next/link";

export function CardFuncionarios({data}: any){
	return(
		<div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
			<div className="flex space-x-5">
				<div>
					<MdPermIdentity size={96}/>
				</div>
				<div className="flex flex-col">
					<h3 className="font-bold">{data.idUSUARIO} <span className="text-button">{data.NOME}</span></h3>
					<ul className="columns-2">
						<li>Setor: {data.DESCRICAO}</li>
						<li>Perfil: {data.TIPO}</li>
					</ul>
				</div>
			</div>
				<div className="flex justify-end">
					<Link href={`/funcionarios/detalhes/${data.idUSUARIO}`}>
						<MyButton buttonText="Ver mais"/>
					</Link>
				</div>
		</div>
	)
};