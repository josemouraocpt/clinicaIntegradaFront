'use client'

async function getProjetos(token: string) {
    try {
        const res = await fetch('http://localhost:3001/projetos/todos', {
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

async function createProjeto(data: any, token: string){
    try {
        const projetoData = {
            name: data.name,
            projectDate: data.projectDate,
            scope: data.scope,
            activity: data.activity,
            restriction: data.restriction,
            cost: Number(data.cost),
            type: data.type,
            userId: data.userId,
            cc: data.cc,
            status: data.status,
            presentation: data.presentation,
            identification: data.identification,
            justification: data.justification,
            methodology: data.methodology,
            objectives: data.objectives,
            public: data.public,
            expectedResults: data.expectedResults
        }
        const res = await fetch('http://localhost:3001/projetos/criar', {
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

async function getProjetoById(projectId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/projetos/${projectId}`, {
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

async function editProjeto(projectId:number, data:any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/projetos/editar/${projectId}`, {
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

async function deleteProjeto(projectId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/projetos/remover/${projectId}`, {
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

async function getProjetoStatus(token: string) {
    try {
        const res = await fetch('http://localhost:3001/projetos/status', {
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

async function addParticipante(data: any, token: string){
    try {
        const res = await fetch('http://localhost:3001/projetos/participantes', {
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

async function getListaParticipantes(projectId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/projetos/lista/${projectId}`, {
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

async function deleteHospedeEmProjeto(projectId:number, token: string, hospedeId:number) {
    try {
        const res = await fetch(`http://localhost:3001/projetos/remover/hospede/${projectId}?hospede=${hospedeId}`, {
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

 
const projetoService = {
    getProjetos,
    createProjeto,
    getProjetoById,
    editProjeto,
    deleteProjeto,
    getProjetoStatus,
    addParticipante,
    getListaParticipantes,
    deleteHospedeEmProjeto
}

export default projetoService;