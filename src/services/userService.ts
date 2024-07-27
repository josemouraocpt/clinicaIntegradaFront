async function getUserData(userID: number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/users/${userID}`, {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        
        if(response.message == "Usuário não encontrado!"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function updateUser(userID: number, data: any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/users/edit/${userID}`, {
            method: "PATCH",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        
        if(response.message == "Informações inválidas!"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getHospedes(token: string) {
    try {
        const res = await fetch('http://localhost:3001/guest/all', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        return response

        // if(response.message == "Usuário não encontrado!"){
        //     return { error: response.message }
        // }else{
        //     return response 
        // }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getUsersAndDepartments(token: string) {
    try {
        const res = await fetch('http://localhost:3001/users/help/departments', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        return response

        // if(response.message == "Usuário não encontrado!"){
        //     return { error: response.message }
        // }else{
        //     return response 
        // }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createHospedeFull(data: any, token: string){
    try {
        //inserir os remedios
        const remedioData = {
            name: data.nomeRemedio,
            usageFrequency: data.frequenciaUso,
            usageTime: data.tempoUso,
            dosage: data.dosagem
        }
        const remedioRes = await createRemedio(remedioData, token);

        //inserir doenças e alergias
        const doencasData = {
            type: data.tipoAlergiaDieta,
            description: data.descAlergiaDieta
        }
        const doencasRes = await createDoencasAlergiasDietas(doencasData, token);

        //inserir os dados medicos
        const dadosMedicosData = {
            dependenceDegree: data.grauDependencia,
            observations: data.obsMed, 
            idRemedies: remedioRes,
            idDiseaseAllergiesDiets: doencasRes,
        }
        const dadosMedicosRes = await createDadosMedicos(dadosMedicosData, token);

        //inserir o hospede
        const hospedeData = {
            name: data.nome,
            socialName: data.nomeSocial,
            nickname: data.apelido,
            rg: data.rg,
            cpf: data.cpf,
            nationality: data.nacionalidade,
            naturalness: data.naturalidade,
            civilState: data.estadoCivil,
            birthDate: data.dataNascimento,
            motherName: data.nomeMae,
            fatherName: data.nomePai,
            phoneNumber: data.telefone,
            occupation: data.profissao,
            electoralTitle: data.tituloEleitor,
            address: data.endereco,
            city: data.cidade,
            state: data.uf,
            zipCode: data.cep,
            entryDate: data.dataEntrada,
            idMedicalRecord: dadosMedicosRes
        }
        const hospedeRes = await createHospede(hospedeData, token);

        //inserir os daddos bancarios
        const bankData = {
            hasAccount: data.possuiConta,
            bankName: data.nomeBanco,
            agency: data.agencia,
            accountNumber: data.conta,
            idGuest: hospedeRes
        }
        const bankRes = await createBank(bankData, token);

        //inserir situação financeira
        const situacaoData = {
            description: data.situacaoFinanceiraDesc,
            idGuest: hospedeRes
        }
        const situacaoRes = createFinancial(situacaoData, token);

        //inserir hospedagem
        const hospedamData = {
            room: data.quarto,
            bed: data.leito,
            information: data.hospedagemInfo,
            status: true, //como o hospede está sendo inserido o status vai como ativo
            idGuest: hospedeRes
        }
        const hospedagemRes = await createHospedagem(hospedamData, token);

        //inserir responsabilidade
        const responsabilidadeData = {
            userId: data.responsavel,
            guestId: hospedeRes
        }
        const responsabilidadeRes = await createResponsabilidae(responsabilidadeData, token);

        return { message: "Sucesso" }

    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createRemedio(data: any, token: string) {
    try {
        const res = await fetch('http://localhost:3001/medicalRecord/remedy', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response.remedioID
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createDoencasAlergiasDietas(data: any, token: string){
    try {
        const res = await fetch('http://localhost:3001/medicalRecord/diseases', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response.doencasID
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createDadosMedicos(data: any, token: string){
    try {
        const res = await fetch('http://localhost:3001/medicalRecord/data', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response.medicalDataId
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createHospede(data: any, token: string){
    try {
        const res = await fetch('http://localhost:3001/guest/create', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response.hospedeId
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createBank(data: any, token: string){
    try {
        const res = await fetch('http://localhost:3001/guest/bank', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createFinancial(data: any, token: string){
    try {
        const res = await fetch('http://localhost:3001/guest/financial', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createHospedagem(data: any, token: string){
    try {
        const res = await fetch('http://localhost:3001/accommodation/create', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createResponsabilidae(data: any, token: string){
    try {
        const res = await fetch('http://localhost:3001/responsability/create', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(data)
        });
        const response = await res.json();
        return response
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function getFuncionarios(token: string) {
    try {
        const res = await fetch('http://localhost:3001/users', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        
        if(response.message == "Usuário não encontrado!"){
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
        const res = await fetch(`http://localhost:3001/guest/${hospedeId}`, {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        return response;
        // if(response.message == "Usuário não encontrado!"){
        //     return { error: response.message }
        // }else{
        //     return response 
        // }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function editHospedeById(hospedeId:number, data:any, token: string) {
    try {
        const dataPut = {
            guest:{
                id: hospedeId,
                name: data.nome, 
                socialName: data.nomeSocial, 
                nickname: data.apelido, 
                rg: data.rg, 
                cpf: data.cpf, 
                nationality: data.nacionalidade, 
                naturalness: data.naturalidade, 
                civilState: data.estadoCivil, 
                birthDate: data.dataNascimento, 
                motherName: data.nomeMae, 
                fatherName: data.nomePai, 
                phoneNumber: data.telefone, 
                occupation: data.profissao, 
                electoralTitle: data.tituloEleitor, 
                address: data.endereco, 
                city: data.cidade, 
                state: data.uf, 
                zipCode: data.cep, 
                entryDate: data.dataEntrada, 
            },
            financial:{
                id: data.idSituacaoFinanceira,
                description: data.situacaoFinanceiraDesc,
            },
            bank: {
                id: data.idDadosBancarios,
                hasAccount: data.possuiConta,
                bankName: data.nomeBanco,
                agency: data.agencia,
                accountNumber: data.numeroConta,
            },
            accommodation:{
                id: data.idHospedagem,
                room: data.quarto,
                bed: data.leito,
                information: data.hospedagemInfo,
                status: data.hospedagemStatus
            },
            responsability:{
                id: data.idResponsabilidade,
                userId: data.responsavel
            },
            remedy: {
                id: data.idRemedio,
                name: data.nomeRemedio,
                usageFrequency: data.frequenciaUso,
                usegeTime: data.tempoUso,
                dosage: data.dosagem
            },
            disease:{
                id: data.idAlergias,
                type: data.tipoAlergiaDieta,
                description: data.descAlergiaDieta
            },
            medicalData:{
                id: data.idDadosMedicos,
                dependenceDegree: data.grauDependencia,
                observations: data.obsMed
            }
        }
        const res = await fetch(`http://localhost:3001/guest/edit/${hospedeId}`, {
            method: "PUT",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(dataPut)
        });
        const response = await res.json();
        console.log(response);
        if(response.message == "Erro ao atualizar a hospedagem"){
            return { error: response.message }
        }else{
            return response 
        }
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}


const userService = {
    getUserData,
    updateUser,
    getHospedes,
    getUsersAndDepartments,
    createHospedeFull,
    getFuncionarios,
    getHospedeById,
    editHospedeById
}

export default userService;