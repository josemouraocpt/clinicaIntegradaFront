"use client"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
interface IPageInfoText{
	userName?: string
	message: string
}

export function PageInfoText({message}: IPageInfoText){
	const [userName, setUserName] = useState("")
	const { user } = useSelector((state) => state.auth);
	useEffect(() => {
		console.log(user)
		setUserName(user.user?.name)
	}, [])
	return(
		<div>
			{user && (
				<h2 className="font-bold text-lg">Você está logado com o usuário <span className="text-yellow-500">{userName}</span></h2>
			)}
			<p>{message}</p>
		</div>
	)
}