import { Actions } from "@/components/Actions";
import { PageInfoText } from "@/components/PageInfoText";
import BackButton from "./BackButton";
import { MdHotel } from "react-icons/md";



export function ContainerHospedes(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área de Hóspedes"/>
                <Actions icon={<MdHotel size={90}/>} title="Hóspedes"/>
            </div>
        </div>
    )
}