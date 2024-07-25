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

async function createHospede(data: any, token: string){
    //inserir os remedios
    //inserir doenças e alergias
    //inserir os dados medicos
    //inserir o hospede
    //inserir os daddos bancarios
    //inserir situação financeira
    //inserir hospedagem
    //inserir responsabilidade
    try {
        
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function createRemedio(data: any, token: string) {
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
        
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

const userService = {
    getUserData,
    updateUser,
    getHospedes,
    getUsersAndDepartments
}

export default userService;