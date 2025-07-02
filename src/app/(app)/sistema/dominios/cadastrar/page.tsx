'use client'

import { ContainerDominios } from "@/components/ContainerDominios"
import { DominioForm } from "@/components/DominioForm"

export default function CadastroDominio(){
    return(
        <div className="min-h-screen">
            <ContainerDominios/>
            <DominioForm action="CRIAR"/>
        </div>
    )
}