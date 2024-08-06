interface ISetorInfoProps{
    setor: string
}

export function SetorInfo({setor}: ISetorInfoProps){
    return(
        <div className="ml-10">
            <h1 className="text-xl font-bold">Você está no setor de <br/><span className="text-button">{setor}</span></h1> 
        </div>
    )
}