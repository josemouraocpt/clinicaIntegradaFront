'use client'

import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { DadosBasicos } from "./HospedeFormComponets/DadosBasicos";
import { DadosBancarios } from "./HospedeFormComponets/DadosBancarios";
import { DadosMedicos } from "./HospedeFormComponets/DadosMedicos";
import { DadosHospedagem } from "./HospedeFormComponets/DadosHospedagem";
import hospedeService from "@/services/hospedeService";
import { MyButton } from "./MyButton";
import { requiredString, requiredNumberString, requiredNumber } from "./ErroPreenchimento";
import { toast, Toaster } from "sonner";
import sistemaService from "@/services/sistemaService";

interface IHospedeFormProps{
	action: string
}

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const cepRegex = /^\d{5}-\d{3}$/;
const rgRegex = /^\d{1,2}\.?\d{3}\.?\d{3}-?[\dXx]$/;
const phoneRegex = /^(\+?55\s?)?(\(?\d{2}\)?\s?)?(9\d{4}|\d{4})-?\d{4}$/;
const tituloEleitorRegex = /^\d{12}$/;
const fourDigitRegex = /^\d{4}$/;
const contaRegex = /^\d{1,12}-[\dXx]$/;


const schema = yup.object({
	nome: requiredString('Nome obrigatório'),
	nomeSocial: yup.string(),
	apelido: yup.string(),
	rg: requiredNumberString('RG obrigatório','O RG deve conter apenas números').min(8, 'RG inválido').max(9,'RG inválido'),
	cpf: requiredNumberString('CPF obrigatório').min(11, 'CPF inválido').max(11,'CPF inválido'),
	nacionalidade: requiredString('Nacionalidade obrigatório'),
	naturalidade: requiredString('Naturalidade obrigatório'),
	estadoCivil: requiredString('Estado Civil obrigatório'),
	dataNascimento: requiredString('Data de nascimento obrigatório'),
	nomeMae: requiredString('Nome da mãe obrigatório'),
	nomePai: requiredString('Nome do pai obrigatório'),
	telefone: requiredNumber('Telefone obrigatório','O telefone deve conter apenas números'),
	profissao: requiredString('Profissão obrigatório'),
	tituloEleitor: requiredString('Título de eleitor obrigatório'),
	endereco: requiredString('Endereço obrigatório'),
	cidade: requiredString('Cidade obrigatório'),
	uf: requiredString('Estado obrigatório'),
	cep: requiredNumberString('CEP obrigatório','O CEP deve conter apenas números').min(8, 'CEP inválido').max(8,'CEP inválido'),
	dataEntrada: yup.string(),
	situacaoFinanceiraDesc: requiredString('Situação financeira obrigatório'),
	quarto: requiredString('Número do quarto obrigatório'),
	leito: requiredString('Número do leito obrigatório'),
	hospedagemInfo: yup.string(),
	responsavel: requiredString('Nome do responsável obrigatório'),
	hospedeStatus: yup.string(),
	hospedagemStatus: yup.string(),
	agencia: requiredString('Agência obrigatório'),
	nomeBanco: requiredString('Nome Banco obrigatório'),
	numConta: requiredString('Número da conta obrigatório'),
	grauDependencia: requiredString('Grau de dependência obrigatório'),
	nomeMedicamento: yup.string(),
	freqMedicamento: yup.string(),
	tempoMedicamento: yup.string(),
	dosagemMedicamento: yup.string(),
	observacoeMedicamento:yup.string(),
	tipoComplicacao: yup.string(),
	descComplicacao: yup.string(),
	anexo: yup.mixed(),
	HOSPEDE_idHOSPEDE: yup.number(),
	idDADOS_BANCARIOS: yup.number(),
	REMEDIOS_idREMEDIOS: yup.number(),
	idDADOS_MEDICOS: yup.number(),
	idDOENCAS_ALERGIAS_DIETAS: yup.number(),
	idREMEDIOS: yup.number(),
	idHOSPEDAGEM: yup.number(),
	idSITUACAO_FINANCEIRA: yup.number(),
});

