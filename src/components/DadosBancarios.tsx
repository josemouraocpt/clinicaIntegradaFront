import { MdAddCircle } from "react-icons/md";
import { MyButton } from "./MyButton";

export function DadosBancarios(){
	return (
		<>
			<div className="flex flex-col space-y-3">
						<h1 className="font-bold">Dados Bancários</h1>
						<div className="space-x-3">
						<h3>Possui conta bancária?</h3>
							<label>Sim
								<input type="radio" name="possui_banco" className="ml-2"/>
							</label>
							<label>Não
								<input type="radio" name="possui_banco" className="ml-2"/>
							</label>
						</div>
						<div className="flex space-x-5">
							<label className="w-2/6">Nome do banco:
								<input type="text" className="input block"/>
							</label>
							<label className="w-2/6">Agência:
								<input type="text" className="input block"/>
							</label>
							<label>Conta:
								<input type="text" className="input block"/>
							</label>
						</div>
						<div>
							<button className="text-lg text-button hover:text-button-hover" >
								<MdAddCircle className="inline"/> Adicionar mais contas
							</button>
							<div className="flex flex-col space-y-3">
								{/* {maisContas && (
									<div className="flex space-x-5">
										<label className="w-2/6">Nome do banco:
											<input type="text" className="input block"/>
										</label>
										<label className="w-2/6">Agência:
											<input type="text" className="input block"/>
										</label>
										<label>Conta:
											<input type="text" className="input block"/>
										</label>
									</div>
								)} */}
							</div>
						</div>
						<div>
							<h1 className="font-bold">Situação Financeira</h1>
							<button className="text-lg text-button hover:text-button-hover" >
								<MdAddCircle className="inline"/> Adicionar informações
							</button>
							{/* {maisInfo && (
								<textarea placeholder="Descrição" className="input block w-full resize-none" rows={10}/>
							)} */}
						</div>
					</div>
		</>
	)
};