import { Actions } from "@/components/Actions";
import { PageInfoText } from "@/components/PageInfoText";
import BackButton from "./BackButton";
import { MdRestaurant } from "react-icons/md";

export function ContainerCozinha(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área da Cozinha"/>
                <Actions icon={<MdRestaurant size={90}/>} title="Cozinha"/>
            </div>
        </div>
    )
}