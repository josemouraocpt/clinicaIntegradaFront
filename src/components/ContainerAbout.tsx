import { ReactNode } from "react"

interface IInfoContainerProps{
	icon: React.ReactNode;
	title: string;
	itens: string[];
}

export function ContainerAbout( { icon, title, itens }: IInfoContainerProps ){
	return(
		<div className="w-fit bg-container rounded-md p-5">
			<div className="mx-auto">
				{icon}
			</div>
			<div>
				<h2 className="text-2xl">{title}</h2>
				<ul>
					{itens.map((item) => (
						<>
							<li key={item}>{item}</li>
						</>
					))}
				</ul>
			</div>
		</div>
	)
};