"use client"
import cozinhaService from "@/services/cozinhaService";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { MyButton } from "./MyButton";
<<<<<<< HEAD
interface IEstoqueFormProps{ 
=======
import { requiredString, requiredNumber } from "./ErroPreenchimento";
import { toast } from "sonner";
interface IEstoqueFormProps{
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
    action: string
}
const priceRegex = /^\d+(?:[.,]\d{2})?$/;

const schema = yup.object({
    userId: yup.number(),
<<<<<<< HEAD
    name: yup.string().required('O nome é obrigatório'),
    quantity: yup.number().required('A quantidade é obrigatória'),
    unitValue: yup.string().required('O preço é obrigatório').matches(priceRegex, 'O preço deve ser um número'),
    expireDate: yup.string().required('A data de validade é obrigatória'),
    type: yup.string(),
=======
    name: requiredString('Nome obrigatório'),
    quantity: requiredNumber('Quantidade obrigatório','Deve conter apenas números'),
    unitValue: requiredString('Valor unitário obrigatório'),
    expireDate: requiredString('Data de valiadade obrigatório'),
    type: requiredString('Tipo obrigatório'),
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
});

type FormData = yup.InferType<typeof schema>;

export function EstoqueForm({action}: IEstoqueFormProps){
    const router = useRouter();
    const pathname = usePathname();
    const [canEdit, setCanEdit] = useState(false);
    const [mercadoriaData, setMercadoriaData] = useState();
    const { user } = useSelector((state) => state.auth);
    const { createMercadoria, getMercadoriaById, editMercadoria } = cozinhaService;
 	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

    async function onSubmit(data: FormData){
        if(action == "CRIAR"){
            const res = await createMercadoria(data, user.token);
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                router.push("/cozinha")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }else{
            //@ts-ignore
            const totalValue = data.unitValue * data.quantity;
            const changeDate = new Date().toISOString().split("T")[0]
            const dataToUpdate = {
                userId: data.userId,
                name: data.name,
                quantity: data.quantity,
                unitValue: data.unitValue,
                totalValue: totalValue,
                expireDate: data.expireDate,
                createDate: mercadoriaData.DATA_INCLUSAO.substring(0, 10),
                changeDate: changeDate,
                changeBy: data.userId,
                type: data.type,
            }
            const res = await editMercadoria(Number(pathname.substring(24)),dataToUpdate, user.token);
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                router.push("/cozinha")
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }
        
	};

    useEffect(() => {
        async function fetch(){
            const res = await getMercadoriaById(Number(pathname.substring(24)), user.token);
            setMercadoriaData(res.data[0]);
            setValues(res.data[0]);
        }
        setValue("userId", user.user.userId);
        if(action == "EDITAR"){
            fetch();
        }else{
            setCanEdit(!canEdit);
        }
    }, [user, getMercadoriaById]);

    function setValues(data: any){
        if(!data) return;
        setValue("name", data.NOME);
        setValue("expireDate", data.VALIDADE.substring(0, 10));
        setValue("quantity", data.QUANTIDADE);
        setValue("type", data.TIPO);
        setValue("unitValue", data.VALOR_UNITARIO);
    }
    
    return(
        <div className='bg-white p-5 rounded-md mb-20 shadow-lg m-10'>
            <form onSubmit={handleSubmit(onSubmit)}>
<<<<<<< HEAD
                <div>
                    <label>Nome da mercadoria:
                        <input disabled={!canEdit} className="input" type="text" {...register("name")} />
                    </label>
                    <span className="text-red-500">{errors.name?.message}</span>
                </div>
                <div>
                    <label>Quantidade:
                        <input disabled={!canEdit} className="input" type="number" {...register("quantity")} />
                    </label>
                    <span className="text-red-500">{errors.quantity?.message}</span>
                </div>
                <div>
                    <label>Valor unitário:
                        <input disabled={!canEdit} className="input" type="text" {...register("unitValue")}/>
                    </label>
                    <span className="text-red-500">{errors.unitValue?.message}</span>
                </div>
                <div>
                    <label>Data de validade:
                        <input disabled={!canEdit} className="input" type="date" {...register("expireDate")}/>
                    </label>
                    <span className="text-red-500">{errors.expireDate?.message}</span>
                </div>
=======
                <label className="flex flex-col">Nome da mercadoria:
                    <input disabled={!canEdit} className="input" type="text" {...register("name")} />
                    {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                </label>
                <label className="flex flex-col">Quantidade:
                    <input disabled={!canEdit} className="input" type="number" {...register("quantity")} />
                    {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span>}
                </label>
                <label className="flex flex-col">Valor unitário:
                    <input disabled={!canEdit} className="input" type="text" {...register("unitValue")}/>
                    {errors.unitValue && <span className="text-red-500">{errors.unitValue.message}</span>}
                </label>
                <label className="flex flex-col">Data de validade:
                    <input disabled={!canEdit} className="input" type="date" {...register("expireDate")}/>
                    {errors.expireDate && <span className="text-red-500">{errors.expireDate.message}</span>}
                </label>
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
                {mercadoriaData && (
                    <div className="my-5">
                        <label>Valor total:
                            <input readOnly={true} className="input" type="text" value={mercadoriaData.VALOR_TOTAL}/>
                        </label>
                        <label>Data da inclusão:
                            <input readOnly={true} className="input" type="date" value={mercadoriaData.DATA_INCLUSAO.substring(0, 10)} />
                        </label>
                        {mercadoriaData.DATA_ALTERACAO && (
                            <label>Data da alteração:
                                <input readOnly={true} className="input" type="date" value={mercadoriaData.DATA_ALTERACAO.substring(0, 10)} />
                            </label>
                        )}
                        <label>Alterado por:
                            <input readOnly={true} className="input" type="text" value={mercadoriaData.ALTERADO_POR} />
                        </label>
                    </div>
                )}
                <div className='flex space-x-2 items-center justify-end m-4'>
                    {action == "CRIAR" ? (
                        <MyButton buttonText="Cadastrar" buttonType="submit"/>
                    ): (
                        <>
                            <MyButton buttonText="Editar" buttonType="button" handleClick={() => setCanEdit(!canEdit)}/>
                            <MyButton buttonText="Salvar" buttonType="submit"/>
                        </>
                    )}
                    <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="button">
                        <Link href="/cozinha/estoque">Voltar</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}