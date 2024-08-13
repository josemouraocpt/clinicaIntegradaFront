'use client';
import { ContainerAtividades } from "@/components/ContainerAtividades";
import { LancarPresencaList } from "@/components/LancarPresencaList";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import { useState } from "react";

export default function LancarPresencaId(){
    const [count, setCount] = useState(0);
    const [hospedes, setHospedes] = useState([0])
    function handleClick(){
        setCount(count+1)
        const newState = [...hospedes, count]
        setHospedes(newState)
    }
    return(
        <div className="min-h-screen">
            <ContainerAtividades/>
            <SetorInfo setor="Atividades"/>
            <div className="bg-white p-8 rounded-lg shadow-xl space-y-5 m-10 flex flex-row space-x-5">
                <div className="w-1/3 flex flex-col space-y-6">
                    <label className="text-button text-sm">Atividade:
                        <h2 className="text-xl border border-button rounded-lg shadow-md p-1">Tipo da atividade</h2>
                    </label>
                    <label className="text-button text-sm">Data:
                        <h2 className="text-xl border border-button rounded-lg shadow-md p-1">Data da atividade</h2>
                    </label>
                    <label className="text-button text-sm">Professor responsável:
                        <h2 className="text-xl border border-button rounded-lg shadow-md p-1">Nome do professor</h2>
                    </label>
                    <label className="text-button text-sm">Horário de início:
                        <h2 className="text-xl border border-button rounded-lg shadow-md p-1">hora 1</h2>
                    </label>
                    <label className="text-button text-sm">Horário de término:
                        <h2 className="text-xl border border-button rounded-lg shadow-md p-1">hora 2</h2>
                    </label>
                    <label className="text-button text-sm">Observações:
                        <p className="text-xl border border-button rounded-lg shadow-md p-1">observações</p>
                    </label>
                </div>
                <div className="w-2/3">
                    <h2 className="text-button font-bold text-xl">Presença</h2>
                    <div className="flex space-x-2 mt-4 mb-1 w-full">
                        <h2 className="text-white font-bold bg-button w-4/12 p-1 text-center">Nome do hóspede</h2>
                        <h2 className="text-white font-bold bg-button w-4/12 p-1 text-center">Matrícula do hóspede</h2>
                        <h2 className="text-white font-bold bg-button w-4/12 p-1 text-center">Observações</h2>
                    </div>
                    <form>
                        {hospedes.map((valor, index) => (
                            <LancarPresencaList key={index}/>
                        ))}
                        <div className="flex justify-end space-x-2">
                            <MyButton buttonText="Inserir" buttonType="button" handleClick={handleClick}/>
                            <MyButton buttonText="Salvar" buttonType="submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}