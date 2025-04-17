"use client"

import { reset, singUp } from "@/slices/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import userService from "@/services/userService";
<<<<<<< HEAD
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
const cepRegex = /^\d{5}-\d{3}$/;
const rgRegex = /^\d{1,2}\.?\d{3}\.?\d{3}-?[\dXx]$/;
const phoneRegex = /^(\+?55\s?)?(\(?\d{2}\)?\s?)?(9\d{4}|\d{4})-?\d{4}$/;

const schema = yup.object({
    name: yup.string().required("O nome é obrigatório"),
	password: yup.string().required("A senha é obrigatória"),
    confirmPassword: yup.string().required("A confirmação da senha é obrigatória").oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
	email: yup.string().required('O e-mail é obrigatório').email('Informe um e-mail válido'),
    nationality: yup.string().required('A nacionaliade é obrigatória'),
    naturalness: yup.string().required('A naturalidade é obrigatória'),
    institution: yup.string(),
    phoneNumber: yup.string().required('O telefone é obrigatório').matches(phoneRegex, 'Deve estar no padrão 31912345678'),
    cpf: yup.string().required('O CPF é obrigatório').matches(cpfRegex, 'Deve estar no padrão 000.000.000-00'),
    rg: yup.string().required('O RG é obrigatório').matches(rgRegex, 'Deve estar no padrão 00000000'),
    birthDate: yup.string().required('A data de nascimento obrigatória'),
    formation: yup.string(),
    zipCode: yup.string().required('O CEP é obrigatório').matches(cepRegex, 'Deve estar no padrão 00000-000'),
    address: yup.string().required('O endereço é obrigatório'),
    city: yup.string().required('A cidade é obrigatória'),
    state: yup.string().required('O estado é obrigatório'),
    departmentId: yup.string().required('O departamento é obrigatório'),
    userProfileId: yup.string().required('O tipo de perfil é obrigatório'),
=======
import {requiredConfirmPassword, requiredPassword, requiredString, requiredEmail, requiredNumber, requiredNumberString } from "./ErroPreenchimento";
import { toast } from "sonner";
 

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
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
});


type FormData = yup.InferType<typeof schema>;

