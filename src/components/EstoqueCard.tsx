import { ActionsBox } from "./ActionsBox";

interface IEstoqueCardProps{
    path: string
}

export function EstoqueCard({path}: IEstoqueCardProps){
    return(
        <div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
            <h1 className="font-bold text-2xl text-center my-2">NOME DO PRODUTO</h1>
            <div>
                <ul>
                    <li>Quantidade em estoque: </li>
                    <li>Valor unitário: </li>
                    <li>Valor total: </li>
                    <li>Data da inclusão: </li>
                    <li>Alterado por: </li>
                    <li>Data da alteração: </li>
                </ul>
            </div>
            <div className="flex justify-end">
                <ActionsBox path={path}/>
            </div>
        </div>
    )
}