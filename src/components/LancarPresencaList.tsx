"use client"

interface ILancarPresencaListProps{
    data: Array<IHospedeData>
    handleChange1: any
    handleChange2: any
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
export function LancarPresencaList({data, handleChange1, handleChange2}: ILancarPresencaListProps){
    return(
        <div className="flex space-x-2 mb-1 w-full">
            <select className="border border-button shadow-sm w-4/12 outline-none p-1" onChange={e => { handleChange1(e.currentTarget.value) }}>
                <option hidden={true}></option>
                {data && (
                    data.map((hospede) => (
                        <option value={hospede.idHOSPEDE} key={hospede.idHOSPEDE}>{hospede.NOME_COMPLETO}</option>
                    ))
                )}
            </select>
            <input onChange={e => { handleChange2(e.currentTarget.value) }}  type="text" className="border border-button shadow-sm w-4/12 outline-none p-1" placeholder="Observações"/>
        </div>
    )
}