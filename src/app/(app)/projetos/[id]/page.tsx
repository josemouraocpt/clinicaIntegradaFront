import { ContainerProjeto } from "@/components/ContainerProjeto"
import { SetorInfo } from "@/components/SetorInfo"

export default function DetalhesProjeto(){
    return(
        <div className="min-h-screen">
            <ContainerProjeto/>
            <SetorInfo setor="Projetos"/>
            <div className="bg-white p-5 rounded-md mb-20 shadow-lg m-10">
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label>Nome do projeto:
                            <p className="input">NOME DO PROJETO</p>
                        </label>
                        <label>Data do projeto:
                            <p className="input">DATA DO PROJETO</p>
                        </label>
                        <label>Escopo do projeto:
                            <p className="input">ESCOPO</p>
                        </label>
                        <label>Atividade:
                            <p className="input">ATIVIDADE</p>
                        </label>
                    </div>
                    <div>
                        <label>Restrições:
                            <p className="input">RESTRIÇÕES</p>
                        </label>
                        <label>Custo do projeto:
                            <p className="input">R$ CUSTO</p>
                        </label>
                        <label>ID do responsável:
                            <p className="input">ID RESPONSAVEL</p>
                        </label>
                        <label>Tipo do projeto:
                            <p className="input">TIPO PROJETO</p>
                        </label>
                    </div>
                    <div>
                        <h2>Lista de participantes</h2>
                        <div className="my-5">
                            <label>ID do hóspede:
                                <p className="input">ID PROJETOS</p>
                            </label>
                            <label>Nome do hóspede:
                                <p className="input">NOME HOSPEDE</p>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}