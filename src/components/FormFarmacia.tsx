"use client"
import { usePathname, useRouter } from "next/navigation";
import { MyButton } from "./MyButton";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import farmaciaService from "@/services/farmaciaService";
import { requiredString, requiredNumber } from "./ErroPreenchimento";
import { toast } from "sonner";

const priceRegex = /^\d+(?:[.,]\d{2})?$/;

const schema = yup.object({
    userId: yup.number(),
    name: requiredString('Nome obrigatório'),
    quantity: requiredNumber('Quantidade obrigatório','Deve conter apenas números'),
    unitValue: requiredString('Valor unitário obrigatório'),
    expireDate: requiredString('Data de valiadade obrigatório'),
    type: requiredString('Tipo obrigatório'),
});

type FormData = yup.InferType<typeof schema>;

interface IFormFarmaciaProps{
    type: string
    action: string
}

export function FormFarmacia({type, action}: IFormFarmaciaProps){
    const router = useRouter();
    const pathname = usePathname();
    const [canEdit, setCanEdit] = useState(false);
    const [dataBD, setDataBD] = useState();
    const { user } = useSelector((state) => state.auth);
    const { createMedicamento, createItem, getItemById, getMedicamentoById, editMedicamento, editItem } = farmaciaService;
 	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

    async function onSubmit(data: FormData){
        if(action == "CRIAR"){
            let res;
            if(type == "MEDICAMENTO"){
                res = await createMedicamento(data, user.token);
            }else{
                res = await createItem(data, user.token);
            }
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                router.push("/farmacia");
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
                createDate: dataBD.DATA_INCLUSAO.substring(0, 10),
                changeDate: changeDate,
                changeBy: data.userId,
                type: data.type,
            }
            let res;
            if(type == "MEDICAMENTO"){
                res = await editMedicamento(Number(pathname.substring(30)), dataToUpdate, user.token);
            }else{
                res = await editItem(Number(pathname.substring(23)), dataToUpdate, user.token);
            }
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                router.push("/farmacia");
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }

	};

    useEffect(() => {
        async function fetch(){
            if(type == "ITEM"){
                const res = await getItemById(Number(pathname.substring(23)), user.token);
                setDataBD(res.data[0]);
                setValues(res.data[0])
            } else{
                const res = await getMedicamentoById(Number(pathname.substring(30)), user.token);
                setDataBD(res.data[0]);
                setValues(res.data[0]);
            }
        }
        if(action == "CRIAR"){
            setCanEdit(!canEdit);
        }else{
            fetch();
        }
        
        setValue("userId", user.user.userId);
    }, [user, getItemById, getMedicamentoById]);

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
            <label className="flex flex-col">Nome do {type == "MEDICAMENTO" ? "medicamento" : "item"}:
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
            {type == "MEDICAMENTO" && (
                <label className="flex flex-col">Tipo:
                    <select disabled={!canEdit} className="input" {...register("type")}>
                        <option hidden={true}></option>
                        <option value="MEDICAMENTO">Medicamento</option>
                        <option value="VACINA">Vacina</option>
                    </select>
                    {errors.type && <span className="text-red-500">{errors.type.message}</span>}
                </label>
            )}
            {dataBD && (
                    <div className="my-5">
                        <label>Valor total:
                            <input readOnly={true} className="input" type="text" value={dataBD.VALOR_TOTAL}/>
                        </label>
                        <label>Data da inclusão:
                            <input readOnly={true} className="input" type="date" value={dataBD.DATA_INCLUSAO.substring(0, 10)} />
                        </label>
                        {dataBD.DATA_ALTERACAO && (
                            <label>Data da alteração:
                                <input readOnly={true} className="input" type="date" value={dataBD.DATA_ALTERACAO.substring(0, 10)} />
                            </label>
                        )}
                        <label>Alterado por:
                            <input readOnly={true} className="input" type="text" value={dataBD.ALTERADO_POR} />
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
            </div>
        </form>
    </div>
    )
}