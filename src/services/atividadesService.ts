'use client'
import sistemaService from './sistemaService'

async function getAtividades(token: string) {
    try {
        const res = await fetch('http://localhost:3001/atividades/todos', {
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

async function createAtividade(data: any, token: string){
    try {
        let fileKey = ""
        if(data.attachment.length > 0){
            //gerar url de envio ao s3 AWS
            const file: File = data.attachment[0]
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

        data.attachment = fileKey;

        const res = await fetch('http://localhost:3001/atividades/criar', {
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

async function getAtividadeById(atividadeId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/atividades/${atividadeId}`, {
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

async function editAtiviadade(atividadeId:number, data:any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/atividades/editar/${atividadeId}`, {
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

async function lancarPresencaByAtividadeId(atividadeId:number, data:any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/atividades/presenca/${atividadeId}`, {
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

async function deleteAtividade(atividadeId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/atividades/remover/${atividadeId}`, {
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

async function getAtividadeStatus(token: string) {
    try {
        const res = await fetch('http://localhost:3001/atividades/status', {
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

async function getLista(atividadeId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/atividades/lista/${atividadeId}`, {
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

async function deleteHospedeEmAtividade(atividadeId:number, token: string, hospedeId:number) {
    try {
        const res = await fetch(`http://localhost:3001/atividades/remover/hospede/${atividadeId}?hospede=${hospedeId}`, {
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

const atividadesService = {
    getAtividades,
    createAtividade,
    getAtividadeById,
    editAtiviadade,
    deleteAtividade,
    lancarPresencaByAtividadeId,
    getAtividadeStatus,
    getLista,
    deleteHospedeEmAtividade
}

export default atividadesService;