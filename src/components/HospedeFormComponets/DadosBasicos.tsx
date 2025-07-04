"use client"

interface IDadosBasicosProps{
    register: any
    statusList: any
    canEdit: boolean
    errors: any
}

export function DadosBasicos({register, statusList, canEdit, errors }: IDadosBasicosProps){
    return(
        <div>
            <h1 className="font-bold">Dados Básicos</h1>
            <div className="flex flex-col space-y-3">
                <div className="flex space-x-5">
                    <label className="w-1/4">Nome completo:
                        <input disabled={!canEdit} type="text" className="input" {...register("nome")}/>
                    </label>
                    <label>Apelido(Opcional):
                        <input disabled={!canEdit} type="text" className="input" {...register("apelido")}/>
                    </label>
                    <label>Nome Social (Opcional):
                        <input disabled={!canEdit} type="text" className="input" {...register("nomeSocial")}/>
                    </label>
                    <label>Nacionalidade:
                        <input disabled={!canEdit} type="text" className="input" {...register("nacionalidade")}/>
                    </label>
                    <label>Naturalidade:
                        <input disabled={!canEdit} type="text" className="input" {...register("naturalidade")}/>
                    </label>
                </div>
                <div className="flex space-x-5">
                    <label className="w-1/4">Nome do Pai:
                        <input disabled={!canEdit} type="text" className="input" {...register("nomePai")}/>
                    </label>
                    <label className="w-1/4">Nome da Mãe:
                        <input disabled={!canEdit} type="text" className="input" {...register("nomeMae")}/>
                    </label>
                    <label>CPF:
                        <input disabled={!canEdit} type="text" className="input" {...register("cpf")}/>
                    </label>
                    <label>RG:
                        <input disabled={!canEdit} type="text" className="input" {...register("rg")}/>
                    </label>
                </div>

                <div className="flex space-x-5">
                    <label>Data de Nascimento:
                        <input disabled={!canEdit} type="date" className="input" {...register("dataNascimento")}/>
                    </label>
                    <label>Telefone:
                        <input disabled={!canEdit} type="text" className="input" {...register("telefone")}/>
                    </label>
                    <label>Estado civil:
                        <select disabled={!canEdit} className="input" {...register("estadoCivil")}>
                            <option hidden={true}></option>
                            <option value="Solteiro(a)">Solteiro(a)</option>
                            <option value="Casado(a)">Casado(a)</option>
                            <option value="Divorciado(a)">Divorciado(a)</option>
                            <option value="Viúvo(a)">Viúvo(a)</option>
                            <option value="Separado(a)">Separado(a)</option>
                        </select>
                    </label>
                    <label>Profissão:
                        <input disabled={!canEdit} type="text" className="input" {...register("profissao")}/>
                    </label>
                    <label>Título de Eleitor:
                        <input disabled={!canEdit} type="text" className="input" {...register("tituloEleitor")}/>
                    </label>
                </div>
            </div>
            <div className="flex mt-4">
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-col space-y-3">
                        <h1 className="font-bold">Endereços</h1>
                        <div className="flex space-x-5">
                           <div>
                            <label>CEP:
                                <input disabled={!canEdit} type="text" className="input" {...register("cep")}/>
                            </label>
                            <label className="w-3/4">Endereço:
                                <input disabled={!canEdit} type="text" className="input" {...register("endereco")}/>
                            </label>
                            <label>Estado:
                                <select disabled={!canEdit} className="input" {...register("uf")}>
                                    <option hidden={true}></option>
                                    <option value="AC">Acre</option>																	
                                    <option value="AL">Alagoas</option>
                                    <option value="AP">Amapá</option>
                                    <option value="AM">Amazonas</option>
                                    <option value="BA">Bahia</option>
                                    <option value="CE">Ceará</option>
                                    <option value="DF">Distrito Federal</option>
                                    <option value="ES">Espírito Santo</option>
                                    <option value="GO">Goiás</option>
                                    <option value="MA">Maranhão</option>
                                    <option value="MT">Mato Grosso</option>
                                    <option value="MS">Mato Grosso do Sul</option>
                                    <option value="MG">Minas Gerais</option>
                                    <option value="PA">Pará</option>
                                    <option value="PB">Paraíba</option>
                                    <option value="PR">Paraná</option>
                                    <option value="PE">Pernambuco</option>
                                    <option value="PI">Piauí</option>
                                    <option value="RJ">Rio de Janeiro</option>
                                    <option value="RN">Rio Grande do Norte</option>
                                    <option value="RS">Rio Grande do Sul</option>
                                    <option value="RO">Rondônia</option>
                                    <option value="RR">Roraima</option>
                                    <option value="SC">Santa Catarina</option>
                                    <option value="SP">São Paulo</option>
                                    <option value="SE">Sergipe</option>
                                    <option value="TO">Tocantins</option>
                                </select>
                            </label>
                            <label>Cidade:
                                <input disabled={!canEdit} type="text" className="input" {...register("cidade")}/>
                            </label>
                        </div>
                    </div>
                    <div className="flex space-x-8">
                        <div>
                            <h1 className="font-bold">Data Entrada</h1>
                            <div className="flex space-x-5">
                                <label>Data:
                                    <input disabled={!canEdit} type="date" className="input" {...register("dataEntrada")}/>
                                
                                </label>
                            </div>
                            <span className="text-red-500">{errors.dataEntrada?.message}</span>
                        </div>
                        <div>
                            <h1 className="font-bold">Status do hospede</h1>
                            <div className="flex space-x-5">
                                <label>Status:
                                    <select disabled={!canEdit} className="input" {...register("hospedeStatus")}>
                                        <option hidden={true}></option>
                                        {statusList.map((status) => (
                                            <option value={status.STATUS_VALUE} key={status.STATUS_VALUE}>{status.STATUS_DESCRIPTION}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>
                            <span className="text-red-500">{errors.hospedeStatus?.message}</span>
                        </div>
                    </div>
                </div>
            </div>
     
        </div>
        </div>
    )
}