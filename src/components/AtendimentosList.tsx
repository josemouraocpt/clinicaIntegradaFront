'use client';

import { useEffect, useState } from "react";
import { MdCheckCircle, MdCheckCircleOutline } from "react-icons/md";

interface IAtendimentosListProps{
    canEdit: boolean,
    data: any
    setDataToSend: any, 
    confirmArr: any
}

export function AtendimentosList({canEdit, data, setDataToSend, confirmArr}: IAtendimentosListProps){
    const [DATA_ATENDIMENTO, setDATA_ATENDIMENTO] = useState(data.DATA_ATENDIMENTO.substring(0, 10));
    const [TIPO, setTIPO] = useState(data.TIPO);
    const [NOME_MEDICO, setNOME_MEDICO] = useState(data.NOME_MEDICO);
    const [MOTIVO, setMOTIVO] = useState(data.MOTIVO);
    const [PROCEDIMENTO, setPROCEDIMENTO] = useState(data.PROCEDIMENTO);
    const [RECOMENDACOES, setRECOMENDACOES] = useState(data.RECOMENDACOES);
    const [pressed, setPressed] = useState(false);
    const [localEditConst, setLocalEditConst] = useState(false);

    function handleClick(){
        setPressed(!pressed);
        if(!pressed){
            const data2 = {
                idATENDIMENTO: data.idATENDIMENTO,
                DATA_ATENDIMENTO: DATA_ATENDIMENTO,
                TIPO: TIPO,
                NOME_MEDICO: NOME_MEDICO,
                MOTIVO: MOTIVO,
                PROCEDIMENTO: PROCEDIMENTO,
                RECOMENDACOES: RECOMENDACOES,
                ANEXO: data.ANEXO ,
                DOCUMENTO_MEDICO: data.DOCUMENTO_MEDICO,
                HOSPEDE_idHOSPEDE: data.HOSPEDE_idHOSPEDE,
                USUARIO_idUSUARIO: data.USUARIO_idUSUARIO
            }
            setDataToSend(state => [...state, data2]);
            confirmArr(state => [...state, pressed]);
        }else{
            confirmArr(prevItems => prevItems.slice(0, -1))
        }
        setLocalEditConst(!localEditConst);
    }

    useEffect(() => {
        if(canEdit){
            setLocalEditConst(!localEditConst)
        }else{
            setLocalEditConst(false)
        }
    }, [canEdit])

    return(
        <>
            <input type="text" readOnly={!localEditConst} className="border p-1 border-gray-500 shadow-sm w-1/5" value={new Date(DATA_ATENDIMENTO).toLocaleDateString("pt-BR")} onChange={(e) => { setDATA_ATENDIMENTO(e.currentTarget.value) }}/> 
            <input type="text" readOnly={!localEditConst} className="border p-1 border-gray-500 shadow-sm w-1/5" value={TIPO} onChange={(e) => { setTIPO(e.currentTarget.value) }}/>
            <input type="text" readOnly={!localEditConst} className="border p-1 border-gray-500 shadow-sm w-1/5" value={NOME_MEDICO} onChange={(e) => { setNOME_MEDICO(e.currentTarget.value) }}/>
            <input type="text" readOnly={!localEditConst} className="border p-1 border-gray-500 shadow-sm w-1/5" value={MOTIVO} onChange={(e) => { setMOTIVO(e.currentTarget.value) }}/>
            <input type="text" readOnly={!localEditConst} className="border p-1 border-gray-500 shadow-sm w-1/5" value={PROCEDIMENTO} onChange={(e) => { setPROCEDIMENTO(e.currentTarget.value) }}/>
            <input type="text" readOnly={!localEditConst} className="border p-1 border-gray-500 shadow-sm w-1/5" value={RECOMENDACOES} onChange={(e) => { setRECOMENDACOES(e.currentTarget.value) }}/>
            <button onClick={handleClick} type="button" className={canEdit ? "ml-10" : "hidden"} >
                {pressed === true ? (
                    <MdCheckCircle size={24} />
                ) : (
                    <MdCheckCircleOutline size={24} />
                )}
                
            </button>
        </>
    )
}