import { MdAddCircle } from "react-icons/md";
import { MyButton } from "./MyButton";

export function DadosResponsavel(){
	return(
		<>
			<div className="flex flex-col space-y-3">
						<h1 className="font-bold">Responsavél</h1>
						<div>
							<h2 className="font-bold">Informações do Responsavél</h2>
							<p className="text-sm">Por favor, informe: </p>
							<label>ID do Funcionário Responsavél: 
								<select className="input">
									<option>Funcionário 1</option>
									<option>Funcionário 2</option>
									<option>Funcionário 3</option>
								</select>
							</label>
							<label>Setor do Responsavél: 
								<input type="text" className="input"/>
							</label>
						</div>
						<div>
							<button className="text-lg text-button hover:text-button-hover">
								<MdAddCircle className="inline"/> Adicionar mais Responsavéis
							</button>
						</div>
					</div>
		</>
	)
};