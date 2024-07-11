import { Actions } from "@/components/Actions";
import { Medicines } from "@/components/Medicines";
import { MyButton } from "@/components/MyButton";
import { PageInfoText } from "@/components/PageInfoText";
import { TbPill } from "react-icons/tb";
import Link from "next/link";
import BackButton from "./BackButton";



export function ContainerFarmacia(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área da Farmácia"/>
                <Actions icon={<TbPill size={90}/>} title="Farmácia"/>
            </div>
        </div>
    )
}