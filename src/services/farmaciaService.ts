'use client'

async function getMedicamentos(token: string) {
    try {
        const res = await fetch('http://localhost:3001/farmacia/medicamentos', {
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

async function getItens(token: string) {
    try {
        const res = await fetch('http://localhost:3001/farmacia/itens/todos', {
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

async function getVacinas(token: string) {
    try {
        const res = await fetch('http://localhost:3001/farmacia/vacinas', {
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

async function getVacinasEstoque(token: string) {
    try {
        const res = await fetch('http://localhost:3001/farmacia/vacinas/estoque', {
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

async function getFornecedores(token: string) {
    try {
        const res = await fetch('http://localhost:3001/farmacia/vacinas/fornecedores', {
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

async function getMedicamentoById(medicamentoId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/farmacia/medicamentos/${medicamentoId}`, {
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

async function getItemById(itemId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/farmacia/itens/${itemId}`, {
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

async function getVacinaById(vacinaId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/farmacia/vacinas/${vacinaId}`, {
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

async function createMedicamento(data: any, token: string){
    try {
        const totalValue = data.unitValue * data.quantity;
        const createDate = new Date().toISOString().split("T")[0]
        const medicamentoData = {
            userId: data.userId,
            name: data.name,
            quantity: data.quantity,
            unitValue: data.unitValue,
            totalValue: totalValue,
            expireDate: data.expireDate,
            createDate: createDate,
            changeDate: createDate,
            changeBy: data.userId,
            type: data.type,
        }
        
        const res = await fetch('http://localhost:3001/farmacia/medicamentos/criar', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(medicamentoData)
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

async function createItem(data: any, token: string){
    try {
        const totalValue = data.unitValue * data.quantity;
        const createDate = new Date().toISOString().split("T")[0]
        const itemData = {
            userId: data.userId,
            name: data.name,
            quantity: data.quantity,
            unitValue: data.unitValue,
            totalValue: totalValue,
            expireDate: data.expireDate,
            createDate: createDate,
            changeDate: createDate,
            changeBy: data.userId,
            type: "ITEM",
        }
        const res = await fetch('http://localhost:3001/farmacia/itens/criar', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(itemData)
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

async function createVacina(data: any, token: string){
    try {
        const createDate = new Date().toISOString().split("T")[0]
        const vacinaData = {
            idStock: data.idStock, 
            idSupplier: data.idSupplier, 
            name: data.name, 
            dosage: data.dosage, 
            expireDate: data.expireDate, 
            batch: data.batch, 
            fabricationDate: data.fabricationDate, 
            crafter: data.crafter, 
            storageType: data.storageType, 
            storageCondition: data.storageCondition, 
            changeDate: createDate, 
            changeBy: data.changeBy
        }
        const res = await fetch('http://localhost:3001/farmacia/vacinas/criar', {
            method: "POST",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			},
            body: JSON.stringify(vacinaData)
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

async function editMedicamento(medicamentoId:number, data:any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/farmacia/medicamentos/editar/${medicamentoId}`, {
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

async function editItem(itemId:number, data:any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/farmacia/itens/editar/${itemId}`, {
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

async function editVacina(vacinaId:number, data:any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/farmacia/vacinas/editar/${vacinaId}`, {
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

async function deleteMedicamento(medicamentoId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/farmacia/medicamentos/remover/${medicamentoId}`, {
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

async function deleteItem(itemId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/farmacia/itens/remover/${itemId}`, {
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

async function deleteVacina(vacinaId:number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/farmacia/vacinas/remover/${vacinaId}`, {
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

const farmaciaService = {
    getMedicamentos,
    getItens,
    getVacinas,
    getMedicamentoById,
    getItemById,
    getVacinaById,
    createMedicamento,
    createItem,
    createVacina,
    editMedicamento,
    editItem,
    editVacina,
    deleteMedicamento,
    deleteItem,
    deleteVacina,
    getFornecedores,
    getVacinasEstoque
}

export default farmaciaService;