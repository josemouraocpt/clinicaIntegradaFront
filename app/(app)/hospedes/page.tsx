import { Search } from "@/components/Search";
import Link from "next/link";

export default function Hospedes(){
	return(
		<div className="p-4">
			<div>
				<h2 className="text-lg font-bold mt-5">Hospedes das Assopoc</h2>
				<p className="text-sm">Escolha uma das opções</p>
			</div>
			<div>
				<Search/>
			</div>
		</div>
	)
};