type FormData = yup.InferType<typeof schema>;

export function HospedeForm({action}: IHospedeFormProps){
	const [currentStep, setCurrentStep] = useState(0);
	const router = useRouter();
	const pathname = usePathname();
	const { user } = useSelector((state) => state.auth);
	const { createHospedeFull, getHospedeStatus, editHospedeById, getHospedeById } = hospedeService;
	const [hospedeStatusList, setHospedeStatusList] = useState([]);
	const [hospedagemStatusList, setHospedagemStatusList] = useState([]);
	const [canEdit, setCanEdit] = useState(false);
	const [hospedeData, setHospedeData] = useState();
	const { generateDownloadURL } = sistemaService;

	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	function handleNext(){
		setCurrentStep(state => state + 1);
	};

	function handlePrevius(){
		setCurrentStep(state => state - 1)
	};

	async function getDownloadUrl(key:string){
		try {
			const url = await generateDownloadURL(key);
			const res = await fetch(url);
			const blob = await res.blob();
			const blobUrl = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = blobUrl;
			a.download = key;
			a.click();
			a.remove();
			window.URL.revokeObjectURL(blobUrl); // Clean up the URL object
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	}




	async function onSubmit(data: FormData){
		if(action == "CRIAR"){
			const res = await createHospedeFull(data, user.token);
			if(res.type == "SUCCESS"){
				toast.success("Ação realizada com sucesso!");{}
				router.push("/dashboard")
			} else {
				toast.error("Algo não está certo.Tente novamente!");
				return;
			}
		}else{
			const res = await editHospedeById(Number(pathname.substring(10)),data, user.token);
			if(res.type == "SUCCESS"){
				toast.success("Ação realizada com sucesso!");{}
				router.push("/dashboard")
			} else {
				toast.error("Algo não está certo.Tente novamente!");
				return;
			}
		}
	};

	useEffect(() => {
		async function fetch() {
			const res1 = await getHospedeStatus(user.token);
			setHospedeStatusList(res1.data.hospede);
			setHospedagemStatusList(res1.data.hospedagem);
			if(action == "EDITAR"){
				const res2 = await getHospedeById(Number(pathname.substring(10)),user.token);
				setHospedeData(res2.data);
				setValues(res2.data);
			}
		}
		fetch();
		if(action == "CRIAR"){
			setCanEdit(!canEdit);
		}
	}, [getHospedeStatus, user, getHospedeById]);


	function setValues(data: any){
		if (!data) return;
		if (data.hospedeData) {
			setValue("nome", data.hospedeData.NOME_COMPLETO)
			setValue("nomeSocial", data.hospedeData.NOME_SOCIAL)
			setValue("apelido", data.hospedeData.APELIDO)
			setValue("rg", data.hospedeData.RG)
			setValue("cpf", data.hospedeData.CPF)
			setValue("nacionalidade", data.hospedeData.NACIONALIDADE)
			setValue("naturalidade", data.hospedeData.NATURALIDADE)
			setValue("estadoCivil", data.hospedeData.ESTADO_CIVIL)
			setValue("dataNascimento", data.hospedeData.DATA_NASCIMENTO.substring(0, 10))
			setValue("dataEntrada",data.hospedeData.DATA_ENTRADA.substring(0, 10))
			setValue("nomeMae", data.hospedeData.NOME_MAE)
			setValue("nomePai", data.hospedeData.NOME_PAI)
			setValue("telefone", data.hospedeData.TELEFONE)
			setValue("profissao", data.hospedeData.PROFISSAO)
			setValue("tituloEleitor", data.hospedeData.TITULO_ELEITOR)
			setValue("endereco", data.hospedeData.ENDERECO)
			setValue("cidade", data.hospedeData.CIDADE)
			setValue("uf", data.hospedeData.UF)
			setValue("cep", data.hospedeData.CEP)
			setValue("responsavel", data.hospedeData.RESPONSAVEL)
			setValue("hospedeStatus", data.hospedeData.STATUS_HOSPEDE)
		}

		if (data.hospedagemData) {
			setValue("quarto", data.hospedagemData.QUARTO)
			setValue("leito", data.hospedagemData.LEITO)
			setValue("hospedagemInfo", data.hospedagemData.INFORMACOES)
			setValue("hospedagemStatus", data.hospedagemData.STATUS_HOSPEDAGEM)
			setValue("idHOSPEDAGEM", data.hospedagemData.idHOSPEDAGEM)
		}

		if (data.situacaoFinanceiraData) {
			setValue("situacaoFinanceiraDesc", data.situacaoFinanceiraData.DESCRICAO)
			setValue("idSITUACAO_FINANCEIRA", data.situacaoFinanceiraData.idSITUACAO_FINANCEIRA)
		}

		if (data.dadosBancariosData) {
			setValue("agencia", data.dadosBancariosData.AGENCIA)
			setValue("nomeBanco", data.dadosBancariosData.NOME_BANCO)
			setValue("numConta", data.dadosBancariosData.NUMERO_CONTA)
			setValue("HOSPEDE_idHOSPEDE", data.dadosBancariosData.HOSPEDE_idHOSPEDE)
			setValue("idDADOS_BANCARIOS", data.dadosBancariosData.idDADOS_BANCARIOS)
		}

		if (data.dadosMedicos) {
			setValue("grauDependencia", data.dadosMedicos.GRAU_DEPENDENCIA)
			setValue("observacoeMedicamento", data.dadosMedicos.OBSERVACOES)
			setValue("idDADOS_MEDICOS", data.dadosMedicos.idDADOS_MEDICOS)
		}

		if (data.remediosData) {
			setValue("nomeMedicamento", data.remediosData.NOME)
			setValue("freqMedicamento", data.remediosData.FREQUENCIA_USO)
			setValue("tempoMedicamento", data.remediosData.TEMPO_USO)
			setValue("dosagemMedicamento", data.remediosData.DOSAGEM)
			setValue("idREMEDIOS", data.remediosData.idREMEDIOS)
		}

		if (data.dadosMedicosDoencasAlergiasDietasData) {
			setValue("tipoComplicacao", data.dadosMedicosDoencasAlergiasDietasData.TIPO)
			setValue("descComplicacao", data.dadosMedicosDoencasAlergiasDietasData.DESCRICAO)
			setValue("idDOENCAS_ALERGIAS_DIETAS", data.dadosMedicosDoencasAlergiasDietasData.idDOENCAS_ALERGIAS_DIETAS)
			setValue("REMEDIOS_idREMEDIOS", data.dadosMedicosDoencasAlergiasDietasData.idREMEDIOS)
		}
	}

	async function onError(formErrors: FieldErrors<FormData>) {
		for (const value of Object.entries(formErrors)) {
			toast.error(value[1].message)
		}
	} 

	return(
		<div className="bg-white p-5 rounded-md mx-10 mb-20 shadow-lg">
			<form className="flex flex-col space-y-3" onSubmit={handleSubmit(onSubmit, onError)} method="PSOT" encType="multipart/form-data">
				<Toaster richColors/>
				{/* Inicio da primeira parte do formulário */}
				{currentStep == 0 && (
					<>
					<DadosBasicos errors= {errors} register={register} statusList={hospedeStatusList} canEdit={canEdit} />
					<div className="flex justify-end space-x-3">
						{hospedeData && (
							<MyButton buttonText="Editar" buttonType="button" handleClick={() => {setCanEdit(!canEdit)}}/>
						)}
						<MyButton buttonText="Próximo" buttonType="button" handleClick={handleNext}/>
					</div>
					</>
				)}
				{/* Fim da primeira parte do formulário */}

				{/* Inicio da segunda parte do formulário */}
				{currentStep == 1 && (
					<>
						<DadosBancarios errors={errors} register={register} canEdit={canEdit}/>
						<div className="flex justify-end space-x-3">
							<MyButton buttonText="Voltar" buttonType="button" handleClick={handlePrevius}/>
							<MyButton buttonText="Próximo" buttonType="button" handleClick={handleNext}/>
						</div>
					</>
				)}
				{/* Fim da segunda parte do formulário */}

				{/* Inicio da terceira parte do formulário */}
				{currentStep == 2 && (
					<>
						<DadosMedicos errors={errors} register={register} canEdit={canEdit}/>
						<div className="flex justify-end space-x-3">
							<MyButton buttonText="Voltar" buttonType="button" handleClick={handlePrevius}/>
							<MyButton buttonText="Próximo" buttonType="button" handleClick={handleNext}/>
						</div>
					</>
				)}
				{/* Fim da terceira parte do formulário */}

				{/* Inicio da quarta parte do formulário */}
				{currentStep == 3 && (
					<>
						<DadosHospedagem errors={errors} register={register} statusList={hospedagemStatusList} canEdit={canEdit}/>
						<div className="flex justify-end space-x-3">
							<MyButton buttonText="Voltar" buttonType="button" handleClick={handlePrevius}/>
							<MyButton buttonText="Próximo" buttonType="button" handleClick={handleNext}/>
						</div>
					</>
				)}
				{/* Fim da quarta parte do formulário */}

				{/* Inicio da quinta parte do formulário */}
				{currentStep == 4 && (
					<div>
						<div className="flex flex-col space-y-3">
							<h1 className="font-bold">Responsavél</h1>
							<div>
								<h2 className="font-bold">Informações do Responsável</h2>
								<p className="text-sm">Por favor, informe: </p>
								<label>Nome do Responsável relacionado ao hóspede: 
									<input disabled={!canEdit} type="text" className="input" {...register("responsavel")} />
									{errors.responsavel && <span className="text-red-500">{errors.responsavel.message}</span>}
								</label>
							</div>
							<div className="flex justify-end space-x-3">
								<MyButton buttonText="Voltar" buttonType="button" handleClick={handlePrevius}/>
								<MyButton buttonText="Próximo" buttonType="button" handleClick={handleNext}/>
							</div>
						</div>
					</div>
				)}
				{/* Fim da quinta parte do formulário */}

				{/* Inicio da sexta parte do formulário */}
				{currentStep == 5 && (
					<div>
						<div className="flex flex-col space-y-3">
							<div>
								<h3 className="text-center font-bold text-lg">Anexos</h3>
								<label>Documento(opcional)
									<input type="file" className="input mb-2" {...register("anexo")} multiple/>
								</label>
							</div>
							{hospedeData && (
								<div>
									<div className="grid grid-cols-3 gap-2">
										{/* @ts-ignore */}
										{hospedeData.anexosData.map((obj) => (
											<div className="border-2 rounded shadow-md p-2 m-4" key={obj.idANEXOS}>
												<h4 className="text-lg">Nome: {obj.DESCRIPTION}</h4>
												<button type="button" className="w-full mt-4 bg-button text-white py-2 px-4 rounded-lg hover:bg-button-hover transition" onClick={() => {getDownloadUrl(obj.BUCKET_URL)}}>Baixar</button>
											</div>
										))}
									</div>
								</div>
							)}
						</div>
						<div className="flex justify-end space-x-3">
							<MyButton buttonText="Voltar" buttonType="button" handleClick={handlePrevius}/>
							<MyButton buttonText="Finalizar" buttonType="submit"/>				
						</div>
					</div>
				)}
				{/* Fim da sexta parte do formulário */}
			</form>
		</div>
	)
};