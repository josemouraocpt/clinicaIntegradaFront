"use client"
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import userService from "@/services/userService";
import {requiredConfirmPassword, requiredPassword, requiredString, requiredEmail, requiredNumber, requiredNumberString } from "./ErroPreenchimento";
import { toast, Toaster } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import authService from "@/services/authService";

const schema = yup.object({
    name: requiredString('Nome obrigatório'),
	password: requiredPassword('Senha obrigatória'),
    confirmPassword: requiredConfirmPassword('Senha obrigatória'),
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
});


type FormData = yup.InferType<typeof schema>;

export function RegisterForm(){
    const router = useRouter();
    const { register: registrar } = authService;
    const { getUserSetores, getUserProfiles } = userService;
    const [setores, setSetores] = useState([]);
    const [profiles, setProfiles] = useState([]);
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
    const [visibility1, setVisibility1] = useState(false)
    const [visibility2, setVisibility2] = useState(false)

	async function onSubmit(data: FormData){
        const res  = await registrar(data);
        if(res.type == "ERROR"){
            toast.error(res.message);
            return
        }else{
            toast.success("Registro realizado com sucesso!");
            router.push('/dashboard')
        } 
	};

	useEffect(() => {
        async function fetch() {
            const res1 = await getUserSetores();
            const res2 = await getUserProfiles();
            setSetores(res1.data);
            setProfiles(res2.data);
        }
        fetch()
	}, []);

    async function onError(formErrors: FieldErrors<FormData>) {
        for (const value of Object.entries(formErrors)) {
            toast.error(value[1].message)
        }
    } 

    return(
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Toaster richColors/>
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
                        <label>Senha:
                            <div className="flex space-x-2">
                                <input {...register("password")} type={visibility1 ? "text" : "password"} className="input"/>
                                {!visibility1 ? (
                                    <button type="button" onClick={() => { setVisibility1(!visibility1) }}><FaEye size={24} /></button>
                                ) : (
                                    <button type="button" onClick={() => { setVisibility1(!visibility1) }}><FaEyeSlash size={24} /></button>
                                )}
                            </div>
                        </label>
                        <label>Confirmação de senha:
                            <div className="flex space-x-2">
                                <input {...register("confirmPassword")} type={visibility2 ? "text" : "password"} className="input"/>
                                {!visibility2 ? (
                                    <button type="button" onClick={() => { setVisibility2(!visibility2) }}><FaEye size={24} /></button>
                                ) : (
                                    <button type="button" onClick={() => { setVisibility2(!visibility2) }}><FaEyeSlash size={24} /></button>
                                )}
                            </div>
                        </label>
                        <label>Setor:
                            <select className="input" {...register("departmentId")}>
                                <option hidden={true}></option>
                                {setores?.length >= 1 && (
                                    setores.map((value) => (
                                        <option value={value.idSETOR} key={value.idSETOR}>{value.DESCRICAO}</option>
                                    ))
                                )}
                            </select>
                        </label>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <label>Tipo do usuário:
                            <select className="input" {...register("userProfileId")}>
                                <option hidden={true}></option>
                                {profiles?.length >= 1 && (
                                    profiles.map((value) => (
                                        <option value={value.idUSER_DOMAIN} key={value.idUSER_DOMAIN}>{value.DOMAIN_DESCRIPTION}</option>
                                    ))
                                )}
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
                            <input {...register("birthDate")} type="date" className="input"/>
                        </label>
                        <label>Nacionalidade:
                            <input {...register("nationality")} type="text" className="input"/>
                        </label>
                        <label>Naturalidade:
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
                        </div>
                </div>
                    <div className="flex justify-end space-x-3">
                        <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="button" onClick={() => { router.back() }}>
                            Cancelar
                        </button>
                        <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="submit">
                            Finalizar
                        </button>
                    </div>
            </div>
        </form>
    )
}