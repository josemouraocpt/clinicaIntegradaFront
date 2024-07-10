async function register(data: any) {
    try {
        const res = await fetch("http://localhost:3001/users/singup", {
            method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
        });
        const response = await res.json();
        
        if(response.message == "Erro ao criar registro em USUARIO"){
            return { error: response.message }
        }else{
            localStorage.setItem("user", JSON.stringify(response))
        }
        return response
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function login(data: any) {
    try {
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
        });
        const response = await res.json();
        if(response.message == "Email e(ou) senha inválidos!"){
            return { error: response.message }
        }else{
            localStorage.setItem("user", JSON.stringify(response))
        }
        return response
    } catch (error) {
        console.log(error);
        return {error: error}
    }
}

function logout() {
    localStorage.removeItem("user")
}


const authService = {
    register,
    login,
    logout
}

export default authService;