'use client'
import { ContainerHospedes } from "@/components/ContainerHospedes";
import { MyButton } from "@/components/MyButton";
import hospedeService from "@/services/hospedeService";
import { yupResolver } from "@hookform/resolvers/yup";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import * as yup from "yup";
 
interface IDadosBancarios {
    idDADOS_BANCARIOS?: number;
    HOSPEDE_idHOSPEDE: number;
    CONTA: number;
    NOME_BANCO: string;
    AGENCIA: number;
    NUMERO_CONTA: string;
}

const schema = yup.object({
	DESCRICAO: yup.string().required("Descrição obrigatória"),
    idSITUACAO_FINANCEIRA: yup.number(),
	AGENCIA: yup.string().required("Agência obrigatória"),
	CONTA: yup.string().required("Conta obrigatória"),
	NOME_BANCO: yup.string().required("Banco obrigatório"),
	NUMERO_CONTA: yup.string().required("Número da conta obrigatório"),
	HOSPEDE_idHOSPEDE: yup.number(),
	idDADOS_BANCARIOS: yup.number(),
    AGENCIA2: yup.string(),
	CONTA2: yup.string(),
	NOME_BANCO2: yup.string(),
	NUMERO_CONTA2: yup.string(),
	HOSPEDE_idHOSPEDE2: yup.number(),
	idDADOS_BANCARIOS2: yup.number(),
    AGENCIA3: yup.string(),
	CONTA3: yup.string(),
	NOME_BANCO3: yup.string(),
	NUMERO_CONTA3: yup.string(),
	HOSPEDE_idHOSPEDE3: yup.number(),
	idDADOS_BANCARIOS3: yup.number(),
});

type FormData = yup.InferType<typeof schema>;

