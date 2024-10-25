"use client";
interface IDadosBancariosProps{
    register: any
    canEdit: boolean
}

export function DadosBancarios({register, canEdit}:IDadosBancariosProps){
    return(
        <div>
            <div className="flex flex-col space-y-3">
                <h1 className="font-bold">Dados Bancários</h1>
                <div className="flex space-x-5">
                    <label className="w-2/6">Nome do banco:
                        <input disabled={!canEdit} type="text" className="input" {...register("nomeBanco")}/>
                    </label>
                    <label className="w-2/6">Agência:
                        <input disabled={!canEdit} type="text" className="input" {...register("agencia")}/>
                    </label>
                    <label>Conta:
                        <input disabled={!canEdit} type="text" className="input" {...register("conta")}/>
                    </label>
                    <label>Número da conta:
                        <input disabled={!canEdit} type="text" className="input" {...register("numConta")}/>
                    </label>
                </div>      
                <div>
                    <h1 className="font-bold">Situação Financeira</h1>
                    <textarea disabled={!canEdit} placeholder="Descrição" className="input w-full resize-none" rows={2} {...register("situacaoFinanceiraDesc")}/>
                </div>
            </div>
        </div>
    )
}