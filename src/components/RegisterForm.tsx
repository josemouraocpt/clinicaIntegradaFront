"use client"

import { reset, singUp } from "@/slices/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import profile from "../assets/img/profile.png";

const schema = yup.object({
    name: yup.string().required("name obrigatorio"),
	password: yup.string().required("Insira a password"),
    confirmPassword: yup.string().required("Insira a password"),
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

export function RegisterForm(){
    const dispatch = useDispatch();
	const { loading, error } = useSelector((state) => state.auth);
    const router = useRouter();
	const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	async function onSubmit(data: FormData){
        const novaData = convertDate(data.birthDate)
        data.birthDate = novaData
        const res  = await dispatch(singUp(data))
        if(res.type == "/register/rejected"){
            return
        }else{
            router.push('/dashboard')
        }
	};

	useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

    function convertDate(string: string){
        const values = string.split("/")
        return `${values[2]}-${values[1]}-${values[0]}`
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
                        <label>Senha:
                            <input {...register("password")} type="password" className="input"/>
                        </label>
                        <label>Confirmação de senha:
                            <input {...register("confirmPassword")} type="password" className="input"/>
                        </label>
                        <label>Setor:
                            <select className="input" {...register("departmentId")}>
                                <option value=""></option>
                                <option value={1}>Farmácia</option>
                            </select>
                        </label>
                    </div>
                    <div className="flex flex-row space-x-5">
                        <label>Tipo do usuário:
                            <select className="input" {...register("userProfileId")}>
                                <option value=""></option>
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
                        <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="submit">
                            Finalizar
                        </button>
                    </div>
            </div>
        </form>
    )
}