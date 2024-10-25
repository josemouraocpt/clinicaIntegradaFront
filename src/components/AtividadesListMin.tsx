interface IAtividadesListMinProps{
    data: IHospedeEmAtividadeData
}
interface IHospedeEmAtividadeData{
    NOME_COMPLETO: string;
    HOSPEDE_idHOSPEDE: number;
    OBSERVACOES_HOSPEDE_ATIVIDADE?: string;
}

export function AtividadesListMin({data}: IAtividadesListMinProps){
    return(
        <div className="flex space-x-2 mb-1 w-full">
            <p className="border border-button shadow-sm w-4/12 outline-none p-1">{data.NOME_COMPLETO}</p>
            <p className="border border-button shadow-sm w-4/12 outline-none p-1">{data.HOSPEDE_idHOSPEDE}</p>
            <p className="border border-button shadow-sm w-4/12 outline-none p-1">{data.OBSERVACOES_HOSPEDE_ATIVIDADE}</p>
        </div>
    )
}