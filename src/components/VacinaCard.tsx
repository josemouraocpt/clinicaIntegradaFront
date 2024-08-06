interface IVacinaProps{
    data: {
        nome: string
        fabricante: string
        validade: string
        fabricação: string
        lote: string
        dosagem: string
        tipoArmazenamento: string
        condiçãoArmazenamento: string
        quantidadeEstoque: number
        fornecedor: string
        cpnjFornecedor: string
    }
}
export function VacinaCard(data: IVacinaProps){
    return(
        <div className="bg-background max-w-[50vw] p-5 rounded-md shadow-md">
            <h1 className="text-lg font-bold text-center">{data.data.nome}</h1>
            <div className="grid grid-cols-2">
                <ul>
                    <li>Fabricante: {data.data.fabricante}</li>
                    <li>Validade: {data.data.validade}</li>
                    <li>Data de fabricação: {data.data.fabricação}</li>
                    <li>Lote: {data.data.lote}</li>
                    <li>Dosagem: {data.data.dosagem}</li>
                    <li>Tipo de armazenamento: {data.data.tipoArmazenamento}</li>
                </ul>
                <ul>
                    <li>Condição do armazenamento: {data.data.condiçãoArmazenamento}</li>
                    <li>Quantidade em estoque: {data.data.quantidadeEstoque}</li>
                    <li>Fornecedor: {data.data.fornecedor}</li>
                    <li>CPNJ do fornecedor: {data.data.cpnjFornecedor}</li>
                </ul>
            </div>
        </div>
    )
}