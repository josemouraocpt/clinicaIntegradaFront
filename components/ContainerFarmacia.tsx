import { Actions } from "@/components/Actions";
import { Medicines } from "@/components/Medicines";
import { MyButton } from "@/components/MyButton";
import { PageInfoText } from "@/components/PageInfoText";
import { TbPill } from "react-icons/tb";
import Link from "next/link";
import BackButton from "./BackButton";



export function ContainerFarmacia(){
    return( 
        <div className="p-4 space-y-7 h-screen">
            <BackButton/>
			<PageInfoText message="Você está na área da Farmácia"/>
			<Actions icon={<TbPill size={90}/>} title="Farmácia"/>
			<div>
				<h2 className="font-bold text-lg mb-5">
					Você está no setor de:{}
                </h2>
            </div>
		</div>
    )
}