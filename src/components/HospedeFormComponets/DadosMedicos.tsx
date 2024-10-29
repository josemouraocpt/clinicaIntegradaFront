"use client";

interface IDadosMedicosProp{
    register: any
    canEdit: boolean
    errors:any
}

export function DadosMedicos({register, canEdit,errors}: IDadosMedicosProp){
    return(
        <div>
            <div className="flex flex-col space-y-3">
                <h1 className="font-bold">Dados Médicos</h1>
                <div>
                    <div className="mt-4 flex flex-col">
                        <h2 className="font-bold">Grau de dependência</h2>
                        <p className="text-sm">Sobre o grau de dependência do hospede, por favor, informe: </p>
                        <div className="space-x-3">
                            <select disabled={!canEdit} className="input" {...register("grauDependencia")}>
                                <option hidden={true}></option>
                                <option value="1">1 - Pouco dependente</option>
                                <option value="2">2 - Dependente</option>
                                <option value="3">3 - Muito dependente</option>
                            </select>
                        </div>
                        <small className="text-sm opacity-50">** 1 (Pouco dependente), 2 (Dependente), 3 (Muito dependente)</small>
                        {errors.grauDependencia && <span className="text-red-500">{errors.grauDependencia.message}</span>}
                    </div>
                    <div>
                        <h2 className="font-bold">Histórico de Medicamentos</h2>
                        <p>Informe os medicamentos que o hospede já utiliza:</p>
                        <div className="flex space-x-3">
                            <label>Nome do Medicamento:
                                <input disabled={!canEdit} type="text" className="input" {...register("nomeMedicamento")} />
                            </label>
                            <label>Frequência do Medicamento:
                                <input disabled={!canEdit} type="text" className="input"  {...register("freqMedicamento")}/>
                            </label>
                            <label>Tempo de Uso:
                                <input disabled={!canEdit} type="text" className="input"  {...register("tempoMedicamento")}/>
                            </label>
                            <label>Dosagem:
                                <input disabled={!canEdit} type="text" className="input"{...register("dosagemMedicamento")} />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-bold">Observações</h2>
                        <label>Observações:
                            <textarea disabled={!canEdit} placeholder="Descrição" className="input w-full resize-none" rows={2} {...register("observacoeMedicamento")} />
                        </label>
                    </div>
                </div>
                <div>
                    <h2 className="font-bold">Doenças, Alergias e Dietas</h2>
                    <div>
                        <p>Informe as doenças e complicações do hospede</p>
                        <div className="flex flex-col">
                            <label className="w-2/5">Tipo:
                                <select disabled={!canEdit} className="input" {...register("tipoComplicacao")} >
                                    <option hidden={true}></option>
                                    <option value="alergia">Alergia</option>
                                    <option value="doenca">Doença</option>
                                    <option value="dieta">Dieta</option>
                                </select>
                            </label>
                            <label className="w-2/5">Descrição:
                                <input disabled={!canEdit} type="text" className="input" {...register("descComplicacao")}/>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}