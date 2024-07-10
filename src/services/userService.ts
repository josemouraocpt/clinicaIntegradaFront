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

const userService = {
    getUserData,
    updateUser
}

export default userService;