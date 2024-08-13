import { Actions } from "@/components/Actions";
import { PageInfoText } from "@/components/PageInfoText";
import BackButton from "./BackButton";
import { MdOutlineLightbulb } from "react-icons/md";

export function ContainerProjeto(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área de Projetos"/>
                <Actions icon={<MdOutlineLightbulb size={90}/>} title="Projetos"/>
            </div>
        </div>
    )
}