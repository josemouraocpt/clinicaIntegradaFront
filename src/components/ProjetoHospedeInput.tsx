"use client"

interface IProjetoHospedeInputProps{
    data: Array<IHospedeData>
    handleChange: any
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

export function ProjetoHospedeInput({data, handleChange}: IProjetoHospedeInputProps){
    return(
        <div className="my-5">
            <label>Nome do hóspede:
                <select className="input" onChange={e => {handleChange(e.currentTarget.value)}} >
                    <option hidden={true}></option>
                    {data && (
                        data.map((hospede) => (
                            <option value={hospede.idHOSPEDE} key={hospede.idHOSPEDE}>{hospede.NOME_COMPLETO}</option>
                        ))
                    )}
                </select>
            </label>
        </div>
    )
}