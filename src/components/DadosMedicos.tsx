import { MdAddCircle } from "react-icons/md";
import { MyButton } from "./MyButton";

export function DadosMedicos(){
	return(
		<>
			<div className="flex flex-col space-y-3">
						<h1 className="font-bold">Dados Médicos</h1>
						<div>
							<h2 className="font-bold">Grau de dependência</h2>
							<p className="text-sm">Sobre o grau de dependência do hospede, por favor, informe: </p>
							<div className="space-x-3">
								<label>1
									<input type="radio" name="dependencia" className="ml-2"/>
								</label>
								<label>2
									<input type="radio" name="dependencia" className="ml-2"/>
								</label>
								<label>3
									<input type="radio" name="dependencia" className="ml-2"/>
								</label>
							</div>
							<small className="text-sm opacity-50">** 1 (Pouco dependente), 2 (Dependente), 3 (Muito dependente)</small>
						</div>
						<div>
							<h2 className="font-bold">Histórico de Medicamentos</h2>
							<p>Informe os medicamentos que o hospede já utiliza:</p>
							<button className="text-lg text-button hover:text-button-hover">
								<MdAddCircle className="inline"/> Adicionar mais medicamentos
							</button>
							<div className="flex space-x-3">
								<label>Nome do Medicamento:
									<input type="text" className="input block" />
								</label>
								<label>Frequência do Medicamento:
									<input type="text" className="input block" />
								</label>
								<label>Tempo de Uso:
									<input type="text" className="input block" />
								</label>
								<label>Dosagem:
									<input type="text" className="input block" />
								</label>
							</div>
						</div>
						<div>
							<h2 className="font-bold">Doenças, Alergias e Dietas</h2>
							<p>Informe as doenças e complicações do hospede</p>
							<button className="text-lg text-button hover:text-button-hover">
								<MdAddCircle className="inline"/> Adicionar mais informações
							</button>
							<div className="flex flex-col">
								<label className="w-2/5">Informação:
									<input type="text" className="input block" />
								</label>
							</div>
						</div>
					</div>
		</>
	)
};