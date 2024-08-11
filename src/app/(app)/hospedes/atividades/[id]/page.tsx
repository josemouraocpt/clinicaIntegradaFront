import { AtividadesList } from "@/components/AtividadesList";
import { ContainerHospedes } from "@/components/ContainerHospedes";
import { MyButton } from "@/components/MyButton";

export default function AtividadesHospedes(){
    return(
        <div className="min-h-screen">
            <ContainerHospedes/>
            <div className="bg-white p-8 rounded-lg shadow-xl m-10">
                <div>
                    <h1 className="text-2xl">ID DO HOSPEDE - <span className="text-button">NOME DO HOSPEDE</span></h1>
                    <ul>
                        <li>Data de entrada: </li>
                        <li>Idade: </li>
                        <li>Nível de dependência: </li>
                        <li>Quarto: </li>
                        <li>Leito: </li>
                        <li>Responsável: </li>
                    </ul>
                </div>
                <div className="my-6">
                    <h1 className="text-center text-2xl text-button">Filtros</h1>
                    <form className="flex justify-between">
                        <label className="text-button text-2xl">Atividade:
                            <select className="block w-52 border border-button rounded-lg outline-none">
                                <option hidden={true}></option>
                                <option>Academia</option>
                            </select>
                        </label>
                        <label className="text-button text-2xl">Mês:
                            <select className="block w-52 border border-button rounded-lg outline-none">
                                <option hidden={true}></option>
                                <option>01/2024</option>
                                <option>02/2024</option>
                                <option>03/2024</option>
                                <option>04/2024</option>
                                <option>05/2024</option>
                            </select>
                        </label>
                        <div>
                            <MyButton buttonText="Aplicar" buttonType="submit"/>
                        </div>
                    </form>
                </div>
                <div>
                    <div className="flex space-x-2 mt-4 mb-1 w-full">
                        <h2 className="font-bold text-xl text-center p-1 bg-gray-400 w-1/5 text-white">
                            Data
                        </h2>
                        <h2 className="font-bold text-xl text-center p-1 bg-gray-400 w-1/5 text-white">
                            Atividade
                        </h2>
                        <h2 className="font-bold text-xl text-center p-1 bg-gray-400 w-1/5 text-white">
                            Professor(a)
                        </h2>
                        <h2 className="font-bold text-xl text-center p-1 bg-gray-400 w-3/5 text-white">
                            Observações
                        </h2>
                    </div>
                   <AtividadesList/>
                   <AtividadesList/>
                   <AtividadesList/>
                   <AtividadesList/>
                </div>
            </div>
        </div>
    )
}