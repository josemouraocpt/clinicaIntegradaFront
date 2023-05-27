'use client'

import { useState } from "react";
import { MdAddCircle, MdMode } from "react-icons/md";
import Image from "next/image";
import profile from "../assets/img/profile.png";


export function HospedeForm(){
	const [currentStep, setCurrentStep] = useState(0);

	const handleNext = () => {
		setCurrentStep(state => state + 1)
	};

	const handlePrevius = () => {
		setCurrentStep(state => state - 1)
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		console.log("chegou até o final");
	};

	return(
		<div className="bg-white p-5 rounded-md mb-20 shadow-lg">
			<form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
				{/* Inicio da primeira parte do formulário */}
				{currentStep == 0 && (
					<div>
						<h1 className="font-bold">Dados Básicos</h1>
						<div className="flex flex-col space-y-3">
							<div className="flex space-x-5">
								<label className="w-1/4">Primeiro nome:
									<input type="text" className="input"/>
								</label>
								<label className="w-1/4">Sobrenome:
									<input type="text" className="input"/>
								</label>
								<label>Apelido:
									<input type="text" className="input"/>
								</label>
								<label>Nome Social (se tiver):
									<input type="text" className="input"/>
								</label>
								<label>Nacionalidade:
									<input type="text" className="input"/>
								</label>
							</div>
							<div className="flex space-x-5">
								<label className="w-1/4">Nome do Pai:
									<input type="text" className="input"/>
								</label>
								<label className="w-1/4">Nome da Mãe:
									<input type="text" className="input"/>
								</label>
								<label>CPF:
									<input type="text" className="input"/>
								</label>
								<label>RG:
									<input type="text" className="input"/>
								</label>
							</div>

							<div className="flex space-x-5">
								<label>Nascimento:
									<input type="text" className="input"/>
								</label>
								<label>DDD:
									<input type="text" className="input"/>
								</label>
								<label>Telefone:
									<input type="text" className="input"/>
								</label>
								<label>Estado civil:
									<input type="text" className="input"/>
								</label>
								<label>Profissão:
									<input type="text" className="input"/>
								</label>
								<label>Título de Eleitor:
									<input type="text" className="input"/>
								</label>
							</div>
						</div>
						<div className="flex mt-4">
							<div className="flex flex-col space-y-3">
								<div className="flex flex-col space-y-3">
									<h1 className="font-bold">Endereços</h1>
									<div className="flex space-x-5">
										<label>CEP:
											<input type="text" className="input"/>
										</label>
										<label className="w-3/4">Endereço:
											<input type="text" className="input"/>
										</label>
										<label>Nº:
											<input type="text" className="input"/>
										</label>
										<label>Complemento:
											<input type="text" className="input"/>
										</label>
									</div>
									<div className="flex space-x-5">
										<label>Bairro:
											<input type="text" className="input"/>
										</label>
										<label>Estado:
											<select className="input">
												<option value=""></option>
												<option value="AC">Acre</option>																	
												<option value="AL">Alagoas</option>
												<option value="AP">Amapá</option>
												<option value="AM">Amazonas</option>
												<option value="BA">Bahia</option>
												<option value="CE">Ceará</option>
												<option value="DF">Distrito Federal</option>
												<option value="ES">Espírito Santo</option>
												<option value="GO">Goiás</option>
												<option value="MA">Maranhão</option>
												<option value="MT">Mato Grosso</option>
												<option value="MS">Mato Grosso do Sul</option>
												<option value="MG">Minas Gerais</option>
												<option value="PA">Pará</option>
												<option value="PB">Paraíba</option>
												<option value="PR">Paraná</option>
												<option value="PE">Pernambuco</option>
												<option value="PI">Piauí</option>
												<option value="RJ">Rio de Janeiro</option>
												<option value="RN">Rio Grande do Norte</option>
												<option value="RS">Rio Grande do Sul</option>
												<option value="RO">Rondônia</option>
												<option value="RR">Roraima</option>
												<option value="SC">Santa Catarina</option>
												<option value="SP">São Paulo</option>
												<option value="SE">Sergipe</option>
												<option value="TO">Tocantins</option>
											</select>
										</label>
										<label>País:
											<input type="text" className="input"/>
										</label>
									</div>
								</div>
								<h1 className="font-bold">Data Entrada</h1>
								<div className="flex space-x-5">
									<label>Origem:
										<select className="input">
											<option value=""></option>
											<option value="indicação">Indicação</option>
											<option value="convênio">Convênio</option>
											<option value="espontâneo">Espontâneo</option>
										</select>
									</label>
									<label>Data:
										<input type="text" className="input"/>
									</label>
									<label>Horário:
										<input type="text" className="input"/>
									</label>
								</div>
								<h1 className="font-bold">Possui contatos?</h1>
								<div className="flex space-x-5">
									<label>Tipo:
										<input type="text" className="input"/>
									</label>
									<label>Observação:
										<input type="text" className="input"/>
									</label>
									<label>Contato:
										<input type="text" className="input"/>
									</label>
								</div>
							</div>
							<div className="flex flex-col items-end w-2/6 mt-14 mr-16">
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
						<div className="flex justify-end space-x-3">
							<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handleNext}>
								Próximo
							</button>
						</div>
					</div>
				)}
				{/* Fim da primeira parte do formulário */}

				{/* Inicio da segunda parte do formulário */}
				{currentStep == 1 && (
					<div>
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
								<input type="text" className="input"/>
							</label>
							<label className="w-2/6">Agência:
								<input type="text" className="input"/>
							</label>
							<label>Conta:
								<input type="text" className="input"/>
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
											<input type="text" className="input"/>
										</label>
										<label className="w-2/6">Agência:
											<input type="text" className="input"/>
										</label>
										<label>Conta:
											<input type="text" className="input"/>
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
								<textarea placeholder="Descrição" className="input w-full resize-none" rows={10}/>
							)} */}
						</div>
					</div>
					<div className="flex justify-end space-x-3">
						<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handlePrevius}>
							Voltar
						</button>
						<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handleNext}>
							Próximo
						</button>
					</div>
					</div>
				)}
				{/* Fim da primeira parte do formulário */}

				{/* Inicio da terceira parte do formulário */}
				{currentStep == 2 && (
					<div>
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
									<input type="text" className="input" />
								</label>
								<label>Frequência do Medicamento:
									<input type="text" className="input" />
								</label>
								<label>Tempo de Uso:
									<input type="text" className="input" />
								</label>
								<label>Dosagem:
									<input type="text" className="input" />
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
									<input type="text" className="input" />
								</label>
							</div>
						</div>
						<div className="flex justify-end space-x-3">
							<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handlePrevius}>
								Voltar
							</button>
							<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handleNext}>
								Próximo
							</button>
						</div>
					</div>
					</div>
				)}
				{/* Fim da terceira parte do formulário */}

				{/* Inicio da quarta parte do formulário */}
				{currentStep == 3 && (
					<div>
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
						<div className="flex justify-end space-x-3">
							<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handlePrevius}>
								Voltar
							</button>
							<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handleNext}>
								Próximo
							</button>
						</div>
					</div>
					</div>
				)}
				{/* Fim da quarta parte do formulário */}

				{/* Inicio da quinta parte do formulário */}
				{currentStep == 4 && (
					<div>
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
						<div className="flex justify-end space-x-3">
							<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handlePrevius}>
								Voltar
							</button>
							<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handleNext}>
								Próximo
							</button>
						</div>
					</div>
					</div>
				)}
				{/* Fim da quinta parte do formulário */}

				{/* Inicio da sexta parte do formulário */}
				{currentStep == 5 && (
					<div>
					<div className="flex flex-col space-y-3">
						<h1 className="font-bold">Termos de Aceite</h1>
						<p>Por favor, informe o responsavél do cadastro</p>
						<label>ID do Funcionário Responsavél: 
							<select className="input">
								<option>Funcionário 1</option>
								<option>Funcionário 2</option>
								<option>Funcionário 3</option>
							</select>
						</label>
						<div className="border-2 border-black p-3">
							<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores, quas laborum. Eum ab sequi debitis ea commodi illo non porro architecto magni, placeat dolore nemo officia cumque facilis iusto modi. Eveniet error dignissimos rerum itaque eum libero sapiente aliquid, delectus sint debitis ad sed natus illo voluptate beatae, provident nam laboriosam numquam porro quia asperiores ipsum quisquam consectetur. Laborum, pariatur architecto nobis similique officia ut vel ex odit modi cupiditate blanditiis placeat praesentium, iusto vero voluptatem consectetur, possimus dolor neque reprehenderit in! Eligendi corrupti sequi distinctio nihil illum dolores fugiat, maiores perspiciatis vitae pariatur architecto quo dolore quasi harum unde.</p>
						</div>
						<div className="flex justify-end space-x-3">
							<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handlePrevius}>
								Voltar
							</button>
							<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handleNext}>
								Próximo
							</button>
						</div>
					</div>
					</div>
				)}
				{/* Fim da sexta parte do formulário */}

				{/* Inicio da setima parte do formulário */}
				{currentStep == 6 && (
					<>
					<div>
					<div className="flex flex-col items-center justify-center">
						<h1 className="font-bold">Cadastro Realizado com sucesso!</h1>
						<p>Lista com informações fornecidas</p>
						<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores repudiandae commodi sunt labore, eveniet veritatis hic pariatur quas architecto saepe, laborum repellendus quod voluptate ea, quos fuga iure tempore! Incidunt labore, repellendus, quae nulla dicta dolor neque asperiores similique tempore aliquam magni possimus a expedita minima corrupti, maiores facilis quia architecto molestias? Soluta modi magni quos sit, dolores praesentium accusamus aut quibusdam est a accusantium animi cupiditate. Amet commodi quod natus explicabo quis cupiditate iusto quas excepturi aliquam, nostrum vero quo ad dolor laudantium. Quod perspiciatis cum voluptatem assumenda. Omnis, harum molestias laudantium ipsa voluptatibus tenetur, facilis optio deserunt consequatur, officia itaque quasi ad mollitia adipisci tempore. Totam neque quod eveniet maiores vel similique necessitatibus officia ipsum quisquam magnam molestias voluptates, earum laboriosam? Corporis impedit quisquam eligendi, aperiam aspernatur provident nihil ea non deserunt repellendus sapiente amet, perferendis sequi et laboriosam blanditiis quam perspiciatis ratione accusantium illum. Neque cumque dolorem maiores provident animi aliquam debitis deserunt fugiat facilis corporis! Facere dolor laboriosam accusantium laudantium, veniam unde accusamus sint aliquid harum minus modi ad ratione, nam corrupti odit consectetur id ipsa? Cumque, sint aliquid consectetur doloremque, perspiciatis necessitatibus ea possimus ab beatae fuga quod. Odit error esse optio est culpa unde, possimus illum ea blanditiis, exercitationem amet quod libero nobis eaque, quia explicabo inventore? Cupiditate mollitia perspiciatis quaerat esse veritatis officiis, corrupti, dolores eveniet alias, natus ex incidunt! Qui placeat quas suscipit cumque itaque voluptatum quae molestiae labore possimus ab temporibus iusto ratione consequatur, excepturi dolorem, magnam eius eaque voluptate unde dolore necessitatibus. Cum autem perspiciatis sed aliquam qui non. Inventore beatae distinctio veniam harum fugit fugiat dolorum illum odit. Quod deleniti rem amet numquam fugit. Hic recusandae nobis ad omnis pariatur in, eum exercitationem aspernatur cupiditate suscipit nam officia nihil. Mollitia, recusandae assumenda tenetur quis officia dolore necessitatibus ab placeat.</p>
					</div>
					</div>
					<div className="flex justify-end space-x-3">
						<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handleSubmit}>
							Finalizar
						</button>
					</div>
					</>
				)}
				{/* Fim da setima parte do formulário */}
			</form>
		</div>
	)
};