export function RegisterForm(){
    const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
    const router = useRouter();
    const { getUserSetores, getUserProfiles } = userService;
    const [setores, setSetores] = useState([]);
    const [profiles, setProfiles] = useState([]);
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema)
	});
    const [visibility1, setVisibility1] = useState("password")
    const [visibility2, setVisibility2] = useState("password")

	async function onSubmit(data: FormData){
        const res  = await dispatch(singUp(data))
        if(res.type == "/register/rejected"){
<<<<<<< HEAD
            return alert(res.payload)
=======
            toast.error("Falha em si registrar. Verifique suas credenciais.");
            return
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
        }else{
            toast.success("Registro realizado com sucesso!");{}
            router.push('/dashboard')
        } 
	};

	useEffect(() => {
		dispatch(reset());
        async function fetch() {
            const res1 = await getUserSetores();
            const res2 = await getUserProfiles();
            setSetores(res1.data);
            setProfiles(res2.data);
        }
        fetch()
	}, [dispatch]);

    function visibility(callback: any, text: string){
        callback(text)
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
<<<<<<< HEAD
                            <span className="text-red-500">{errors.name?.message}</span>
                        </label>
                        <label>E-mail:
                            <input {...register("email")} type="email" className="input"/>
                            <span className="text-red-500">{errors.email?.message}</span>
                        </label>
                        <label>Senha:
                            <div className="flex items-center gap-x-2 
                            ">
                                <input {...register("password")} type={visibility1} className="input"/>
                                {visibility1 == "password" ? 
                                (<FaEye size={28} onClick={()=>visibility(setVisibility1,"text")} />) : 
                                (<FaEyeSlash size={28} onClick={()=>visibility(setVisibility1,"password")} />)
                                }
                            </div>
                            <span className="text-red-500">{errors.password?.message}</span>
                        </label>
                        <label>Confirmação de senha:
                            <div className="flex items-center gap-x-2 
                            ">
                                <input {...register("confirmPassword")} type={visibility2} className="input"/>
                                {visibility2 == "password" ? 
                                (<FaEye size={28} onClick={()=>visibility(setVisibility2,"text")} />) : 
                                (<FaEyeSlash size={28} onClick={()=>visibility(setVisibility2,"password")} />)
                                }
                            </div>
                            <span className="text-red-500">{errors.confirmPassword?.message}</span>
=======
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </label>
                        <label>E-mail:
                            <input {...register("email")} type="email" className="input"/>
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </label>
                        <label>Senha:
                            <input {...register("password")} type="password" className="input"/>
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </label>
                        <label>Confirmação de senha:
                            <input {...register("confirmPassword")} type="password" className="input"/>
                            {errors.confirmPassword && <span className="text-red-500 nowrap">{errors.confirmPassword.message}</span>}
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
                        </label>
                        {/* <label>Setor:
                            <select className="input" {...register("departmentId")}>
                                <option hidden={true}></option>
                                {setores?.length >= 1 && (
                                    setores.map((value) => (
                                        <option value={value.idSETOR} key={value.idSETOR}>{value.DESCRICAO}</option>
                                    ))
                                )}
                            </select>
<<<<<<< HEAD
                            <span className="text-red-500">{errors.departmentId?.message}</span>
                        </label>
=======
                        </label> */}
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
                    </div>
                    <div className="flex flex-row space-x-5">
                        {/* <label>Tipo do usuário:
                            <select className="input" {...register("userProfileId")}>
                                <option hidden={true}></option>
                                {profiles?.length >= 1 && (
                                    profiles.map((value) => (
                                        <option value={value.idUSER_DOMAIN} key={value.idUSER_DOMAIN}>{value.DOMAIN_DESCRIPTION}</option>
                                    ))
                                )}
                            </select>
<<<<<<< HEAD
                            <span className="text-red-500">{errors.userProfileId?.message}</span>
                        </label>
                        <label>Telefone:
                            <input {...register("phoneNumber")} type="text" className="input"/>
                            <span className="text-red-500">{errors.phoneNumber?.message}</span>
                        </label>
                        <label>CPF:
                            <input {...register("cpf")} type="text" className="input"/>
                            <span className="text-red-500">{errors.cpf?.message}</span>
                        </label>
                        <label>RG:
                            <input {...register("rg")} type="text" className="input"/>
                            <span className="text-red-500">{errors.rg?.message}</span>
=======
                        </label> */}
                        <label>Telefone:
                            <input {...register("phoneNumber")} type="text" className="input"/>
                            {errors.phoneNumber && <span className="text-red-500 nowrap">{errors.phoneNumber.message}</span>}
                        </label>
                        <label>CPF:
                            <input {...register("cpf")} type="text" className="input"/>
                            {errors.cpf && <span className="text-red-500 nowrap">{errors.cpf.message}</span>}
                        </label>
                        <label>RG:
                            <input {...register("rg")} type="text" className="input"/>
                            {errors.rg && <span className="text-red-500 nowrap">{errors.rg.message}</span>}
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
                        </label>
                    </div>
                </div>
                {/* dados pessoais */}
                <div>
                    <div className="flex flex-row space-x-5">
                        <label>Data de Nascimento:
                            <input {...register("birthDate")} type="date" className="input"/>
<<<<<<< HEAD
                            <span className="text-red-500">{errors.birthDate?.message}</span>
                        </label>
                        <label>Nacionalidade:
                            <input {...register("nationality")} type="text" className="input"/>
                            <span className="text-red-500">{errors.nationality?.message}</span>
=======
                            {errors.birthDate && <span className="text-red-500 nowrap">{errors.birthDate.message}</span>}
                        </label>
                        <label>Nacionalidade:
                            <input {...register("nationality")} type="text" className="input"/>
                            {errors.nationality && <span className="text-red-500 nowrap">{errors.nationality.message}</span>}
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
                        </label>
                        <label>Naturalidade:
                            <input {...register("naturalness")} type="text" className="input"/>
<<<<<<< HEAD
                            <span className="text-red-500">{errors.naturalness?.message}</span>
                        </label>
                        <label>Formação:
                            <input {...register("formation")} type="text" className="input"/>
                            <span className="text-red-500">{errors.formation?.message}</span>
                        </label>
                        <label>Instituição de Ensino:
                            <input {...register("institution")} type="text" className="input"/>
                            <span className="text-red-500">{errors.institution?.message}</span>
=======
                            {errors.naturalness && <span className="text-red-500 nowrap">{errors.naturalness.message}</span>}
                        </label>
                        <label>Formação:
                            <input {...register("formation")} type="text" className="input"/>
                            {errors.formation && <span className="text-red-500 nowrap">{errors.formation.message}</span>}
                        </label>
                        <label>Instituição de Ensino:
                            <input {...register("institution")} type="text" className="input"/>
                            {errors.institution && <span className="text-red-500 nowrap">{errors.institution.message}</span>}
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
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
<<<<<<< HEAD
                                        <span className="text-red-500">{errors.zipCode?.message}</span>
                                    </label>
                                    <label>Endereço:
                                        <input {...register("address")} type="text" className="input"/>
                                        <span className="text-red-500">{errors.address?.message}</span>
                                    </label>
                                    <label>Cidade:
                                        <input {...register("city")} type="text" className="input"/>
                                        <span className="text-red-500">{errors.city?.message}</span>
=======
                                        {errors.zipCode && <span className="text-red-500 nowrap">{errors.zipCode.message}</span>}
                                    </label>
                                    <label>Endereço:
                                        <input {...register("address")} type="text" className="input"/>
                                        {errors.address && <span className="text-red-500 nowrap">{errors.address.message}</span>}
                                    </label>
                                    <label>Cidade:
                                        <input {...register("city")} type="text" className="input"/>
                                        {errors.city && <span className="text-red-500 nowrap">{errors.city.message}</span>}
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
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
<<<<<<< HEAD
                                        <span className="text-red-500">{errors.state?.message}</span>
=======
                                        {errors.state && <span className="text-red-500 nowrap">{errors.state.message}</span>}
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
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