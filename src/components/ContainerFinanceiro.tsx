import { Actions } from "@/components/Actions";
import { PageInfoText } from "@/components/PageInfoText";
import BackButton from "./BackButton";
import { TbCurrencyReal } from "react-icons/tb";

export function ContainerFinanceiro(){
    return(
        <div>
            <BackButton/>   
            <div className="ml-10 mt-4 mb-5">
                <PageInfoText message="Você está na área de Financeiro"/>
                <Actions icon={<TbCurrencyReal size={90}/>} title="Financeiro"/>
            </div>
        </div>
    )
}