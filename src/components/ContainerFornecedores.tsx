import { Actions } from "@/components/Actions";
import { PageInfoText } from "@/components/PageInfoText";
import BackButton from "./BackButton";
import { MdContentPaste } from "react-icons/md";

export function ContainerFornecedores(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área de Sistema - Fornecedores"/>
                <Actions icon={<MdContentPaste size={90}/>} title="Fornecedores"/>
            </div>
        </div>
    )
}