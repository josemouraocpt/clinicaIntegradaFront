"use client"
import { ContainerFarmacia } from "@/components/ContainerFarmacia";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import Link from "next/link";

export default function Medicamentos(){
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <div className="flex justify-between mr-4">
                <SetorInfo setor="Medicamentos"/>
                <div className="flex space-x-2">
                    <Link href='/farmacia/medicamentos/cadastrar' hidden={["SOCIAL", "ADMIN", "SAUDE-Farmácia"].includes(user.user.access) ? false : true}>
                        <MyButton buttonText='Cadastrar'/>
                    </Link>
                    <Link href='/farmacia/medicamentos/lista'>
                        <MyButton buttonText='Verificar'/>
                    </Link>
                </div>    
            </div>
        </div>
    )
}