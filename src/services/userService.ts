'use client';

async function getUserData(userID: number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/usuarios/${userID}`, {
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

async function updateUser(userID: number, data: any, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/usuarios/editar/${userID}`, {
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

async function getUsersAndDepartments(token: string) {
    try {
        const res = await fetch('http://localhost:3001/usuarios/setores', {
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

async function getFuncionarios(token: string) {
    try {
        const res = await fetch('http://localhost:3001/usuarios/todos', {
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

async function getUserSetores(){
    try {
        const res = await fetch('http://localhost:3001/usuarios/setores', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
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

async function getUserProfiles(){
    try {
        const res = await fetch('http://localhost:3001/usuarios/perfis', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
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

async function getUserStatus(token: string){
    try {
        const res = await fetch('http://localhost:3001/usuarios/status', {
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

async function deleteUser(userID: number, token: string) {
    try {
        const res = await fetch(`http://localhost:3001/usuarios/remover/${userID}`, {
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

async function updateUserStatus(data: any, token: string) {
    try {
        console.log(data)
        const res = await fetch('http://localhost:3001/usuarios/editar/status', {
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

const userService = {
    getUserData,
    updateUser,
    getUsersAndDepartments,
    getFuncionarios,
    getUserSetores,
    getUserProfiles,
    deleteUser,
    getUserStatus,
    updateUserStatus
}

export default userService;