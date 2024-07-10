"use client"
import { useSelector } from "react-redux"
interface IPageInfoText{
	userName?: string
	message: string
}

export function PageInfoText({message}: IPageInfoText){
	const { user } = useSelector((state) => state.auth);
	return(
		<div>
			<h2 className="font-bold text-lg">Você está logado com o usuário <span className="text-yellow-500">{user.user.name}</span></h2>
			<p>{message}</p>
		</div>
	)
}