'use client'
import * as yup from "yup";
import { MyButton } from "./MyButton";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import farmaciaService from "@/services/farmaciaService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { requiredString } from "./ErroPreenchimento";
import { toast } from "sonner";

const schema = yup.object({
    idStock: requiredString('Medicamento no estoque obrigatório'), 
    idSupplier: requiredString('Fornecedores obrigatório'),
    name: requiredString('Nome obrigatório'),
    dosage: requiredString('Dosagem obrigatório'), 
    expireDate: requiredString('Data de validade obrigatório'), 
    batch: requiredString('Número do lote obrigatório'), 
    fabricationDate: requiredString('Data de fabricação obrigatório'), 
    crafter: requiredString('Fabricante obrigatório'),
    storageType: requiredString('Tipo de armazenamento obrigatório'),
    storageCondition: requiredString('Condição de armazenamento obrigatório'),
    changeBy: yup.number()
});

type FormData = yup.InferType<typeof schema>;

interface ICadastroVacinaProps{
    action: string
}
export default function CadastroVacina({action}: ICadastroVacinaProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { user } = useSelector((state) => state.auth);
    const { createVacina, getFornecedores, getVacinasEstoque, getVacinaById, editVacina } = farmaciaService;
    const [medicamentos, setMedicamentos] = useState();
    const [fornecedores, setFornecedores] = useState();
    const [canEdit, setCanEdit] = useState(false);
 	const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>({
		resolver: yupResolver(schema)
	});

    async function onSubmit(data: FormData){
        if(action == "CRIAR"){
            const res = await createVacina(data, user.token)
            if(res.type == "SUCCESS"){
                toast.success("Ação realizada com sucesso!");{}
                router.push("/farmacia");
            } else {
                toast.error("Algo não está certo.Tente novamente!");
                return;
            }
        }else{
            const changeDate = new Date().toISOString().split("T")[0]
            const dataToUpdate = {
                idStock: data.idStock,
                idSupplier: data.idSupplier,
                name: data.name,
                dosage: data.dosage,
                expireDate: data.expireDate,
                batch: data.batch,
                fabricationDate: data.fabricationDate,
                crafter: data.crafter,
                storageType: data.storageType,
                storageCondition: data.storageCondition,
                changeDate: changeDate,
                changeBy: user.user.userId
            }
            const res = await editVacina(Number(pathname.substring(25)), dataToUpdate, user.token)
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
            const res1 = await getFornecedores(user.token);
            const res2 = await getVacinasEstoque(user.token);
            setFornecedores(res1.data);
            setMedicamentos(res2.data);
            if(action == "EDITAR"){
                const res3 = await getVacinaById(Number(pathname.substring(25)), user.token);
                setValues(res3.data[0])
            }
        }
        fetch();
        if(action == "CRIAR"){
            setCanEdit(!canEdit);
        }
        setValue("changeBy", user.user.userId)
    }, [user, getFornecedores, getVacinasEstoque, getVacinaById]);

    function setValues(data: any){
        setValue("idStock", data.ESTOQUE_idESTOQUE);
        setValue("idSupplier", data.FORNECEDOR_idFORNECEDOR);
        setValue("name", data.NOME);
        setValue("dosage", data.DOSAGEM);
        setValue("expireDate", data.VALIDADE.substring(0, 10));
        setValue("batch", data.LOTE);
        setValue("fabricationDate", data.DATA_FABRICACAO.substring(0, 10));
        setValue("crafter", data.FABRICANTE);
        setValue("storageType", data.TIPO_ARMAZENAMENTO);
        setValue("storageCondition", data.CONDICAO_ARMAZENAMENTO);
    }

    return (
        <div className='p-10'>
            <div className='m-4'>
                <h2 className='text-2xl text-center'>Insira <span className="text-red-500">todos</span> os dados necessários</h2>
                {action == "CRIAR" && (
                    <h3 className='text-xl text-center'>Para cadastrar uma vacina é necessário cadastrar o medicamento antes!</h3>
                )}
            </div>
            <div className='bg-white p-5 rounded-md mb-20 shadow-lg'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <label>Nome da vacina:
                            <input disabled={!canEdit} type="text" className='input' {...register("name")}/>
                            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                        </label>
                        <label>Fabricante:
                            <input disabled={!canEdit} type="text" className='input' {...register("crafter")}/>
                            {errors.crafter && <span className="text-red-500">{errors.crafter.message}</span>}
                        </label>
                        <label>Dosagem:
                            <input disabled={!canEdit} type="text" className='input' {...register("dosage")}/>
                            {errors.dosage && <span className="text-red-500">{errors.dosage.message}</span>}
                        </label>
                        <label>Data de Validade:
                            <input disabled={!canEdit} type="date" className='input' {...register("expireDate")}/>
                            {errors.expireDate && <span className="text-red-500">{errors.expireDate.message}</span>}
                        </label>
                        <label>Tipo de armazenamento:
                            <input disabled={!canEdit} type="text" className='input' {...register("storageType")}/>
                            {errors.storageType && <span className="text-red-500">{errors.storageType.message}</span>}
                        </label>
                        <label>Número do lote:
                            <input disabled={!canEdit} type="text" className='input' {...register("batch")}/>
                            {errors.batch && <span className="text-red-500">{errors.batch.message}</span>}
                        </label>
                        <label>Condição de armazenamento:
                            <input disabled={!canEdit} type="text" className='input' {...register("storageCondition")}/>
                            {errors.storageCondition && <span className="text-red-500">{errors.storageCondition.message}</span>}
                        </label>
                        <label>Data da fabricação:
                            <input disabled={!canEdit} type="date" className='input' {...register("fabricationDate")}/>
                            {errors.fabricationDate && <span className="text-red-500">{errors.fabricationDate.message}</span>}
                        </label>
                        <label>Medicamento no estoque:
                            <select className="input" {...register("idStock")} disabled={!canEdit}>
                                <option hidden={true}></option>
                                {medicamentos && (
                                    //@ts-ignore
                                    medicamentos.map((medicamento) => (
                                        <option value={medicamento.idESTOQUE} key={medicamento.idESTOQUE}>{medicamento.NOME}</option>
                                    ))
                                )}
                            </select>
                            {errors.idStock && <span className="text-red-500">{errors.idStock.message}</span>}
                        </label>
                        <label>Fornecedores:
                            <select className="input" {...register("idSupplier")} disabled={!canEdit}>
                                <option hidden={true}></option>
                                {fornecedores && (
                                    //@ts-ignore
                                    fornecedores.map((fornecedor) => (
                                        <option value={fornecedor.idFORNECEDOR} key={fornecedor.idFORNECEDOR}>{fornecedor.NOME}</option>
                                    ))
                                )}
                            </select>
                            {errors.idSupplier && <span className="text-red-500">{errors.idSupplier.message}</span>}
                        </label>
                    </div>
                    <div className='flex space-x-2 items-center justify-end my-2'>   
                        {action == "EDITAR" ? (
                            <>
                                <MyButton buttonText="Editar" buttonType="button" handleClick={() => setCanEdit(!canEdit)}/>
                                <MyButton buttonText="Salvar" buttonType="submit"/>
                            </>
                        ) : (
                            <MyButton buttonText="Cadastrar" buttonType="submit"/>
                        )}
                    </div>
                </form>
            </div>
        </div>

    );
}
