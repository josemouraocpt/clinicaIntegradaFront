export function LancarPresencaList(){
    return(
        <div className="flex space-x-2 mb-1 w-full">
            <input type="text" className="border border-button shadow-sm w-4/12 outline-none p-1" placeholder="Nome do hóspede"/>
            <input type="number" className="border border-button shadow-sm w-4/12 outline-none p-1" placeholder="Matricula do hóspede"/>
            <input type="text" className="border border-button shadow-sm w-4/12 outline-none p-1" placeholder="Observações"/>
        </div>
    )
}