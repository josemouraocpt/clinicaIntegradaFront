import Link from "next/link";

export function CardapioForm(){
    return(
        <div className='bg-white p-5 rounded-md mb-20 shadow-lg m-10'>
            <form>
                <label>Título do cardápio:
                    <input className="input" type="text" />
                </label>
                <label>Data do cardápio:
                    <input className="input" type="text" />
                </label>
                <label>Horario do cardárpio:
                    <input className="input" type="text" />
                </label>
                <label>Descrição do cardápio:
                    <textarea className="input"/>
                </label>
                <div className='flex space-x-2 items-center justify-end m-4'>
                    <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="submit">
                        Cadastrar
                    </button>
                    <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="button">
                        <Link href="/cozinha/cardapios">Voltar</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}