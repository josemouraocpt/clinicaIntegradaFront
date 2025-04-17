"use client";
interface IDadosBancariosProps{
    register: any
    canEdit: boolean
    errors: any
}

export function DadosBancarios({register, canEdit, errors}:IDadosBancariosProps){
    return(
        <div>
            <div className="flex flex-col space-y-3">
                <h1 className="font-bold">Dados Bancários</h1>
                <div className="flex space-x-5">
                    <label className="w-2/6">Nome do banco:
                        <input disabled={!canEdit} type="text" className="input" {...register("nomeBanco")}/>
                        {errors.nomeBanco && <span className="text-red-500">{errors.nomeBanco.message}</span>}
                    </label>
                    <label className="w-2/6">Agência:
                        <input disabled={!canEdit} type="text" className="input" {...register("agencia")}/>
                        {errors.agencia && <span className="text-red-500">{errors.agencia.message}</span>}
                    </label>
                    <label>Número da conta:
                        <input disabled={!canEdit} type="text" className="input" {...register("numConta")}/>
                        {errors.numConta && <span className="text-red-500">{errors.numConta.message}</span>}
                    </label>
                </div>      
                <div>
                    <h1 className="font-bold">Situação Financeira</h1>
                    <textarea disabled={!canEdit} placeholder="Descrição" className="input w-full resize-none" rows={2} {...register("situacaoFinanceiraDesc")}/>
                    {errors.situacaoFinanceiraDesc && <span className="text-red-500">{errors.situacaoFinanceiraDesc.message}</span>}
                </div>
            </div>
        </div>
    )
}