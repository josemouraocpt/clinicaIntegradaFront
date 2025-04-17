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
import { requiredString, requiredNumber } from "./ErroPreenchimento";
import { toast } from "sonner";
interface IEstoqueFormProps{
    action: string
}
const priceRegex = /^\d+(?:[.,]\d{2})?$/;

const schema = yup.object({
    userId: yup.number(),
    name: requiredString('Nome obrigatório'),
    quantity: requiredNumber('Quantidade obrigatório','Deve conter apenas números'),
    unitValue: requiredString('Valor unitário obrigatório'),
    expireDate: requiredString('Data de valiadade obrigatório'),
    type: yup.string(),
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