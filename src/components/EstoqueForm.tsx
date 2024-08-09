import Link from "next/link";

interface IEstoqueFormProps{
    type: string
}

export function EstoqueForm({type}: IEstoqueFormProps){
    return(
        <div className='bg-white p-5 rounded-md mb-20 shadow-lg m-10'>
            <form>
                <label>Nome da mercadoria:
                    <input className="input" type="text" />
                </label>
                <label>Quantidade:
                    <input className="input" type="number" />
                </label>
                <label>Valor unitário:
                    <input className="input" type="text" />
                </label>
                <label>Data de validade:
                    <input className="input" type="date"/>
                </label>
                <div className='flex space-x-2 items-center justify-end m-4'>
                    {type == "CADASTRAR" ? (
                        <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="submit">
                        Cadastrar
                    </button>
                    ): (
                        <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="submit">
                            Salvar
                        </button>
                    )}
                    <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="button">
                        <Link href="/cozinha/estoque">Voltar</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}