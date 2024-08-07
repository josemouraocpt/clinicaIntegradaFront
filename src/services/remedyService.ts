'use client';

async function getRemedys(token: string) {
    try {
        const res = await fetch('http://localhost:3001/medicalRecord/remedy', {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
        console.log(response)
       return response;
    } catch (error) {
        console.log(error)
        return {message: error}
    }
}

async function getRemedyInfo(token: string, remedyId: number){
    try {
        const res = await fetch(`http://localhost:3001/medicalRecord/remedy/${remedyId}`, {
            method: "GET",
			headers: {
				"Content-Type": "application/json",
                "Authorization": token
			}
        });
        const response = await res.json();
       return response
    } catch (error) {
        console.log(error)
        return {message: error}
    }
}

const remedyService = {
    getRemedys,
    getRemedyInfo
}

export default remedyService;