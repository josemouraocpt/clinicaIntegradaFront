'use client'

import profile from "../assets/img/profile.png";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import userService from "@/services/userService";

const schema = yup.object({
    name: yup.string().required("name obrigatorio"),
	email: yup.string().required("Insira o e-mail").email("Insira um e-mail válido"),
    nationality: yup.string().required("nationality obrigatorio"),
    naturalness: yup.string().required("naturalness obrigatorio"),
    institution: yup.string().required("Instituição obrigatorio"),
    phoneNumber: yup.string().required("phoneNumber obrigatorio"),
    cpf: yup.string().required("CPF obrigatorio"),
    rg: yup.string().required("RG obrigatorio"),
    birthDate: yup.string().required("Data de nascimento obrigatorio"),
    formation: yup.string().required("Formação obrigatorio"),
    zipCode: yup.string().required("zipCode obrigatorio"),
    address: yup.string().required("Endereço obrigatorio"),
    city: yup.string().required("city obrigatorio"),
    state: yup.string().required("UF obrigatorio"),
    departmentId: yup.number().required("departmentId obrigatorio"),
    image: yup.boolean().nullable(),
    userProfileId: yup.number().required("departmentId obrigatorio")
});

type FormData = yup.InferType<typeof schema>;

export function ProfileForm(){
	const { user } = useSelector((state) => state.auth);
    const router = useRouter();
	const { getUserData, updateUser } = userService;
	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	async function onSubmit(data: FormData){
        const novaData = convertDateToIso(data.birthDate)
        data.birthDate = novaData
		const res = await updateUser(user.user.userId, data, user.token);
		if(res.message == "Usuário editado com sucesso!"){
			return router.push("/dashboard")
		}

	};

	useEffect(() => {
		async function fetch(){
			const res = await getUserData(user.user.userId, user.token)
			if(res.message == "Sucesso"){
				setValues(res.user)
			}
		}
		fetch();
	}, [getUserData, setValues, user]);

    function convertDateToIso(string: string){
        const values = string.split("/")
        return `${values[2]}-${values[1]}-${values[0]}`
    }

	function formatDate(data: string){
		return new Date(data).toLocaleDateString("pt-BR")
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
		setValue("image", data.IMAGEM)
		setValue("userProfileId", data.PERFIL_USUARIO_idPERFIL_USUARIO)
	}

	return(
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col space-y-3">
				{/* dados de cadastro */}
				<div className="flex flex-col space-y-2">
					<h2 className="font-bold">Dados do usuário</h2>
					<div className="flex flex-row space-x-5">
						<label>Nome:
							<input {...register("name")} type="text" className="input"/>
						</label>
						<label>E-mail:
							<input {...register("email")} type="email" className="input"/>
						</label>
						{/* <label>Senha:
							<input {...register("password")} type="password" className="input"/>
						</label> */}
						{/* <label>Confirmação de senha:
							<input {...register("confirmPassword")} type="password" className="input"/>
						</label> */}
						<label>Setor:
							<select className="input" {...register("departmentId")}>
								<option hidden={true}></option>
								<option value={1}>Farmácia</option>
							</select>
						</label>
					</div>
					<div className="flex flex-row space-x-5">
						<label>Tipo do usuário:
							<select className="input" {...register("userProfileId")}>
								<option hidden={true}></option>
								<option value={1}>Funcionário</option>
								<option value={2}>Usuário</option>
							</select>
						</label>
						<label>Telefone:
							<input {...register("phoneNumber")} type="text" className="input"/>
						</label>
						<label>CPF:
							<input {...register("cpf")} type="text" className="input"/>
						</label>
						<label>RG:
							<input {...register("rg")} type="text" className="input"/>
						</label>
					</div>
				</div>
				{/* dados pessoais */}
				<div>
					<div className="flex flex-row space-x-5">
						<label>Data de Nascimento:
							<input {...register("birthDate")} type="text" className="input"/>
						</label>
						<label>Nacionalidade:
							<input {...register("nationality")} type="text" className="input"/>
						</label>
						<label>Naturalidae:
							<input {...register("naturalness")} type="text" className="input"/>
						</label>
						<label>Formação:
							<input {...register("formation")} type="text" className="input"/>
						</label>
						<label>Instituição de Ensino:
							<input {...register("institution")} type="text" className="input"/>
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
										<input {...register("zipCode")} type="text" className="input"/>
									</label>
									<label>Endereço:
										<input {...register("address")} type="text" className="input"/>
									</label>
									<label>Cidade:
										<input {...register("city")} type="text" className="input"/>
									</label>
									<label>Estado:
										<select className="input" {...register("state")}>
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
								</div>
							</div>
							{/* Imagem */}
							<div className="w-52 h-40 hidden">
								<Image src={profile} alt="teste" className="w-full"/>
								<input {...register("image")} type="number" value={0}/>
							</div>
						</div>
				</div>
					<div className="flex justify-end space-x-3">
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