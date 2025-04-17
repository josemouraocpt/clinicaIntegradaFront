'use client'

async function getCardapiosPadrao(token: string) {
    try {
        const res = await fetch('http://localhost:3001/cozinha/cardapios/padrao', {
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

async function getCardapiosEspecial(token: string) {
    try {
        const res = await fetch('http://localhost:3001/cozinha/cardapios/especial', {
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

async function getCardapioById(cardapioId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/cozinha/cardapios/${cardapioId}`, {
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

async function getMercadorias(token: string) {
    try {
        const res = await fetch('http://localhost:3001/cozinha/estoque', {
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

async function getMercadoriaById(mercadoriaId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/cozinha/estoque/${mercadoriaId}`, {
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

async function createCardapio(data: any, token: string){
    try {
        const res = await fetch('http://localhost:3001/cozinha/cardapios/criar', {
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

async function createMercadoria(data: any, token: string){
    try {
        const totalValue = data.unitValue * data.quantity;
        const createDate = new Date().toISOString().split("T")[0]
        const mercadoriaData = {
            userId: data.userId,
            name: data.name,
            quantity: data.quantity,
            unitValue: data.unitValue,
            totalValue: totalValue,
            expireDate: data.expireDate,
            createDate: createDate,
            changeDate: createDate,
            changeBy: data.userId,
            type: "MERCADORIA",
        }
        const res = await fetch('http://localhost:3001/cozinha/estoque/criar', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(mercadoriaData)
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

async function editCardapio(cardapioId:number, data:any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/cozinha/cardapios/editar/${cardapioId}`, {
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

async function editMercadoria(mercadoriaId:number, data:any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/cozinha/estoque/editar/${mercadoriaId}`, {
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

async function deleteCardapio(cardapioId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/cozinha/cardapios/remover/${cardapioId}`, {
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

async function deleteMercadoria(mercadoriaId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/cozinha/estoque/remover/${mercadoriaId}`, {
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

async function getCardapioStatus(token: string) {
    try {
        const res = await fetch('http://localhost:3001/cozinha/cardapios/status', {
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

const cozinhaService = {
    getCardapiosPadrao,
    getCardapiosEspecial,
    getCardapioById,
    getMercadorias,
    getMercadoriaById,
    createCardapio,
    createMercadoria,
    editCardapio,
    editMercadoria,
    deleteCardapio,
    deleteMercadoria,
    getCardapioStatus
}

export default cozinhaService;