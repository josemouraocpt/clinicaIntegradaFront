'use client'
import userService from "@/services/userService";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profile from "../../../../../assets/img/profile.png";
import Image from "next/image";
import { ContainerUsuarios } from "@/components/ContainerUsuarios";

interface IUserData{
    idUSUARIO: number,
    SETOR_idSETOR: number,
    PERFIL_USUARIO_idPERFIL_USUARIO: number,
    NOME: string,
    DATA_NASCIMENTO: string,
    TELEFONE: string,
    RG: string,
    CPF: string,
    NACIONALIDADE: string,
    NATURALIDADE: string,
    ENDERECO: string,
    CIDADE: string,
    UF: string,
    CEP: string,
    FORMACAO: string,
    INSTITUICAO: string,
    EMAIL: string,
    SENHA: string,
    IMAGEM: boolean
}

export default function DetalhesUsuario(){
    const [data, setData] = useState<IUserData>();
    const pathname = usePathname();
    const { getUserData } = userService;
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
		async function fetch(userId: number){
			const res = await getUserData(userId, user.token)
				if(res.message == "Sucesso"){
					setData(res.user)
				}
		}
        fetch(Number(pathname.substring(23)));
	}, [getUserData, user]);

    function formatDate(data: string | undefined){
        if(data !== undefined){
            return data.substring(0,10)
        }else{
            return ""
        }
		
	}

    return(
        <div className="min-h-screen">
            <ContainerUsuarios/>
			<div className="flex flex-col space-y-3 m-10 bg-white p-10 rounded-lg shadow-md">
				<div className="flex flex-col space-y-2">
					<h2 className="font-bold">Dados do usuário</h2>
					<div className="flex flex-row space-x-5">
						<label>Nome:
							<p className="input">{data?.NOME}</p>
						</label>
						<label>E-mail:
                            <p className="input">{data?.EMAIL}</p>
						</label>
						<label>Setor:
                            <p className="input">{data?.SETOR_idSETOR}</p>
						</label>
					</div>
					<div className="flex flex-row space-x-5">
						<label>Tipo do usuário:
                            <p className="input">{data?.PERFIL_USUARIO_idPERFIL_USUARIO}</p>
						</label>
						<label>Telefone:
                            <p className="input">{data?.TELEFONE}</p>
						</label>
						<label>CPF:
                            <p className="input">{data?.CPF}</p>
						</label>
						<label>RG:
                            <p className="input">{data?.RG}</p>
						</label>
					</div>
				</div>
				<div>
					<div className="flex flex-row space-x-5">
						<label>Data de Nascimento:
                            <p className="input">{formatDate(data?.DATA_NASCIMENTO)}</p>
						</label>
						<label>Nacionalidade:
                            <p className="input">{data?.NACIONALIDADE}</p>
						</label>
						<label>Naturalidae:
                            <p className="input">{data?.NATURALIDADE}</p>
						</label>
						<label>Formação:
                            <p className="input">{data?.FORMACAO}</p>
						</label>
						<label>Instituição de Ensino:
                            <p className="input">{data?.INSTITUICAO}</p>
						</label>
					</div>
				</div>
				<div>
					<h2 className="font-bold">Dados de endereço</h2>
						<div className="flex gap-x-80">
							<div className="flex flex-col space-y-2">
								<div className="flex flex-row space-x-5">
									<label>CEP:
                                        <p className="input">{data?.CEP}</p>
									</label>
									<label>Endereço:
                                        <p className="input">{data?.ENDERECO}</p>
									</label>
									<label>Cidade:
                                        <p className="input">{data?.CIDADE}</p>
									</label>
									<label>Estado:
                                        <p className="input">{data?.UF}</p>
								</label>
								</div>
							</div>
							{/* Imagem */}
							<div className="w-52 h-40 hidden">
								<Image src={profile} alt="teste" className="w-full"/>
							</div>
						</div>
				</div>
			</div>
        </div>
    )
}