'use client'

async function getHospedes(token: string) {
    try {
        const res = await fetch('http://localhost:3001/hospedes', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createHospedeFull(data: any,  token: string){
    try {
        const dataToSend = {
            remediosData: {
                nome: data.nomeMedicamento,
                frequenciaUso: data.freqMedicamento,
                tempoUso: data.tempoMedicamento,
                dosagem: data.dosagemMedicamento
            },
            doencasAlergiasDietasData: {
                tipo: data.tipoComplicacao,
                descricao: data.descComplicacao
            },
            dadosMedicosData: {
                grauDependencia: data.grauDependencia,
                obervacoes: data.observacoeMedicamento, 
            },
            hospedeData: {
                nomeCompleto: data.nome,
                nomeSocial: data.nomeSocial,
                apelido: data.apelido,
                rg: data.rg,
                cpf: data.cpf,
                nacionalidade: data.nacionalidade,
                naturalidade: data.naturalidade,
                estadoCivil: data.estadoCivil,
                dataNascimento: data.dataNascimento,
                nomeMae: data.nomeMae,
                nomePai: data.nomePai,
                telefone: data.telefone,
                profissao: data.profissao,
                tituloEleitor: data.tituloEleitor,
                endereco: data.endereco,
                cidade: data.cidade,
                uf: data.uf,
                cep: data.cep,
                dataEntrada: data.dataEntrada,
                responsavel: data.responsavel,
                status: data.hospedeStatus
            },
            dadosBancariosData: {
                conta: 1,
                nomeBanco: data.nomeBanco,
                agencia: data.agencia,
                numeroConta: data.numConta
            },
            situacaoFinanceiraData: {
                descricao: data.situacaoFinanceiraDesc,
            },
            hospedagemData: {
                quarto: data.quarto,
                leito: data.leito,
                informacoes: data.hospedagemInfo,
                status: data.hospedagemStatus
            },
            anexosData: {
                descricao: data.descAnexo,
                file: data.anexo
            }
        }
        
        const res = await fetch('http://localhost:3001/hospedes/criar', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(dataToSend)
        });

        const response = await res.json();

        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getHospedeById(hospedeId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/hospedes/${hospedeId}`, {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function editHospedeById(hospedeId:number, data:any, token: string) {
    try {
        const dataToSend = {
            remediosData: {
                id: data.idREMEDIOS,
                nome: data.nomeMedicamento,
                frequenciaUso: data.freqMedicamento,
                tempoUso: data.tempoMedicamento,
                dosagem: data.dosagemMedicamento
            },
            doencasAlergiasDietasData: {
                id: data.idDOENCAS_ALERGIAS_DIETAS,
                tipo: data.tipoComplicacao,
                descricao: data.descComplicacao
            },
            dadosMedicosData: {
                id: data.idDADOS_MEDICOS,
                grauDependencia: data.grauDependencia,
                obervacoes: data.observacoeMedicamento, 
            },
            hospedeData: {
                id: hospedeId,
                nomeCompleto: data.nome,
                nomeSocial: data.nomeSocial,
                apelido: data.apelido,
                rg: data.rg,
                cpf: data.cpf,
                nacionalidade: data.nacionalidade,
                naturalidade: data.naturalidade,
                estadoCivil: data.estadoCivil,
                dataNascimento: data.dataNascimento,
                nomeMae: data.nomeMae,
                nomePai: data.nomePai,
                telefone: data.telefone,
                profissao: data.profissao,
                tituloEleitor: data.tituloEleitor,
                endereco: data.endereco,
                cidade: data.cidade,
                uf: data.uf,
                cep: data.cep,
                dataEntrada: data.dataEntrada,
                responsavel: data.responsavel,
                status: data.hospedeStatus
            },
            dadosBancariosData: {
                id: data.idDADOS_BANCARIOS,
                conta: data.conta,
                nomeBanco: data.nomeBanco,
                agencia: data.agencia,
                numeroConta: data.numConta
            },
            situacaoFinanceiraData: {
                descricao: data.situacaoFinanceiraDesc,
                id: data.idSITUACAO_FINANCEIRA,
            },
            hospedagemData: {
                id: data.idHOSPEDAGEM,
                quarto: data.quarto,
                leito: data.leito,
                informacoes: data.hospedagemInfo,
                status: data.hospedagemStatus
            },
            anexosData: {
                descricao: data.descAnexo,
                file: data.anexo,
                id: data.idANEXO
            }
        }
        const res = await fetch(`http://localhost:3001/hospedes/editar/${hospedeId}`, {
            method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(dataToSend)
        });
        const response = await res.json();

        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function deleteHospede(hospedeId:number, token: string, userId: number) {
    try {
        const res = await fetch(`http://localhost:3001/hospedes/remover/${hospedeId}`, {
            method: "DELETE",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify({userId: userId})
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getHospedesAtivos(token: string){
    try {
        const res = await fetch('http://localhost:3001/hospedes/ativos', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getHospedeStatus(token: string){
    try {
        const res = await fetch('http://localhost:3001/hospedes/status', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getHospedeFinanceiro(hospedeId:number, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/banco/${hospedeId}`, {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function postHospedeFinanceiro(data: any, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/banco`, {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function putHospedeFinanceiro(hospedeId:number, data: any, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/banco/${hospedeId}`, {
            method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function putHospedeSituacaoFinanceira(hospedeId:number, data: any, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/financeiro/${hospedeId}`, {
            method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getHospedeRemedios(hospedeId:number, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/remedios/${hospedeId}`, {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getHospedeFicha(hospedeId:number, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/ficha/${hospedeId}`, {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getHospedeComplicacoes(hospedeId:number, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/complicacoes/${hospedeId}`, {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function postHospedeFicha(data: any, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/ficha`, {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function putHospedeFicha(hospedeId:number, data: any, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/ficha/${hospedeId}`, {
            method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function postHospedeRemedio(data: any, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/remedios`, {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function putHospedeRemedio(hospedeId:number, data: any, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/remedios/${hospedeId}`, {
            method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function postHospedeComplicacoes(data: any, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/complicacoes`, {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function putHospedeComplicacoes(hospedeId:number, data: any, token: string){
    try {
        const res = await fetch(`http://localhost:3001/hospedes/complicacoes/${hospedeId}`, {
            method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function deleteHospedeBanco(bancoId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/hospedes/remover/banco/${bancoId}`, {
            method: "DELETE",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function deleteHospedeSituacao(situacaoId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/hospedes/remover/situacao/${situacaoId}`, {
            method: "DELETE",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function deleteHospedeDadosMedicos(fichaId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/hospedes/remover/ficha/${fichaId}`, {
            method: "DELETE",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}


const hospedeService = {
    getHospedes,
    createHospedeFull,
    getHospedeById,
    editHospedeById,
    deleteHospede,
    getHospedesAtivos,
    getHospedeStatus,
    getHospedeFinanceiro,
    postHospedeFinanceiro,
    putHospedeFinanceiro,
    putHospedeSituacaoFinanceira,
    getHospedeRemedios,
    getHospedeFicha,
    getHospedeComplicacoes,
    postHospedeFicha,
    putHospedeFicha,
    postHospedeRemedio,
    putHospedeRemedio,
    postHospedeComplicacoes,
    putHospedeComplicacoes,
    deleteHospedeBanco,
    deleteHospedeSituacao,
    deleteHospedeDadosMedicos
}

export default hospedeService;