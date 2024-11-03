'use client'

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import userService from "@/services/userService";
import { requiredString, requiredEmail, requiredNumber, requiredNumberString } from "./ErroPreenchimento";

const schema = yup.object({
    name: requiredString('Nome obrigatório'),
	email: requiredEmail('Email obrigatório'),
    nationality: requiredString('Nacionalidade obrigatório'),
    naturalness: requiredString('Naturalidade obrigatório'),
    institution: requiredString('Instituição obrigatório'),
    phoneNumber: requiredNumber('Telefone obrigatório','O telefone deve conter apenas números'),
    cpf: requiredNumberString('CPF obrigatório').min(11, 'CPF inválido').max(11,'CPF inválido'),
    rg: requiredNumberString('RG obrigatório','O RG deve conter apenas números').min(8, 'RG inválido').max(9,'RG inválido'),
    birthDate: requiredString('Data de nascimento obrigatório'),
	formation: requiredString('Formação obrigatório'),
    zipCode: requiredNumberString('CEP obrigatório','O CEP deve conter apenas números').min(8, 'CEP inválido').max(8,'CEP inválido'),
    address: requiredString('Endereço obrigatório'),
    city: requiredString('Cidade obrigatório'),
    state: requiredString('Estado obrigatório'),
    departmentId: requiredString('Setor obrigatório'),
    userProfileId: requiredString('Tipo do usuário obrigatório'),
	userStatus: requiredString('Status obrigatório'),
});

type FormData = yup.InferType<typeof schema>;


