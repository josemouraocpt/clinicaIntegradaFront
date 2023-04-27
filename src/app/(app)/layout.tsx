import { ReactNode } from "react"

interface AppLayoutProps{
	children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps){
	return(
		<div>
			<h1>App</h1>
			{children}
		</div>
	)
}; 