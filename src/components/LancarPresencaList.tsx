"use client"

import { useState } from "react";
import { MyButton } from "./MyButton";

interface ILancarPresencaListProps{
    data: Array<IHospedeData>
    idAtividade: string
    setData: any
}
interface IHospedeData {
    idHOSPEDE: number;
    DADOS_MEDICOS_idDADOS_MEDICOS: number;
    NOME_COMPLETO: string;
    NOME_SOCIAL?: string;
    APELIDO?: string;
    RG: string;
    CPF: string;
    NACIONALIDADE: string;
    NATURALIDADE: string;
    ESTADO_CIVIL: string;
    DATA_NASCIMENTO: Date;
    NOME_MAE: string;
    NOME_PAI?: string;
    TELEFONE: string;
    PROFISSAO?: string;
    TITULO_ELEITOR?: string;
    ENDERECO: string;
    CIDADE: string;
    UF: string;
    CEP: string;
    DATA_ENTRADA: Date;
    RESPONSAVEL: string;
    STATUS_HOSPEDE: string;
}
export function LancarPresencaList({data, idAtividade, setData}: ILancarPresencaListProps){
    const [ATIVIDADES_idATIVIDADES, setATIVIDADES_idATIVIDADES] = useState<string>(idAtividade);
    const [HOSPEDE_idHOSPEDE, setHOSPEDE_idHOSPEDE] = useState<string>();
    const [OBSERVACOES_HOSPEDE_ATIVIDADE, setOBSERVACOES_HOSPEDE_ATIVIDADE] = useState<string>();

    function createObj(){
        const obj = {
            ATIVIDADES_idATIVIDADES,
            HOSPEDE_idHOSPEDE,
            OBSERVACOES_HOSPEDE_ATIVIDADE
        }
        setData(state => [...state, obj]);
    }

    return(
        <div className="flex space-x-2 mb-1 w-full">
            <select className="border border-button shadow-sm w-4/12 outline-none p-1" onChange={e => { setHOSPEDE_idHOSPEDE(e.currentTarget.value) }}>
                <option hidden={true}></option>
                {data && (
                    data.map((hospede) => (
                        <option value={hospede.idHOSPEDE} key={hospede.idHOSPEDE}>{hospede.NOME_COMPLETO}</option>
                    ))
                )}
            </select>
            <input onChange={e => { setOBSERVACOES_HOSPEDE_ATIVIDADE(e.currentTarget.value) }}  type="text" className="border border-button shadow-sm w-4/12 outline-none p-1" placeholder="Observações"/>
            <MyButton buttonText="Confirmar" buttonType="button" handleClick={createObj}/>
        </div>
    )
}