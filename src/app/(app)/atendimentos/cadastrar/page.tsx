import { ContainerAtendimento } from "@/components/ContainerAtendimento";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";

export default function CadastrarAtendimento(){
    return(
        <div className="min-h-screen">
            <ContainerAtendimento/>
            <SetorInfo setor="Atendimentos"/>
            <div className="m-10 bg-white p-8 rounded-lg shadow-xl">
                <form>
                    <div className="grid grid-cols-2 gap-2 gap-x-6">
                        <div>
                            <label>Tipo do atendimento:
                                <input type="text" className="input" />
                            </label>
                            <label>Data do atendimento:
                                <input type="date" className="input" />
                            </label>
                            <label>Motivo do atendimento:
                                <input type="text" className="input" />
                            </label>
                            <label>Procedimento realizado:
                                <textarea className="input"></textarea>
                            </label>
                        </div>
                        <div>
                            <label>Observações:
                                <textarea className="input"></textarea>
                            </label>
                            <label>ID hóspede:
                                <select className="input">
                                    <option hidden={true}></option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </label>
                            <label>Médico:
                                <input type="text" className="input" />
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-end m-2">
                        <MyButton buttonText="Salvar" buttonType="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}