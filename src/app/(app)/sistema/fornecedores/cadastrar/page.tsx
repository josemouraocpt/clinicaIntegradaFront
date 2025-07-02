'use client'

import { ContainerFornecedores } from "@/components/ContainerFornecedores"
import { FornecedorForm } from "@/components/FornecedorForm"

export default function CadastroFornecedores(){
    return(
        <div className="min-h-screen">
            <ContainerFornecedores/>
            <FornecedorForm action="CRIAR"/>
        </div>
    )
}