import { Actions } from "@/components/Actions";
import { PageInfoText } from "@/components/PageInfoText";
import BackButton from "./BackButton";
import { TbPhysotherapist } from "react-icons/tb";

export function ContainerAtendimento(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área de Atendimentos"/>
                <Actions icon={<TbPhysotherapist size={90}/>} title="Atendimentos"/>
            </div>
        </div>
    )
}