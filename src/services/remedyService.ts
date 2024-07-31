async function getRemedys(token: string) {
    try {
        const res = await fetch('http://localhost:3001/remedy/all', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        console.log(response)
        
       return response
    } catch (error) {
        console.log(error)
        return {error: error}
    }
}

const remedyService = {
    getRemedys,
}

export default remedyService;