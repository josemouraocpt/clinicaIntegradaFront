"use client"

interface IDadosBasicosProps{
    register: any
    statusList: any
    canEdit: boolean
    errors: any
}

<<<<<<< HEAD
export function DadosBasicos({register, statusList, canEdit, errors}: IDadosBasicosProps){
=======
export function DadosBasicos({register, statusList, canEdit, errors }: IDadosBasicosProps){
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
    return(
        <div>
            <h1 className="font-bold">Dados Básicos</h1>
            <div className="flex flex-col space-y-3">
                <div className="flex space-x-5">
<<<<<<< HEAD
                    <div>
                        <label className="w-1/4">Nome completo:
                            <input disabled={!canEdit} type="text" className="input" {...register("nome")}/>
                        </label>
                        <span className="text-red-500">{errors.nome?.message}</span>
                    </div>
                    <label>Apelido:
=======
                    <label className="w-1/4">Nome completo:
                        <input disabled={!canEdit} type="text" className="input" {...register("nome")}/>
                        {errors.nome && <span className="text-red-500">{errors.nome.message}</span>}
                    </label>
                    <label>Apelido(Opcional):
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
                        <input disabled={!canEdit} type="text" className="input" {...register("apelido")}/>
                    </label>
                    <label>Nome Social (Opcional):
                        <input disabled={!canEdit} type="text" className="input" {...register("nomeSocial")}/>
                    </label>
                    <label>Nacionalidade:
                        <input disabled={!canEdit} type="text" className="input" {...register("nacionalidade")}/>
                        {errors.nacionalidade && <span className="text-red-500">{errors.nacionalidade.message}</span>}
                    </label>
                    <label>Naturalidade:
                        <input disabled={!canEdit} type="text" className="input" {...register("naturalidade")}/>
                        {errors.naturalidade && <span className="text-red-500">{errors.naturalidade.message}</span>}
                    </label>
                </div>
                <div className="flex space-x-5">
                    <label className="w-1/4">Nome do Pai:
                        <input disabled={!canEdit} type="text" className="input" {...register("nomePai")}/>
                        {errors.nomePai && <span className="text-red-500">{errors.nomePai.message}</span>}
                    </label>
                    <label className="w-1/4">Nome da Mãe:
                        <input disabled={!canEdit} type="text" className="input" {...register("nomeMae")}/>
                        {errors.nomeMae && <span className="text-red-500">{errors.nomeMae.message}</span>}
                    </label>
<<<<<<< HEAD
                    <div>
                        <label>CPF:
                            <input disabled={!canEdit} type="text" className="input" {...register("cpf")}/>
                        </label>
                        <span className="text-red-500">{errors.cpf?.message}</span>
                    </div>
                    <div>
                        <label>RG:
                            <input disabled={!canEdit} type="text" className="input" {...register("rg")}/>
                        </label>
                        <span className="text-red-500">{errors.rg?.message}</span>
                    </div>
                </div>

                <div className="flex space-x-5">
                    <div>
                        <label>Data de Nascimento:
                            <input disabled={!canEdit} type="date" className="input" {...register("dataNascimento")}/>
                        </label>
                        <span className="text-red-500">{errors.dataNascimento?.message}</span>
                    </div>
                    <div>
                        <label>Telefone:
                            <input disabled={!canEdit} type="text" className="input" {...register("telefone")}/>
                        </label>
                        <span className="text-red-500">{errors.telefone?.message}</span>
                    </div>
=======
                    <label>CPF:
                        <input disabled={!canEdit} type="text" className="input" {...register("cpf")}/>
                        {errors.cpf && <span className="text-red-500">{errors.cpf.message}</span>}
                    </label>
                    <label>RG:
                        <input disabled={!canEdit} type="text" className="input" {...register("rg")}/>
                        {errors.rg && <span className="text-red-500">{errors.rg.message}</span>}
                    </label>
                </div>

                <div className="flex space-x-5">
                    <label>Data de Nascimento:
                        <input disabled={!canEdit} type="date" className="input" {...register("dataNascimento")}/>
                        {errors.dataNascimento && <span className="text-red-500">{errors.dataNascimento.message}</span>}
                    </label>
                    <label>Telefone:
                        <input disabled={!canEdit} type="text" className="input" {...register("telefone")}/>
                        {errors.telefone && <span className="text-red-500">{errors.telefone.message}</span>}
                    </label>
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
                    <label>Estado civil:
                        <select disabled={!canEdit} className="input" {...register("estadoCivil")}>
                            <option hidden={true}></option>
                            <option value="Solteiro(a)">Solteiro(a)</option>
                            <option value="Casado(a)">Casado(a)</option>
                            <option value="Divorciado(a)">Divorciado(a)</option>
                            <option value="Viúvo(a)">Viúvo(a)</option>
                            <option value="Separado(a)">Separado(a)</option>
                        </select>
                        {errors.estadoCivil && <span className="text-red-500">{errors.estadoCivil.message}</span>}
                    </label>
                    <label>Profissão:
                        <input disabled={!canEdit} type="text" className="input" {...register("profissao")}/>
                        {errors.profissao && <span className="text-red-500">{errors.profissao.message}</span>}
                    </label>
<<<<<<< HEAD
                    <div>
                        <label>Título de Eleitor:
                            <input disabled={!canEdit} type="text" className="input" {...register("tituloEleitor")}/>
                        </label>
                        <span className="text-red-500">{errors.tituloEleitor?.message}</span>
                    </div>
=======
                    <label>Título de Eleitor:
                        <input disabled={!canEdit} type="text" className="input" {...register("tituloEleitor")}/>
                        {errors.tituloEleitor && <span className="text-red-500">{errors.tituloEleitor.message}</span>}
                    </label>
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
                </div>
            </div>
            <div className="flex mt-4">
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-col space-y-3">
                        <h1 className="font-bold">Endereços</h1>
                        <div className="flex space-x-5">
                           <div>
                            <label>CEP:
<<<<<<< HEAD
                                    <input disabled={!canEdit} type="text" className="input" {...register("cep")}/>
                                </label>
                                <span className="text-red-500">{errors.cep?.message}</span>
                           </div>
=======
                                <input disabled={!canEdit} type="text" className="input" {...register("cep")}/>
                                {errors.cep && <span className="text-red-500">{errors.cep.message}</span>}
                            </label>
>>>>>>> 7499ada62195a360a81930dd9459bbd8e3b996eb
                            <label className="w-3/4">Endereço:
                                <input disabled={!canEdit} type="text" className="input" {...register("endereco")}/>
                                {errors.endereco && <span className="text-red-500">{errors.endereco.message}</span>}
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
                                {errors.uf && <span className="text-red-500">{errors.uf.message}</span>}
                            </label>
                            <label>Cidade:
                                <input disabled={!canEdit} type="text" className="input" {...register("cidade")}/>
                                {errors.cidade && <span className="text-red-500">{errors.cidade.message}</span>}
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
    )
}