export default function Banco(){
    const [canEdit, setCanEdit] = useState(false);
    const [canEdit2, setCanEdit2] = useState(false);
    const [count, setCount] = useState(0);

    const { getHospedeFinanceiro, postHospedeFinanceiro, putHospedeFinanceiro, putHospedeSituacaoFinanceira, deleteHospedeBanco, deleteHospedeSituacao } = hospedeService;
    const { user } = useSelector((state) => state.auth);
    const pathname = usePathname();
    const router = useRouter();
    const [hospedeData, setHospedeData] = useState<Array<IDadosBancarios>>([]);

    const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<FormData>({
		resolver: yupResolver(schema)
	});


    useEffect(() => {
        async function fetch(){
            const res =  await getHospedeFinanceiro(Number(pathname.substring(16)), user.token);
            setHospedeData(res.data.banco);
            res.data.banco.map((obj, index) => {
                setValues(obj, index);
            })
            setValue("idSITUACAO_FINANCEIRA", res.data.financeiro.idSITUACAO_FINANCEIRA);
            setValue("DESCRICAO", res.data.financeiro.DESCRICAO);
        }
        fetch()
    }, [user, getHospedeFinanceiro]);

    async function onSubmit(data: FormData){
        //separar os objetos
        const dataToSend = [];

        if(count >= 1){
            if(data.NOME_BANCO2 === "") return toast.error("Banco obrigatório");
            if(data.AGENCIA2 === "") return toast.error("Agência obrigatória");
            if(data.CONTA2 === "") return toast.error("Conta obrigatória");
            if(data.NUMERO_CONTA2 === "") return toast.error("Número da conta obrigatório");

            if(data.NOME_BANCO3 === "") return toast.error("Banco obrigatório");
            if(data.AGENCIA3 === "") return toast.error("Agência obrigatória");
            if(data.CONTA3 === "") return toast.error("Conta obrigatória");
            if(data.NUMERO_CONTA3 === "") return toast.error("Número da conta obrigatório");
        }
        const sitFinData = {
            DESCRICAO: data.DESCRICAO,
            idSITUACAO_FINANCEIRA: data.idSITUACAO_FINANCEIRA,
            HOSPEDE_idHOSPEDE: Number(pathname.substring(16))
        };

        const data1 = {
            AGENCIA: data.AGENCIA,
            CONTA: data.CONTA,
            NOME_BANCO: data.NOME_BANCO,
            NUMERO_CONTA: data.NUMERO_CONTA,
            HOSPEDE_idHOSPEDE: data.HOSPEDE_idHOSPEDE,
            idDADOS_BANCARIOS: data.idDADOS_BANCARIOS,
        };

        dataToSend.push(data1);

        if(count >= 1 || hospedeData.length >= 1){
            const data2 = {
                AGENCIA: data.AGENCIA2,
                CONTA: data.CONTA2,
                NOME_BANCO: data.NOME_BANCO2,
                NUMERO_CONTA: data.NUMERO_CONTA2,
                HOSPEDE_idHOSPEDE: data.HOSPEDE_idHOSPEDE2,
                idDADOS_BANCARIOS: data.idDADOS_BANCARIOS2,
            };
            dataToSend.push(data2);
        }
        if(count >= 2 || hospedeData.length >= 2){
            const data3 = {
                AGENCIA: data.AGENCIA3,
                CONTA: data.CONTA3,
                NOME_BANCO: data.NOME_BANCO3,
                NUMERO_CONTA: data.NUMERO_CONTA3,
                HOSPEDE_idHOSPEDE: data.HOSPEDE_idHOSPEDE3,
                idDADOS_BANCARIOS: data.idDADOS_BANCARIOS3,
            };
            dataToSend.push(data3);
        }

        const dataToUpdate = dataToSend.filter((obj) => { return obj.idDADOS_BANCARIOS !== undefined });
        //enviar atualizações

        const res1 = await putHospedeFinanceiro(Number(pathname.substring(16)), dataToUpdate, user.token);
        const res2 = await putHospedeSituacaoFinanceira(Number(pathname.substring(16)), sitFinData, user.token)

        //caso necessário enviar novos registros
        const dataToCreate = dataToSend.filter((obj) => { return obj.idDADOS_BANCARIOS === undefined });
        if(dataToCreate.length !== 0){
            dataToCreate.map((obj) => {
                delete obj.idDADOS_BANCARIOS
                obj.HOSPEDE_idHOSPEDE = Number(pathname.substring(16))
            });
            const res = await postHospedeFinanceiro(dataToCreate, user.token);
        }

        if(res1.type === "SUCCESS" && res2.type === "SUCCESS"){
            toast.success("Ação realizada com sucesso!");{}
            router.push("/hospedes")
        }else{
            toast.error("Algo não está certo.Tente novamente!");
            return;
        }

    }

    function handleClick(){
        setCount(count + 1);
        if(canEdit2 == false){
            setCanEdit2(!canEdit2);
        }
    }

    function handleClick2(){
        setCanEdit(!canEdit);
        setCanEdit2(!canEdit2);
    }

    function setValues(data: any, index: number){
        if(index === 0){
            setValue("AGENCIA", data.AGENCIA);
            setValue("CONTA", data.CONTA);
            setValue("NOME_BANCO", data.NOME_BANCO);
            setValue("NUMERO_CONTA", data.NUMERO_CONTA);
            setValue("HOSPEDE_idHOSPEDE", Number(pathname.substring(16)));
            setValue("idDADOS_BANCARIOS", data.idDADOS_BANCARIOS);
        }

        if(index === 1){
            setValue("AGENCIA2", data.AGENCIA);
            setValue("CONTA2", data.CONTA);
            setValue("NOME_BANCO2", data.NOME_BANCO);
            setValue("NUMERO_CONTA2", data.NUMERO_CONTA);
            setValue("HOSPEDE_idHOSPEDE2", Number(pathname.substring(16)));
            setValue("idDADOS_BANCARIOS2", data.idDADOS_BANCARIOS);
        }

        if(index === 2){
            setValue("AGENCIA3", data.AGENCIA);
            setValue("CONTA3", data.CONTA);
            setValue("NOME_BANCO3", data.NOME_BANCO);
            setValue("NUMERO_CONTA3", data.NUMERO_CONTA);
            setValue("HOSPEDE_idHOSPEDE3", Number(pathname.substring(16)));
            setValue("idDADOS_BANCARIOS3", data.idDADOS_BANCARIOS);
        }

    }

    async function handleDeleteBanco(id: number){
        const res = await deleteHospedeBanco(id, user.token);
        if(res.type == "SUCCESS"){
            router.push("/hospedes");
        }
    }

    async function handleDeleteSituacao(id: number){
        const res = await deleteHospedeSituacao(id, user.token);
        if(res.type == "SUCCESS"){
            router.push("/hospedes");
        }
    }

    async function onError(formErrors: FieldErrors<FormData>) {
        for (const value of Object.entries(formErrors)) {
            toast.error(value[1].message)
        }
    } 


    return(
        <div className="min-h-screen">
            <ContainerHospedes/>
            <div>
                <h1 className="text-center text-xl font-bold">Dados bancários do Hospede.</h1>
            </div>
            <div className="bg-white m-10 p-4 rounded-md shadow-md">
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                    <Toaster richColors/>
                    <div className="flex space-x-5" >
                        <label className="w-2/6">Nome do banco:
                            <input disabled={!canEdit} type="text" className="input" {...register("NOME_BANCO")}/>
                        </label>
                        <label className="w-2/6">Agência:
                            <input disabled={!canEdit} type="text" className="input" {...register("AGENCIA")}/>
                        </label>
                        <label>Conta:
                            <input disabled={!canEdit} type="text" className="input" {...register("CONTA")}/>
                        </label>
                        <label>Número da conta:
                            <input disabled={!canEdit} type="text" className="input" {...register("NUMERO_CONTA")}/>
                        </label>
                    </div>
                    <div className="my-4" hidden={!(hospedeData.length > 1)}>
                        <MyButton buttonText="Remover" buttonType="button" handleClick={() => { handleDeleteBanco(getValues("idDADOS_BANCARIOS")) }}/>
                    </div>
                    {(count >= 1 || hospedeData.length > 1) &&(
                        <div>
                            <div className="flex space-x-5 my-5">
                                <label className="w-2/6">Nome do banco:
                                    <input disabled={!canEdit2} type="text" className="input" {...register("NOME_BANCO2")}/>
                                </label>
                                <label className="w-2/6">Agência:
                                    <input disabled={!canEdit2} type="text" className="input" {...register("AGENCIA2")}/>
                                </label>
                                <label>Conta:
                                    <input disabled={!canEdit2} type="text" className="input" {...register("CONTA2")}/>
                                </label>
                                <label>Número da conta:
                                    <input disabled={!canEdit2} type="text" className="input" {...register("NUMERO_CONTA2")}/>
                                </label>
                            </div>
                            {hospedeData.length > 1 && (
                                <div className="my-4">
                                    <MyButton buttonText="Remover" buttonType="button" handleClick={() => { handleDeleteBanco(getValues("idDADOS_BANCARIOS2")) }}/>
                                </div>
                            )}
                        </div>
                    )}
                    {(count >= 2 || hospedeData.length > 2) &&  (
                         <div>
                            <div className="flex space-x-5 my-5">
                                <label className="w-2/6">Nome do banco:
                                    <input disabled={!canEdit2} type="text" className="input" {...register("NOME_BANCO3")}/>
                                </label>
                                <label className="w-2/6">Agência:
                                    <input disabled={!canEdit2} type="text" className="input" {...register("AGENCIA3")}/>
                                </label>
                                <label>Conta:
                                    <input disabled={!canEdit2} type="text" className="input" {...register("CONTA3")}/>
                                </label>
                                <label>Número da conta:
                                    <input disabled={!canEdit2} type="text" className="input" {...register("NUMERO_CONTA3")}/>
                                </label>
                            </div>
                            {hospedeData.length > 2 && (
                                <div className="my-4">
                                    <MyButton buttonText="Remover" buttonType="button" handleClick={() => { handleDeleteBanco(getValues("idDADOS_BANCARIOS3")) }}/>
                                </div>
                            )}
                        </div>
                    )}
                    <div>
                        <h1 className="font-bold">Situação Financeira</h1>
                        <textarea disabled={!canEdit} placeholder="Descrição" className="input w-full resize-none" rows={2} {...register("DESCRICAO")}/>
                    </div>
                    {/* <div className="my-4" hidden={!(hospedeData.length > 1)}>
                        <MyButton buttonText="Remover" buttonType="button" handleClick={() => { handleDeleteSituacao(getValues("idSITUACAO_FINANCEIRA")) }}/>
                    </div> */}
                    {count == 3 && (
                        <h1>Não é possivel incluir mais que 3 contas.</h1>
                    )}
                    <div className="flex justify-end space-x-2 m-3">
                        <MyButton buttonText="Editar" buttonType="button" handleClick={handleClick2}/>
                        {hospedeData.length != 3 && (
                            <MyButton buttonText="Incluir" buttonType="button" handleClick={handleClick} disable={count == 3}/>
                        )}
                        <MyButton buttonText="Enviar" buttonType="submit"/>
                    </div>
                </form>
            </div>
        </div>
    )
}