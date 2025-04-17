'use client'
import * as yup from "yup";
import { MyButton } from "./MyButton";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import farmaciaService from "@/services/farmaciaService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

const schema = yup.object({
    idStock: yup.number().required('O medicamento é obrigatório'),  
    idSupplier: yup.number().required('O fornecedor é obrigatório'), 
    name: yup.string().required('O nome é obrigatório'), 
    dosage: yup.string().required('A dosagem é obrigatória'), 
    expireDate: yup.string().required('A data de validade é obrigatória'), 
    batch: yup.string().required('O lote é obrigatório'), 
    fabricationDate: yup.string().required('A data de fabricação é obrigatória'), 
    crafter: yup.string().required('O fabricante é obrigatório'), 
    storageType: yup.string().required('O tipo de armazenamento é obrigatório'), 
    storageCondition: yup.string().required('A condiçaõ de armazenamento é obrigatório'),
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
                router.push("/farmacia");
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
                router.push("/farmacia");
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
                        <div>
                            <label>Nome da vacina:
                                <input disabled={!canEdit} type="text" className='input' {...register("name")}/>
                            </label>
                            <span className="text-red-500">{errors.name?.message}</span>
                        </div>
                        <div>
                            <label>Fabricante:
                                <input disabled={!canEdit} type="text" className='input' {...register("crafter")}/>
                            </label>
                            <span className="text-red-500">{errors.crafter?.message}</span>
                        </div>
                        <div>
                            <label>Dosagem:
                                <input disabled={!canEdit} type="text" className='input' {...register("dosage")}/>
                            </label>
                            <span className="text-red-500">{errors.dosage?.message}</span>
                        </div>
                        <div>
                            <label>Data de Validade:
                                <input disabled={!canEdit} type="date" className='input' {...register("expireDate")}/>
                            </label>
                            <span className="text-red-500">{errors.expireDate?.message}</span>
                        </div>
                        <div>
                            <label>Tipo de armazenamento necessário:
                                <input disabled={!canEdit} type="text" className='input' {...register("storageType")}/>
                            </label>
                            <span className="text-red-500">{errors.storageType?.message}</span>
                        </div>
                        <div>
                            <label>Número do lote:
                                <input disabled={!canEdit} type="text" className='input' {...register("batch")}/>
                            </label>
                            <span className="text-red-500">{errors.batch?.message}</span>
                        </div>
                        <div>
                            <label>Condição de armazenamento:
                                <input disabled={!canEdit} type="text" className='input' {...register("storageCondition")}/>
                            </label>
                            <span className="text-red-500">{errors.storageCondition?.message}</span>
                        </div>
                        <div>
                            <label>Data da fabricação:
                                <input disabled={!canEdit} type="date" className='input' {...register("fabricationDate")}/>
                            </label>
                            <span className="text-red-500">{errors.fabricationDate?.message}</span>
                        </div>
                        <div>
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
                            </label>
                            <span className="text-red-500">{errors.idStock?.message}</span>
                        </div>
                        <div>
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
                            </label>
                            <span className="text-red-500">{errors.idSupplier?.message}</span>
                        </div>
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
