'use client'
import userService from "@/services/userService";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ContainerUsuarios } from "@/components/ContainerUsuarios";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MyButton } from "@/components/MyButton";
import { toast } from "sonner";

const schema = yup.object({
    userId: yup.number(),
	userStatus: yup.string()
});

type FormData = yup.InferType<typeof schema>;

interface IUserData{
    idUSUARIO: number,
    SETOR_idSETOR: number,
    USER_DOMAIN_idUSER_DOMAIN: number,
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
    STATUS_USUARIO: string
}

export default function DetalhesUsuario(){
    const [data, setData] = useState<IUserData>();
	const [userStatus, setUserStatus] = useState();
	const [canEdit, setCanEdit] = useState(false);
    const pathname = usePathname();
	const router = useRouter();
    const { getUserData, getUserStatus, updateUserStatus } = userService;
    const user = JSON.parse(window.sessionStorage.getItem("user") || "{}");
	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

	//variavel para setor e tipo do usuario
	
    useEffect(() => {
		async function fetch(){
			const res = await getUserData(Number(pathname.substring(23)), user.token);
			const res2 = await getUserStatus(user.token);
			setData(res.data);
			setUserStatus(res2.data);
			setValue("userStatus", res.data.STATUS_USUARIO);
		}
        fetch();
		setValue("userId", Number(pathname.substring(23)));
	}, []);



	async function onSubmit(data: FormData){
		const res = await updateUserStatus(data, user.token);
		if(res.type == "SUCCESS"){
			toast.success("Ação realizada com sucesso!");{}
			return router.push("/funcionarios")
		}else {
            toast.error("Algo não está certo.Tente novamente!");
            return;
        }

	};

    return(
        <div className="min-h-screen">
            <ContainerUsuarios/>
			<div className="flex flex-col space-y-3 m-10 bg-white p-10 rounded-lg shadow-md">
				{data && (
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-col space-y-2">
							<h2 className="font-bold">Dados do usuário</h2>
							<div className="flex flex-row space-x-5">
								<label>Nome:
									<input readOnly={true} type="text" className="input" value={data?.NOME}/>
								</label>
								<label>E-mail:
									<input readOnly={true} type="text" className="input" value={data?.EMAIL}/>
								</label>
								<label>Setor:
									<input readOnly={true} type="text" className="input" value={data?.SETOR_idSETOR}/>
								</label>
							</div>
							<div className="flex flex-row space-x-5">
								<label>Tipo do usuário:
									<input readOnly={true} type="text" className="input" value={data?.USER_DOMAIN_idUSER_DOMAIN}/>
								</label>
								<label>Telefone:
									<input readOnly={true} type="text" className="input" value={data?.TELEFONE}/>
								</label>
								<label>CPF:
									<input readOnly={true} type="text" className="input" value={data?.CPF}/>
								</label>
								<label>RG:
									<input readOnly={true} type="text" className="input" value={data?.RG}/>
								</label>
							</div>
						</div>
						<div>
							<div className="flex flex-row space-x-5">
								<label>Data de Nascimento:
									<input readOnly={true} type="date" className="input" value={data?.DATA_NASCIMENTO.substring(0,10)}/>
								</label>
								<label>Nacionalidade:
									<input readOnly={true} type="text" className="input" value={data?.NACIONALIDADE}/>
								</label>
								<label>Naturalidae:
									<input readOnly={true} type="text" className="input" value={data?.NATURALIDADE}/>
								</label>
								<label>Formação:
									<input readOnly={true} type="text" className="input" value={data?.FORMACAO}/>
								</label>
								<label>Instituição de Ensino:
									<input readOnly={true} type="text" className="input" value={data?.INSTITUICAO}/>
								</label>
							</div>
						</div>
						<div>
							<h2 className="font-bold">Dados de endereço</h2>
								<div className="flex gap-x-80">
									<div className="flex flex-col space-y-2">
										<div className="flex flex-row space-x-5">
											<label>CEP:
												<input readOnly={true} type="text" className="input" value={data?.CEP}/>
											</label>
											<label>Endereço:
												<input readOnly={true} type="text" className="input" value={data?.ENDERECO}/>
											</label>
											<label>Cidade:
												<input readOnly={true} type="text" className="input" value={data?.CIDADE}/>
											</label>
											<label>Estado:
												<input readOnly={true} type="text" className="input" value={data?.UF}/>
											</label>
											<label>Status:
												<select className="input" disabled={!canEdit} {...register("userStatus")} >
													{userStatus && (
														//@ts-ignore
														userStatus.map((status) => (
															<option value={status.STATUS_VALUE} key={status.idSTATUS_DOMAIN}>{status.STATUS_DESCRIPTION}</option>
														))
													)}
												</select>
											</label>
										</div>
									</div>
								</div>
						</div>
						<div className="flex justify-end space-x-3 mt-4">
							<MyButton buttonText="Alterar Status" buttonType="button" hidden={user.user.access == "ADMIN" ? false : true} handleClick={() => setCanEdit(!canEdit)}/>
							<MyButton buttonText="Salvar" buttonType="submit" />
						</div>
					</form>
				)}
			</div>
        </div>
    )
}