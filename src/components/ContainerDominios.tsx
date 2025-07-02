import { Actions } from "@/components/Actions";
import { PageInfoText } from "@/components/PageInfoText";
import BackButton from "./BackButton";
import { MdOutlineAppRegistration } from "react-icons/md";

export function ContainerDominios(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área de Sistema - Dominios"/>
                <Actions icon={<MdOutlineAppRegistration size={90}/>} title="Dominios"/>
            </div>
        </div>
    )
}