"use client"
import { ContainerFarmacia } from "@/components/ContainerFarmacia"
import { VacinaCard } from "@/components/VacinaCard"

const data = [
    {
        nome: "Vacina 1",
        fabricante: "Fabricante 1",
        validade: "01/01/2000",
        fabricação: "01/01/2000",
        lote: "Lote 1",
        dosagem: "Dosagem 1",
        tipoArmazenamento: "Armazenamento 1",
        condiçãoArmazenamento: "Condição 1",
        quantidadeEstoque: "Estoque 1",
        fornecedor: "Fornecedor 1",
        cpnjFornecedor: "CPNJ 1"
    },
    {
        nome: "Vacina 2",
        fabricante: "Fabricante 2",
        validade: "01/01/2000",
        fabricação: "01/01/2000",
        lote: "Lote 2",
        dosagem: "Dosagem 2",
        tipoArmazenamento: "Armazenamento 2",
        condiçãoArmazenamento: "Condição 2",
        quantidadeEstoque: "Estoque 2",
        fornecedor: "Fornecedor 2",
        cpnjFornecedor: "CPNJ 2"
    },
    {
        nome: "Vacina 2",
        fabricante: "Fabricante 2",
        validade: "01/01/2000",
        fabricação: "01/01/2000",
        lote: "Lote 2",
        dosagem: "Dosagem 2",
        tipoArmazenamento: "Armazenamento 2",
        condiçãoArmazenamento: "Condição 2",
        quantidadeEstoque: "Estoque 2",
        fornecedor: "Fornecedor 2",
        cpnjFornecedor: "CPNJ 2"
    }
]

export default function ListaVacinas(){
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <div className="m-10 grid grid-cols-2 gap-5 bg-white p-4 rounded-lg shadow-sm">
                {data.map((vacina, index) => (
                    <VacinaCard data={vacina} key={index}/>
                ))}
            </div>
        </div>
    )
}