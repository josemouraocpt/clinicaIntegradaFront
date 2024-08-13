'use client';
import { AtendimentosList } from "@/components/AtendimentosList";
import { ContainerAtendimento } from "@/components/ContainerAtendimento";
import { MyButton } from "@/components/MyButton";
import { SetorInfo } from "@/components/SetorInfo";
import { useState } from "react";

export default function EditarAtendimento(){
    const [canEdit, setCanEdit] = useState(false)
    function formatDate(data: string){
		return new Date(data).toLocaleDateString("pt-BR")
	}

	function getAge(dateString: string) {
		var today = new Date();
		var birthDate = new Date(dateString);
		var age = today.getFullYear() - birthDate.getFullYear();
		var m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	}

    return(
        <div className="min-h-screen">
            <ContainerAtendimento/>
            <SetorInfo setor="Atendimentos"/>
            <div className="m-10 bg-white p-8 rounded-lg shadow-xl space-y-4">
                <div className="flex space-x-5">
                    <div className="flex flex-col">
                        <h3 className="font-bold">ID<span className="text-button"> NOME</span></h3>
                        <ul className="columns-2 gap-x-4">
                            <li>Dia de entrada: </li>
                            <li>Idade: anos</li>
                            <li>Nível de dependencia: </li>
                            <li>Leito: </li>
                            <li>Nº Quarto: </li>
                            <li>Responsavel: </li>
                        </ul>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <label>Data:
                        <input type="text" className="input" />
                    </label>
                    <div className="flex space-x-2">
                        <MyButton buttonText="Pesquisar"/>
                        <MyButton buttonText="Editar" handleClick={() => { setCanEdit(!canEdit) }}/>
                        
                    </div>
                </div>
                <div>
                    <div className="flex space-x-2 mt-4 mb-1 w-full">
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Data do atendimento
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Aréa da saúde
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Médico
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Motivo
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Procedimento realizado
                        </h2>
                        <h2 className="font-bold text-center p-1 bg-gray-400 w-1/5 text-white">
                            Recomendações
                        </h2>
                    </div>
                    <form>
                        <AtendimentosList canEdit={canEdit}/>
                        {canEdit && (
                            <div className="flex justify-end m-2">
                                <MyButton buttonText="Salvar" buttonType="submit"/>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}