import { Actions } from "@/components/Actions";
import { PageInfoText } from "@/components/PageInfoText";
import BackButton from "./BackButton";
import { MdSportsSoccer } from "react-icons/md";

export function ContainerAtividades(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área de Atividades Diárias"/>
                <Actions icon={<MdSportsSoccer size={90}/>} title="Atividades Diárias"/>
            </div>
        </div>
    )
}