'use client';
import { useState } from "react";
import { MyButton } from "./MyButton";
import { ProjetoHospedeInput } from "./ProjetoHospedeInput";

export function ProjetoForm(){
    const [count, setCount] = useState(0);
    const [hospedes, setHospedes] = useState([0]);

    function handleClick(){
        setCount(count+1);
        const newState = [...hospedes, count];
        setHospedes(newState);
    };

    return(
        <div className="bg-white p-5 rounded-md mb-20 shadow-lg m-10">
            <form>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label>Nome do projeto:
                            <input type="text" className="input"/>
                        </label>
                        <label>Data do projeto:
                            <input type="date" className="input"/>
                        </label>
                        <label>Escopo do projeto:
                            <input type="text" className="input" />
                        </label>
                        <label>Atividade:
                            <textarea className="input"></textarea>
                        </label>
                    </div>
                    <div>
                        <label>Restrições:
                            <textarea className="input"></textarea>
                        </label>
                        <label>Custo do projeto:
                            <input type="text" className="input"/>
                        </label>
                        <label>ID do responsável:
                            <input type="text" className="input"/>
                        </label>
                        <label>Tipo do projeto:
                            <input type="text" className="input"/>
                        </label>
                    </div>
                    <div>
                        <h2>Lista de participantes</h2>
                        {hospedes.map((valor, index) => (
                            <ProjetoHospedeInput key={index}/>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end m-4 space-x-2">
                    <MyButton buttonText="Incluir" buttonType="button" handleClick={handleClick}/>
                    <MyButton buttonText="Salvar" buttonType="submit"/>
                </div>
            </form>
        </div>
    )
}