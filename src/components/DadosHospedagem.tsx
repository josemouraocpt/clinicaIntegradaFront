import { MdAddCircle } from "react-icons/md";
import { MyButton } from "./MyButton";

export function DadosHospedagem(){
	return(
		<>
			<div className="flex flex-col space-y-3">
						<h1 className="font-bold">Hospedagem</h1>
						<div>
							<h2 className="font-bold">Informações do quarto</h2>
							<p className="text-sm">Por favor, selecione um quarto disponível:</p>
							<label>Número do Quarto: 
								<select className="input">
									<option>Quarto 1</option>
									<option>Quarto 2</option>
									<option>Quarto 3</option>
								</select>
							</label>
						</div>

						<div>
							<h2 className="font-bold">Informações do leito</h2>
							<p className="text-sm">Por favor, selecione um leito disponível:</p>
							<label>Número do Leito: 
								<select className="input">
									<option>Leito 1</option>
									<option>Leito 2</option>
									<option>Leito 3</option>
								</select>
							</label>
						</div>

						<div>
							<h2 className="font-bold">Informações adicionais</h2>
							<p className="text-sm">Deseja adicionar informações sobre o hospede? </p>
							<button className="text-lg text-button hover:text-button-hover">
								<MdAddCircle className="inline"/> Adicionar mais informações
							</button>
							<label>
								<textarea className="input resize-none" rows={5}>
									</textarea>
								</label>
						</div>
					</div>
		</>
	)
};