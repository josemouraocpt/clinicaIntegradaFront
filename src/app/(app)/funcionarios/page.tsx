import { SearchFuncionarios } from "@/components/SearchFuncionarios";
import Link from "next/link";

export default function Funcionarios(){
	return(
		<div className="p-4 min-h-screen">
			<div>
				<h2 className="text-lg font-bold mt-5">Funcionários das Assopoc</h2>
			</div>
			<div>
				<SearchFuncionarios/>
			</div>
		</div>
	)
};
