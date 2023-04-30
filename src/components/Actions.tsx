interface IActions{
	icon: React.ReactNode
	title: string
}

export function Actions( { icon, title }: IActions ){
	return(
		<>
			<div className="bg-button flex items-center flex-col justify-center h-40 w-52 rounded-md hover:bg-button-hover cursor-pointer shadow-md">
				{icon}
				{title}
			</div>
		</>
	)
};