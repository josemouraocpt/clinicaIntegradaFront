"use client"
interface IPageInfoText{
	userName?: string
	message: string
}

export function PageInfoText({message}: IPageInfoText){
	const { user } = JSON.parse(window.sessionStorage.getItem("user") || "{}");
	return(
		<div>
			{user && (
				<h2 className="font-bold text-lg">Você está logado com o usuário <span className="text-yellow-500">{user.name}</span></h2>
			)}
			<p>{message}</p>
		</div>
	)
}