'use client'
import sistemaService from './sistemaService'

async function createAtendimento(data: any, token: string){
    try {
        let fileKey = ""
        if(data.anexo.length > 0){
            //gerar url de envio ao s3 AWS
            const file: File = data.anexo[0]
            fileKey = `uploads/${Date.now()}-${file.name}`;
            
            const url = await sistemaService.generateUploadURL(fileKey, file.type);
            //enviar dados para bucket
            await fetch(url, {
                method: 'PUT',
                body: file,
                headers: {
                    'Content-Type': file.type
                }
            });
        }

        const reqBody = {
            hospedeId: data.hospedeId,
            userId: data.usuarioId,
            type: data.tipo,
            date: data.dataAtendimento,
            reason: data.motivo,
            procedure: data.procedimento,
            recomendations: data.recomendacoes,
            medicName: data.nomeMedico,
            medicDoc: data.docMedico,
            attach: fileKey,
        }
        const res = await fetch('http://localhost:3001/atendimentos/criar', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(reqBody)
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

async function getAtendimentoByHospedeId(hospedeId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/atendimentos/${hospedeId}`, {
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

async function editAtendimentoById(atendimentoId:number, data:any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/atendimentos/editar/${atendimentoId}`, {
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

async function deleteAtendimento(atendimentoId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/hospedes/remover/${atendimentoId}`, {
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

const atendimentoService = {
    createAtendimento,
    getAtendimentoByHospedeId,
    editAtendimentoById,
    deleteAtendimento
}

export default atendimentoService;