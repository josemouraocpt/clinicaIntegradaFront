import { MyButton } from "./MyButton";

export function FormFarmacia(){
    return(
        <div className="bg-white p-4">
            <form className="grid grid-cols-2 gap-4">
                <div>
                    <label>Nome:
                        <input className="input" type="text" />
                    </label>
                    <label>Quantidade:
                        <input className="input" type="text"/>
                    </label>
                    <label>Valor unitário:
                        <input className="input" type="text"/>
                    </label>
                    <label>Data de validade:
                        <input className="input" type="date"/>
                    </label>
                    <label>Tipo do item:
                        <select className="input">
                            <option hidden={true}></option>
                            <option>Medicamento</option>
                            <option>Farmacia</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>Nome do fornecedor:
                        <input className="input" type="text"/>
                    </label>
                    <label>CPNJ do fornecedor:
                        <input className="input" type="text"/>
                    </label>
                    <label>Nome do contato:
                        <input className="input" type="text"/>
                    </label>
                    <label>Email do contato:
                        <input className="input" type="text"/>
                    </label>
                    <label>Telefone do contato:
                        <input className="input" type="text"/>
                    </label>
                </div>
                <div></div>
                <div className="flex justify-end">
                    <MyButton buttonText="Cadastrar" buttonType="submit"/>
                </div>
            </form>
        </div>
    )
}