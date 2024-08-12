import { MyButton } from "./MyButton";

export function AtividadeForm(){
    return(
        <div className="bg-white p-5 rounded-md mb-20 shadow-lg mx-10">
            <form>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label>Nome da atividade:
                            <input type="text" className="input" />
                        </label>
                        <label>Departamento responsável:
                            <input type="text" className="input"/>
                        </label>
                        <label>Profissional responsável:
                            <input type="text" className="input"/>
                        </label>
                        <label>Documento do responsável:
                            <input type="text" className="input"/>
                        </label>
                        <label>Frequência:
                            <input type="text" className="input"/>
                        </label>
                        <label>Data da atividade:
                            <input type="date" className="input"/>
                        </label>
                    </div>
                    <div>
                        <label>Horário de início:
                            <input type="text" className="input"/>
                        </label>
                        <label>Data de fim:
                            <input type="date" className="input"/>
                        </label>
                        <label>Horário de fim:
                            <input type="text" className="input"/>
                        </label>
                        <label>Periodicidade:
                            <input type="text" className="input" />
                        </label>
                        <label>Status:
                            <select className="input">
                                <option hidden={true}></option>
                                <option>ATIVA</option>
                                <option>INATIVA</option>
                            </select>
                        </label>
                        <label>Observações:
                            <textarea className="input"></textarea>
                        </label>
                    </div>
                </div>
                <div className="my-2 flex justify-end">
                    <MyButton buttonText="Salvar" buttonType="submit"/>
                </div>
            </form>
        </div>
    )
}