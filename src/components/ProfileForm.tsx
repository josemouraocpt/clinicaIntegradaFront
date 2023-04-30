'use client'

import { MdMode } from "react-icons/md";
import profile from "../assets/img/profile.png";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MyButton } from "./MyButton";


export function ProfileForm(){

	return(
		<form className="bg-white p-8 rounded-lg shadow-xl text-label">

		<div className="flex flex-row">
			<div className="flex flex-col w-2/6 p-4 space-y-3">
				<label className="text-sm">Nome:
					<input type="text" className="input block" placeholder="Nome"/>
				</label>
				<div className="flex flex-row justify-between">
					<div className="flex flex-col space-y-3">
						<label className="text-sm"> Nascimento:
							<input type="text" className="input block" placeholder="00/00/0000"/>
						</label>
						<label className="text-sm">RG:
							<input type="text" className="input block" placeholder="00.000.000"/>
						</label>
						<label className="text-sm">Nacionalidade:
							<input type="text" className="input block" placeholder="Brasileiro"/>
						</label>
					</div>
					<div className="flex flex-col space-y-3">
						<label className="text-sm">Telefone:
							<input type="text" className="input block" placeholder="+55 (31) 90000-0000"/>
						</label>
						<label className="text-sm">CPF:
							<input type="text" className="input block" placeholder="000.000.000-00"/>
						</label>
						<label className="text-sm">CEP:
							<input type="text" className="input block" placeholder="00000-000"/>
						</label>
					</div>
				</div>
				<label className="text-sm">Endereço:
					<input type="text" className="input block" placeholder="Rua Nome"/>
				</label>
			<div className="flex flex-row space-x-5">
				<label className="text-sm">Número:
					<input type="text" className="input block" placeholder="Nº"/>
				</label>
				<label className="text-sm">Bairro:
					<input type="text" className="input block" placeholder="Bairro"/>
				</label>
				<label className="text-sm">UF:
					<input type="text" className="input block" placeholder="UF"/>
				</label>
			</div>
			</div>
			<div className="flex flex-col w-2/6 p-4 space-y-3">
				<label className="text-sm">ID do Funcionário:
					<input type="text" className="input block" placeholder="00000"/>
				</label>
				<label className="text-sm">Tipo de Perfil:
					<select className="input block">
						<option value="">Master</option>
						<option value="">Comum</option>
					</select>
				</label>
				<label className="text-sm">Formação:
					<input type="text" className="input block" placeholder="Nível"/>
				</label>
				<label className="text-sm">Instituição:
					<input type="text" className="input block" placeholder="Nome da Instituição"/>
				</label>
				<label className="text-sm">Setor:
					<select className="input block">
						<option value="">Cargo 1</option>
						<option value="">Cargo 2</option>
					</select>
				</label>
			</div>
			<div className="flex flex-col items-center w-2/6 p-4 space-y-3">
				<div className="h-36 w-48">
					<Image src={profile} alt="teste" className="w-full"/>
				</div>
				<label>
					<MdMode size={40} className="bg-button text-white p-2 rounded-full ml-48 cursor-pointer"/>
					<input type="file" className="invisible"/>
				</label>
				<label className="text-sm flex-1 w-full">Funções:
					<textarea placeholder="Descrição" className="input block w-full resize-none" rows={10}/>
				</label>
			</div>
		</div>
		<div className="flex justify-end pr-4">
			<MyButton buttonText="Salvar" buttonType="input"/>
		</div>
	</form>
	)

};