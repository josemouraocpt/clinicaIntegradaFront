import { Actions } from "@/components/Actions";
import { PageInfoText } from "@/components/PageInfoText";
import BackButton from "./BackButton";
import { MdBusinessCenter } from "react-icons/md";


export function ContainerUsuarios(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área de Funcionários"/>
                <Actions icon={<MdBusinessCenter size={90}/>} title="Funcionários"/>
            </div>
        </div>
    )
}