export function ProfileForm(){
	const { user } = useSelector((state) => state.auth);
	const [userSetores, setUserSetores] = useState();
	const [userProfiles, setUserProfiles] = useState();
	const [useStatus, setUserStatus] = useState();
    const router = useRouter();
	const { getUserData, updateUser, getUserSetores, getUserProfiles, getUserStatus } = userService;
	const [canEdit, setCanEdit] = useState(false);
	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	async function onSubmit(data: FormData){
		const res = await updateUser(user.user.userId, data, user.token);
		if(res.type == "SUCCESS"){
			return router.push("/dashboard")
		}

	};

	useEffect(() => {
		async function fetch(){
			const res1 = await getUserData(user.user.userId, user.token)
			const res2 = await getUserProfiles();
			const res3 = await getUserSetores();
			const res4 = await getUserStatus(user.token);
			setValues(res1.data);
			setUserProfiles(res2.data);
			setUserSetores(res3.data);
			setUserStatus(res4.data);
		}
		fetch();
	}, [getUserData, user, getUserProfiles, getUserProfiles, getUserStatus]);

	function formatDate(data: string){
		return data.substring(0,10)
	}

	function setValues(data: any){
		setValue("name", data.NOME)
		setValue("email", data.EMAIL)
		setValue("nationality", data.NACIONALIDADE)
		setValue("naturalness", data.NATURALIDADE)
		setValue("institution", data.INSTITUICAO)
		setValue("phoneNumber", data.TELEFONE)
		setValue("cpf", data.CPF)
		setValue("rg", data.RG)
		setValue("birthDate", formatDate(data.DATA_NASCIMENTO))
		setValue("formation", data.FORMACAO)
		setValue("zipCode", data.CEP)
		setValue("address", data.ENDERECO)
		setValue("city", data.CIDADE)
		setValue("state", data.UF)
		setValue("departmentId", data.SETOR_idSETOR)
		setValue("userProfileId", data.USER_DOMAIN_idUSER_DOMAIN)
		setValue("userStatus", data.STATUS_USUARIO)
	}

	return(
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col space-y-3">
				{/* dados de cadastro */}
				<div className="flex flex-col space-y-2">
					<h2 className="font-bold">Dados do usuário</h2>
					<div className="flex flex-row space-x-5">
						<label>Nome:
							<input readOnly={!canEdit} {...register("name")} type="text" className="input"/>
							{errors.name && <span className="text-red-500">{errors.name.message}</span>}
						</label>
						<label>E-mail:
							<input readOnly={!canEdit} {...register("email")} type="email" className="input"/>
							{errors.email && <span className="text-red-500">{errors.email.message}</span>}
						</label>
						{/* <label>Senha:
							<input readOnly={!canEdit} {...register("password")} type="password" className="input"/>
						</label> */}
						{/* <label>Confirmação de senha:
							<input readOnly={!canEdit} {...register("confirmPassword")} type="password" className="input"/>
						</label> */}
						<label>Setor:
							<select disabled={!canEdit} className="input" {...register("departmentId")}>
								<option hidden={true}></option>
								{userSetores && (
									//@ts-ignore
									userSetores.map((setor) => (
										<option value={setor.idSETOR} key={setor.idSETOR}>{setor.DESCRICAO}</option>
									))
								)}
							</select>
							{errors.departmentId && <span className="text-red-500">{errors.departmentId.message}</span>}
						</label>
					</div>
					<div className="flex flex-row space-x-5">
						<label>Tipo do usuário:
							<select disabled={!canEdit} className="input" {...register("userProfileId")}>
								<option hidden={true}></option>
								{userProfiles && (
									//@ts-ignore
									userProfiles.map((profile) => (
										<option value={profile.idUSER_DOMAIN} key={profile.idUSER_DOMAIN}>{profile.DOMAIN_DESCRIPTION}</option>
									))
								)}
							</select>
							{errors.userProfileId && <span className="text-red-500">{errors.userProfileId.message}</span>}
						</label>
						<label>Telefone:
							<input readOnly={!canEdit} {...register("phoneNumber")} type="text" className="input"/>
							{errors.phoneNumber && <span className="text-red-500">{errors.phoneNumber.message}</span>}
						</label>
						<label>CPF:
							<input readOnly={!canEdit} {...register("cpf")} type="text" className="input"/>
							{errors.cpf && <span className="text-red-500">{errors.cpf.message}</span>}
						</label>
						<label>RG:
							<input readOnly={!canEdit} {...register("rg")} type="text" className="input"/>
							{errors.rg && <span className="text-red-500">{errors.rg.message}</span>}
						</label>
					</div>
				</div>
				{/* dados pessoais */}
				<div>
					<div className="flex flex-row space-x-5">
						<label>Data de Nascimento:
							<input readOnly={!canEdit} {...register("birthDate")} type="date" className="input"/>
							{errors.birthDate && <span className="text-red-500">{errors.birthDate.message}</span>}
						</label>
						<label>Nacionalidade:
							<input readOnly={!canEdit} {...register("nationality")} type="text" className="input"/>
							{errors.nationality && <span className="text-red-500">{errors.nationality.message}</span>}
						</label>
						<label>Naturalidae:
							<input readOnly={!canEdit} {...register("naturalness")} type="text" className="input"/>
							{errors.naturalness && <span className="text-red-500">{errors.naturalness.message}</span>}
						</label>
						<label>Formação:
							<input readOnly={!canEdit} {...register("formation")} type="text" className="input"/>
							{errors.formation && <span className="text-red-500">{errors.formation.message}</span>}
						</label>
						<label>Instituição de Ensino:
							<input readOnly={!canEdit} {...register("institution")} type="text" className="input"/>
							{errors.institution && <span className="text-red-500">{errors.institution.message}</span>}
						</label>
					</div>
				</div>
				{/* endereço */}
				<div>
					<h2 className="font-bold">Dados de endereço</h2>
						<div className="flex gap-x-80">
							<div className="flex flex-col space-y-2">
								<div className="flex flex-row space-x-5">
									<label>CEP:
										<input readOnly={!canEdit} {...register("zipCode")} type="text" className="input"/>
										{errors.zipCode && <span className="text-red-500">{errors.zipCode.message}</span>}
									</label>
									<label>Endereço:
										<input readOnly={!canEdit} {...register("address")} type="text" className="input"/>
										{errors.address && <span className="text-red-500">{errors.address.message}</span>}
									</label>
									<label>Cidade:
										<input readOnly={!canEdit} {...register("city")} type="text" className="input"/>
										{errors.city && <span className="text-red-500">{errors.city.message}</span>}
									</label>
									<label>Estado:
										<select disabled={!canEdit} className="input" {...register("state")}>
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
										{errors.state && <span className="text-red-500">{errors.state.message}</span>}
								</label>
								<label>Status:
									<select disabled={!canEdit} className="input" {...register("userStatus")}>
										<option hidden={true}></option>
										{useStatus && (
											//@ts-ignore
											useStatus.map((status) => (
												<option value={status.STATUS_VALUE} key={status.idSTATUS_DOMAIN}>{status.STATUS_DESCRIPTION}</option>
											))
										)}
									</select>
									{errors.userStatus && <span className="text-red-500">{errors.userStatus.message}</span>}
								</label>
								</div>
							</div>
						</div>
				</div>
					<div className="flex justify-end space-x-3">
						<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="button" onClick={() => setCanEdit(!canEdit)}>
							Editar
						</button>
						<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="button" onClick={() => router.back()}>
							Voltar
						</button>
						<button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="submit">
							Salvar
						</button>
					</div>
			</div>
		</form>
	)
};