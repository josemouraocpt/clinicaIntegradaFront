import { MyButton } from "./MyButton";
import { MdMode } from "react-icons/md";
import profile from "../assets/img/profile.png";
import Image from "next/image";

export function HospedeForm(){
	return(
		<div className="bg-white p-5 rounded-md shadow-lg">
			<form className="flex flex-col space-y-3">
				<div>
					{/* Início da Primeira Página */}
					<h1 className="font-bold">Dados Básicos</h1>
					<div className="flex flex-col space-y-3">
						<div className="flex space-x-5">
							<label className="w-1/4">Primeiro nome:
								<input type="text" className="input block"/>
							</label>
							<label className="w-1/4">Sobrenome:
								<input type="text" className="input block"/>
							</label>
							<label>Nome Social (se tiver):
								<input type="text" className="input block"/>
							</label>
							<label>Nacionalidade:
								<input type="text" className="input block"/>
							</label>
						</div>
						<div className="flex space-x-5">
							<label className="w-1/4">Nome do Pai:
								<input type="text" className="input block"/>
							</label>
							<label className="w-1/4">Nome da Mãe:
								<input type="text" className="input block"/>
							</label>
							<label>CPF:
								<input type="text" className="input block"/>
							</label>
							<label>RG:
								<input type="text" className="input block"/>
							</label>
						</div>
					
						<div className="flex space-x-5">
							<label>Nascimento:
								<input type="text" className="input block"/>
							</label>
							<label>Telefone:
								<input type="text" className="input block"/>
							</label>
							<label>Estado civil:
								<input type="text" className="input block"/>
							</label>
							<label>Profissão:
								<input type="text" className="input block"/>
							</label>
							<label>Título de Eleitor:
								<input type="text" className="input block"/>
							</label>
						</div>
					</div>
					<div className="flex">
						<div className="flex flex-col space-y-3">
							<div className="flex flex-col space-y-3">
								<h1 className="font-bold">Endereços</h1>
								<div className="flex space-x-5">
									<label>CEP:
										<input type="text" className="input block"/>
									</label>
									<label>Bairro:
										<input type="text" className="input block"/>
									</label>
									<label>Estado:
										<input type="text" className="input block"/>
									</label>
								</div>
								<div className="flex space-x-5">
									<label className="w-3/4">Endereço:
										<input type="text" className="input block"/>
									</label>
									<label>Nº:
										<input type="text" className="input block"/>
									</label>
								</div>
							</div>
							<h1 className="font-bold">Data Entrada</h1>
							<div className="flex space-x-5">
								<label>Data:
									<input type="text" className="input block"/>
								</label>
								<label>Horário:
									<input type="text" className="input block"/>
								</label>
							</div>
						</div>
						<div className="flex flex-col items-end w-2/6">
							<h1 className="font-bold mr-6">Foto de Identificação</h1>
								<div className="w-52 h-40">
									<Image src={profile} alt="teste" className="w-full"/>
								</div>
							<label>
								<MdMode size={40} className="bg-button text-white p-2 rounded-full ml-60 cursor-pointer"/>
								<input type="file" className="invisible"/>
							</label>
						</div>
					</div>
					<div className="flex justify-end">
						<MyButton buttonText="Próximo"/>
					</div>
				</div>
				{/* Fim da Primeira Página */}

			</form>
		</div>
	)
};