"use client";

interface IDadosHospedagemProps{
    register: any
    statusList: any
    canEdit: boolean
    errors: any
}


export function DadosHospedagem({register, statusList, canEdit,errors}: IDadosHospedagemProps){
    return(
        <div>
            <div className="flex flex-col space-y-3">
                <h1 className="font-bold">Hospedagem</h1>
                <div>
                    <h2 className="font-bold">Informações do quarto</h2>
                    <p className="text-sm">Por favor, selecione um quarto disponível:</p>
                    <label>Número do Quarto:
                        <input disabled={!canEdit} type="text" className="input" {...register("quarto")}/>
                        {errors.quarto && <span className="text-red-500">{errors.quarto.message}</span>}
                    </label>
                    <span className="text-red-500">{errors.quarto?.message}</span>
                </div>
                <div>
                    <h2 className="font-bold">Informações do leito</h2>
                    <p className="text-sm">Por favor, selecione um leito disponível:</p>
                    <label>Número do Leito: 
                        <input disabled={!canEdit} type="text" className="input" {...register("leito")}/>
                        {errors.leito && <span className="text-red-500">{errors.leito.message}</span>}
                    </label>
                    <span className="text-red-500">{errors.leito?.message}</span>
                </div>
                <div>
                    <h2 className="font-bold">Informações adicionais</h2>
                    <p className="text-sm">Deseja adicionar informações sobre o hospede? </p>
                    <textarea disabled={!canEdit} className="input resize-none" rows={2} {...register("hospedagemInfo")}></textarea>
                </div>
                <div>
                    <label>Status:
                        <select disabled={!canEdit} className="input" {...register("hospedagemStatus")}>
                            <option hidden={true}></option>
                            {statusList.map((status) => (
                                <option value={status.STATUS_VALUE} key={status.STATUS_VALUE}>{status.STATUS_DESCRIPTION}</option>
                            ))}
                        </select>
                    </label>
                    <span className="text-red-500">{errors.hospedagemStatus?.message}</span>
                </div>
            </div>
        </div>
    )
}