'use client'
const apiHost = process.env.NEXT_PUBLIC_API_HOST;

async function getFornecedor(fornecedorID: number, token: string) {
    try {
        const res = await fetch(apiHost+`sistema/fornecedores/${fornecedorID}`, {
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

async function getDominio(dominioID: number, token: string) {
    try {
        const res = await fetch(apiHost+`sistema/dominios/${dominioID}`, {
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

async function getAllFornecedor(token: string) {
    try {
        const res = await fetch(apiHost+`sistema/fornecedores/todos`, {
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

async function getAllDominio(token: string) {
    try {
        const res = await fetch(apiHost+`sistema/dominios/todos`, {
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

async function createFornecedor(data: any, token: string) {
    try {
        const res = await fetch(apiHost+`sistema/fornecedores/criar`, {
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

async function createDominio(data:any, token: string) {
    try {
        const res = await fetch(apiHost+`sistema/dominios/criar`, {
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

async function editFornecedor(fornecedorID: number, data: any, token: string) {
    try {
        const res = await fetch(apiHost+`sistema/fornecedores/editar/${fornecedorID}`, {
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

async function editDominio(dominioID: number  ,data:any, token: string) {
    try {
        const res = await fetch(apiHost+`sistema/dominios/editar/${dominioID}`, {
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

async function deleteFornecedor(fornecedorID: number, token: string) {
    try {
        const res = await fetch(apiHost+`sistema/fornecedores/remover/${fornecedorID}`, {
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

async function deleteDominio(dominioID: number, token: string) {
    try {
        const res = await fetch(apiHost+`sistema/dominios/remover/${dominioID}`, {
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

async function generateUploadURL(fileKey:string, fileType:string): Promise<string> {
    try {
        const urlResponse = await fetch(apiHost+`sistema/generate-upload-url?filename=${fileKey}&contentType=${fileType}`);
        const url = await urlResponse.json();
        return url
    } catch (error) {
        return 'Error ao gerar URL'
    }
}

async function generateDownloadURL(fileKey:string): Promise<string> {
    try {
        const urlResponse = await fetch(apiHost+`sistema/generate-download-url?key=${fileKey}`);
        const url = await urlResponse.json();
        return url
    } catch (error) {
        return 'Error ao gerar URL'
    }
}



const sistemaService = {
    getFornecedor,
    getDominio,
    getAllFornecedor,
    getAllDominio,
    createFornecedor,
    createDominio,
    editFornecedor,
    editDominio,
    deleteFornecedor,
    deleteDominio,
    generateUploadURL,
    generateDownloadURL
}

export default sistemaService;