interface IPageInfoText{
	userName?: string
	message: string
}

export function PageInfoText({message}: IPageInfoText){
	return(
		<div>
			<h2 className="font-bold text-lg">Você está logado com o usuário <span className="text-yellow-500">@Usuário</span></h2>
			<p>{message}</p>
		</div>
	)
}