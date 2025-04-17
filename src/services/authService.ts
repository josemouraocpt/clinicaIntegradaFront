'use client';

async function register(data: any) {
    try {
        const res = await fetch("http://localhost:3001/usuarios/registro", {
            method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
        });
        const response = await res.json();
        
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            if(!window.sessionStorage.getItem("user")){
				sessionStorage.setItem("user", JSON.stringify(response))
			}
        }
        return response
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

async function login(data: any) {
    try {
        const res = await fetch("http://localhost:3001/usuarios/login", {
            method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return { error: response.message }
        }else{
            sessionStorage.setItem("user", JSON.stringify(response))
        }
        return response
    } catch (error) {
        return {error: error}
    }
}

async function recuperarSenha(data: any) {
    try {
        const res = await fetch("http://localhost:3001/usuarios/recuperar", {
            method: "POST",
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
        });
        const response = await res.json();
        if(response.type == "ERROR"){
            return response
        }else{
            sessionStorage.setItem("user", JSON.stringify(response))
        }
        return response
    } catch (error) {
        return {error: error}
    }
}

function logout() {
    sessionStorage.removeItem("user")
}


const authService = {
    register,
    login,
    logout,
    recuperarSenha
}

export default authService;