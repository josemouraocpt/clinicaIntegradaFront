import Link from "next/link";

export default function Register(){
	return(
		<div className="flex justify-center mb-20 px-5">
			<div className="bg-white p-10 mt-14 rounded-lg shadow-md">
				<h1 className="font-bold text-xl">Cadastro do usuário</h1>
				<div className="mt-5">
					<form>
						<div className="flex flex-col space-y-3">
							{/* dados de cadastro */}
							<div className="flex flex-col space-y-2">
								<h2 className="font-bold">Dados do usuário</h2>
								<div className="flex flex-row space-x-5">
									<label>Nome:
										<input type="text" className="input"/>
									</label>
									<label>E-mail:
										<input type="email" className="input"/>
									</label>
									<label>Senha:
										<input type="password" className="input"/>
									</label>
									<label>Confirmação de senha:
										<input type="password" className="input"/>
									</label>
									<label>Tipo do usuário:
										<select className="input">
											<option value=""></option>
											<option value="funcionario">Funcionário</option>
											<option value="usuario">Usuário</option>
										</select>
									</label>
								</div>
								<div className="flex flex-row space-x-5">
									<label>Setor:
										<select className="input">
											<option value=""></option>
											<option value="farmacia">Farmácia</option>
										</select>
									</label>
									<label>Descrição:
										<input type="text" className="input"/>
									</label>
								</div>
							</div>
							{/* telefone e contatos */}
							<div className="flex flex-row space-x-5">
							<div>
								<h2 className="font-bold">Dados de contato</h2>
								<div className="flex flex-row space-x-5">
									<label>DDD:
										<input type="text" className="input"/>
									</label>
									<label>Número:
										<input type="text" className="input"/>
									</label>
								</div>
							</div>
							<div>
								<h2 className="font-bold">Possui contatos?</h2>
								<div className="flex flex-row space-x-5">
									<label>Tipo:
										<input type="text" className="input"/>
									</label>
									<label>Observação:
										<input type="text" className="input"/>
									</label>
								</div>
							</div>
							</div>
							{/* dados pessoais */}
							<div>
							<h2 className="font-bold">Dados pessoais</h2>
								<div className="flex flex-row space-x-5">
									<label>CPF:
										<input type="text" className="input"/>
									</label>
									<label>RG:
										<input type="text" className="input"/>
									</label>
									<label>Data de Nascimento:
										<input type="text" className="input"/>
									</label>
									<label>Apelido:
										<input type="text" className="input"/>
									</label>
									<label>Nome social (se tiver):
										<input type="text" className="input"/>
									</label>
									<label>Sexo:
										<select className="input">
											<option value=""></option>
											<option value="masculino">Masculino</option>
											<option value="feminino">Feminino</option>
											<option value="">Prefiro não informar</option>
										</select>
									</label>
								</div>
							</div>
							{/* endereço */}
							<div>
							<h2 className="font-bold">Dados de endereço</h2>
								<div className="flex flex-col space-y-2">
									<div className="flex flex-row space-x-5">
										<label>CEP:
											<input type="text" className="input"/>
										</label>
										<label>Endereço:
											<input type="text" className="input"/>
										</label>
										<label>Número:
											<input type="text" className="input"/>
										</label>
										<label>Complemento:
											<input type="text" className="input"/>
										</label>
										<label>Bairro:
											<input type="text" className="input"/>
										</label>
									</div>
									<div className="flex flex-row space-x-5">
										<label>Cidade:
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
								</div>
								<div className="flex justify-end space-x-3">
									<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover">
										Finalizar
									</button>
								</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
};
