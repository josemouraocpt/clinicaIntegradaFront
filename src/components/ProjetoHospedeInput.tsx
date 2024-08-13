export function ProjetoHospedeInput(){
    return(
        <div className="my-5">
            <label>ID do hóspede:
                <input type="number" className="input"/>
            </label>
            <label>Nome do hóspede:
                <input type="text" className="input"/>
            </label>
        </div>
    )
}