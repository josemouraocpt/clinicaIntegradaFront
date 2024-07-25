'use client'

import { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import userService from "@/services/userService";

const schema = yup.object({
	nome: yup.string().required("Insira o mome"),
	nomeSocial: yup.string(),
	apelido: yup.string(),
	rg: yup.string().required("Insira o RG") ,
	cpf: yup.string().required("Insira o CPF") ,
	nacionalidade: yup.string().required("Insira a nacionalidade") ,
	naturalidade: yup.string().required("Insira a naturalidade") ,
	estadoCivil: yup.string().required("Insira o estado civil") ,
	dataNascimento: yup.string().required("Insira o campo") ,
	nomeMae: yup.string().required("Insira o campo") ,
	nomePai: yup.string().required("Insira o campo") ,
	telefone: yup.string().required("Insira o campo") ,
	profissao: yup.string().required("Insira o campo") ,
	tituloEleitor: yup.string().required("Insira o campo") ,
	endereco: yup.string().required("Insira o campo") ,
	cidade: yup.string().required("Insira o campo") ,
	uf: yup.string().required("Insira o campo") ,
	cep: yup.string().required("Insira o campo") ,
	dataEntrada: yup.string().required("Insira o campo") ,
	nomeBanco: yup.string(),
	conta: yup.string(),
	agencia: yup.string(),
	numeroConta: yup.string(),
	situacaoFinanceiraDesc: yup.string().required("Insira o campo"),
	grauDependencia: yup.string().required("Insira o campo"),
	nomeRemedio: yup.string().required("Insira o campo"),
	frequenciaUso: yup.string().required("Insira o campo"),
	tempoUso: yup.string().required("Insira o campo"),
	dosagem: yup.string().required("Insira o campo"),
	tipoAlergiaDieta: yup.string().required("Insira o campo"),
	descAlergiaDieta: yup.string().required("Insira o campo"),
	quarto: yup.string().required("Insira o campo"),
	leito: yup.string().required("Insira o campo"),
	hospedagemInfo: yup.string(),
	responsavel: yup.string().required("Insira o campo"),
	setorResponsavel: yup.string(),
	responsavelAceite: yup.string().required("Insira o campo"),
});

type FormData = yup.InferType<typeof schema>;

export function HospedeForm(){
	const [currentStep, setCurrentStep] = useState(0);
	const [possuiConta, setPossuiConta] = useState<boolean | undefined>(undefined);
	const [sitFin, setSitFin] = useState(false);
	const [usersAndDepartments, setUsersAndDepartments] = useState();
	const router = useRouter();
	const { user } = useSelector((state) => state.auth);
	const { getUsersAndDepartments } = userService;

	const { register, handleSubmit, formState: { errors }, getValues, setValue, watch } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	const watcher = watch("responsavel");

	function findSetor(num: string): string{
		//DEU RUIM NA HORA DE VOLTAR VERIFICAR
		const desc = usersAndDepartments.filter((valor) => { return valor.idUSUARIO == num });
		return desc[0].descricao || "";
	}

	const handleNext = () => {
		setCurrentStep(state => state + 1)
	};

	const handlePrevius = () => {
		setCurrentStep(state => state - 1)
	};

	useEffect(() => {
		async function fetch(){
			const data = await getUsersAndDepartments(user.token);
			return setUsersAndDepartments(data.data)
		}
		fetch()
	}, [user, getUsersAndDepartments])

	async function onSubmit(data: FormData){
		console.log("chegou até o final");
		console.log(data)


	};

	return(
		<div className="bg-white p-5 rounded-md mb-20 shadow-lg">
			<form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
				{/* Inicio da primeira parte do formulário */}
				{currentStep == 0 && (
					<div>
						<h1 className="font-bold">Dados Básicos</h1>
						<div className="flex flex-col space-y-3">
							<div className="flex space-x-5">
								<label className="w-1/4">Nome completo:
									<input type="text" className="input" {...register("nome")}/>
								</label>
								<label>Apelido:
									<input type="text" className="input" {...register("apelido")}/>
								</label>
								<label>Nome Social (se tiver):
									<input type="text" className="input" {...register("nomeSocial")}/>
								</label>
								<label>Nacionalidade:
									<input type="text" className="input" {...register("nacionalidade")}/>
								</label>
								<label>Naturalidade:
									<input type="text" className="input" {...register("naturalidade")}/>
								</label>
							</div>
							<div className="flex space-x-5">
								<label className="w-1/4">Nome do Pai:
									<input type="text" className="input" {...register("nomePai")}/>
								</label>
								<label className="w-1/4">Nome da Mãe:
									<input type="text" className="input" {...register("nomeMae")}/>
								</label>
								<label>CPF:
									<input type="text" className="input" {...register("cpf")}/>
								</label>
								<label>RG:
									<input type="text" className="input" {...register("rg")}/>
								</label>
							</div>

							<div className="flex space-x-5">
								<label>Data de Nascimento:
									<input type="date" className="input" {...register("dataNascimento")}/>
								</label>
								<label>Telefone:
									<input type="text" className="input" {...register("telefone")}/>
								</label>
								<label>Estado civil:
									<select className="input" {...register("estadoCivil")}>
										<option hidden={true}></option>
										<option value="Solteiro(a)">Solteiro(a)</option>
										<option value="Casado(a)">Casado(a)</option>
										<option value="Divorciado(a)">Divorciado(a)</option>
										<option value="Viúvo(a)">Viúvo(a)</option>
										<option value="Separado(a)">Separado(a)</option>
									</select>
								</label>
								<label>Profissão:
									<input type="text" className="input" {...register("profissao")}/>
								</label>
								<label>Título de Eleitor:
									<input type="text" className="input" {...register("tituloEleitor")}/>
								</label>
							</div>
						</div>
						<div className="flex mt-4">
							<div className="flex flex-col space-y-3">
								<div className="flex flex-col space-y-3">
									<h1 className="font-bold">Endereços</h1>
									<div className="flex space-x-5">
										<label>CEP:
											<input type="text" className="input" {...register("cep")}/>
										</label>
										<label className="w-3/4">Endereço:
											<input type="text" className="input" {...register("endereco")}/>
										</label>
										<label>Estado:
											<select className="input" {...register("uf")}>
												<option hidden={true}></option>
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
										<label>Cidade:
											<input type="text" className="input" {...register("cidade")}/>
										</label>
									</div>
								</div>
								<h1 className="font-bold">Data Entrada</h1>
								<div className="flex space-x-5">
									<label>Data:
										<input type="date" className="input" {...register("dataEntrada")}/>
									</label>
								</div>
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
								<input type="radio" name="possui_banco" className="ml-2" onChange={() => setPossuiConta(true)}/>
							</label>
							<label>Não
								<input type="radio" name="possui_banco" className="ml-2" onChange={() => setPossuiConta(false)}/>
							</label>
						</div>
						{possuiConta && (
							<>
								<div className="flex space-x-5">
									<label className="w-2/6">Nome do banco:
										<input type="text" className="input" {...register("nomeBanco")}/>
									</label>
									<label className="w-2/6">Agência:
										<input type="text" className="input" {...register("agencia")}/>
									</label>
									<label>Conta:
										<input type="text" className="input" {...register("conta")}/>
									</label>
								</div>
								{/* <div>
									<button className="text-lg text-button hover:text-button-hover" >
										<MdAddCircle className="inline"/> Adicionar mais contas
									</button>
									<div className="flex flex-col space-y-3">
										{maisContas && (
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
										)}
									</div>
								</div> */}
							</>
						)}
						<div>
							<h1 className="font-bold">Situação Financeira</h1>
							<button className="text-lg text-button hover:text-button-hover" onClick={() => setSitFin(!sitFin)} hidden={sitFin == true || possuiConta == false}>
								<MdAddCircle className="inline"/> Adicionar informações
							</button>
							{possuiConta === false || sitFin == true ? (
								<textarea placeholder="Descrição" className="input w-full resize-none" rows={10} {...register("situacaoFinanceiraDesc")}/>
							):(<></>)}
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
				{/* Fim da segunda parte do formulário */}

				{/* Inicio da terceira parte do formulário */}
				{currentStep == 2 && (
					<div>
						<div className="flex flex-col space-y-3">
							<h1 className="font-bold">Dados Médicos</h1>
							<div>
								<h2 className="font-bold">Grau de dependência</h2>
								<p className="text-sm">Sobre o grau de dependência do hospede, por favor, informe: </p>
								<div className="space-x-3">
									<select className="input" {...register("grauDependencia")}>
										<option hidden={true}></option>
										<option value="1">1 - Pouco dependente</option>
										<option value="2">2 - Dependente</option>
										<option value="3">3 - Muito dependente</option>
									</select>
								</div>
								<small className="text-sm opacity-50">** 1 (Pouco dependente), 2 (Dependente), 3 (Muito dependente)</small>
							</div>
							<div>
								<h2 className="font-bold">Histórico de Medicamentos</h2>
								<p>Informe os medicamentos que o hospede já utiliza:</p>
								<div className="flex space-x-3">
									<label>Nome do Medicamento:
										<input type="text" className="input" {...register("nomeRemedio")}/>
									</label>
									<label>Frequência do Medicamento:
										<input type="text" className="input" {...register("frequenciaUso")}/>
									</label>
									<label>Tempo de Uso:
										<input type="text" className="input" {...register("tempoUso")}/>
									</label>
									<label>Dosagem:
										<input type="text" className="input" {...register("dosagem")}/>
									</label>
								</div>
								{/* <button className="text-lg text-button hover:text-button-hover">
									<MdAddCircle className="inline"/> Adicionar mais medicamentos
								</button> */}
							</div>
							<div>
								<h2 className="font-bold">Doenças, Alergias e Dietas</h2>
								<p>Informe as doenças e complicações do hospede</p>
								<div className="flex flex-col">
									<label className="w-2/5">Tipo:
										<select className="input" {...register("tipoAlergiaDieta")}>
											<option hidden={true}></option>
											<option value="alergia">Alergia</option>
											<option value="doenca">Doença</option>
											<option value="dieta">Dieta</option>
										</select>
									</label>
									<label className="w-2/5">Descrição:
										<input type="text" className="input" {...register("descAlergiaDieta")}/>
									</label>
								</div>
								{/* <button className="text-lg text-button hover:text-button-hover">
									<MdAddCircle className="inline"/> Adicionar mais informações
								</button> */}
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
									<input type="text" className="input" {...register("quarto")}/>
								</label>
							</div>
							<div>
								<h2 className="font-bold">Informações do leito</h2>
								<p className="text-sm">Por favor, selecione um leito disponível:</p>
								<label>Número do Leito: 
									<input type="text" className="input" {...register("leito")}/>
								</label>
							</div>
							<div>
								<h2 className="font-bold">Informações adicionais</h2>
								<p className="text-sm">Deseja adicionar informações sobre o hospede? </p>
								<label>
									<textarea className="input resize-none" rows={5} {...register("hospedagemInfo")}>
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
									<select className="input" {...register("responsavel")}>
										<option hidden={true}></option>
										{usersAndDepartments && (
											usersAndDepartments.map((value) => (
												<option value={value.idUSUARIO} key={value.idUSUARIO} >{value.nome}</option>
											))
										)}
									</select>
								</label>
								<label>Setor do Responsavél:
									{watcher !== undefined ? (
										<>
											{setValue("setorResponsavel", findSetor(watcher))}
											<input type="text" className="input" {...register("setorResponsavel")} disabled={true}/>
										</>
									) : (
										<input type="text" className="input" {...register("setorResponsavel")} disabled={true}/>
									)}
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
				{/* Fim da quinta parte do formulário */}

				{/* Inicio da sexta parte do formulário */}
				{currentStep == 5 && (
					<div>
						<div className="flex flex-col space-y-3">
							<h1 className="font-bold">Termos de Aceite</h1>
							<p>Por favor, informe o responsavél do cadastro</p>
							<label>ID do Funcionário Responsavél: 
								<select className="input" {...register("responsavelAceite")}>
									<option hidden={true}></option>
									{usersAndDepartments && (
											usersAndDepartments.map((value) => (
												<option value={value.idUSUARIO} key={value.idUSUARIO} >{value.nome}</option>
											))
										)}
								</select>
							</label>
							<div className="border-2 border-black p-3">
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem dolore sequi alias, reprehenderit in, culpa aut sunt eos officia explicabo eum impedit atque maxime nobis aspernatur ea quia deleniti neque!</p>
							</div>
							<div className="flex justify-end space-x-3">
								<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" onClick={handlePrevius}>
									Voltar
								</button>
								<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="submit">
									Finalizar
								</button>
							</div>
						</div>
					</div>
				)}
				{/* Fim da sexta parte do formulário */}
			</form>
		</div>
	)
};