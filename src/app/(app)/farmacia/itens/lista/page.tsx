'use client'
import { ContainerFarmacia } from "@/components/ContainerFarmacia"
import { EstoqueCard } from "@/components/EstoqueCard";
import { SetorInfo } from "@/components/SetorInfo";
import farmaciaService from "@/services/farmaciaService";
import { useEffect, useState } from "react";

interface IEstoqueData{
    idESTOQUE: number
    USUARIO_idUSUARIO: number
    NOME: string
    QUANTIDADE: number
    VALOR_UNITARIO: number
    VALOR_TOTAL: number
    VALIDADE: string
    DATA_INCLUSAO: string
    DATA_ALTERACAO: string
    ALTERADO_POR: string
    TIPO: string
} 

export default function ListaItem(){
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
    const [dataSet, setDataSet] = useState<Array<IEstoqueData>>([]);
    const [data, setData] = useState<IEstoqueData>();
    const [selected, setSelected] = useState(false);
    
    const { getItens } = farmaciaService;
    
    useEffect(() => {
        async function fetch() {
            const res = await getItens(user.token);
            setDataSet(res.data);
            
        }
        fetch() 
    }, []);

    function handleChange(value: string){
        if(value == ""){
            return setSelected(false);
        }
        setSelected(true);
        const item = dataSet.filter((med) => {
            return med.idESTOQUE == Number(value)
        })
        setData(item[0]);
    }
    
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <SetorInfo setor="Itens"/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10">
                {/* <SearchBar data={data} setAuxData={setAuxData} path="/farmacia/itens/cadastrar" keys={["idESTOQUE","NOME"]} /> */}
                <select className="input" onChange={e => {handleChange(e.target.value)}}>
                    <option hidden={true}></option>
                    {dataSet && dataSet.length > 0 ? dataSet.map((medicamento) => (
                        <option value={medicamento.idESTOQUE} key={medicamento.idESTOQUE}>{medicamento.NOME}</option>
                    )) : <option disabled>Nenhum item encontrado</option>}
                </select>
                <div className={selected == true ? 'flex justify-center' : 'hidden'}>
                    {data && (
                        <EstoqueCard data={data} path={`/farmacia/itens/editar/${data?.idESTOQUE}`}/>
                    )}
                </div>
            </div>
        </div>
    )
}