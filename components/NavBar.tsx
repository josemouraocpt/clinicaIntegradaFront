import Image from "next/image"
import logo from "../assets/img/logo-branco.png";
import Link from "next/link";
import { MyButton } from "./MyButton";

export function NavBar(){
	return(
		<nav className="flex justify-between items-center p-1 bg-white">
			<div className="ml-14">
				<Link href="/">
					<Image src={logo} alt="Logo Assopoc" width={234} height={59}/>
				</Link>
			</div>
			<div className="mr-14 space-x-5 text-lg text-menu-text">
				<Link href="/dashboard">Home</Link>
				<Link href="/about">Contatos</Link>
				<Link href="\trabalhe_conosco">Trabalhe Conosco</Link>
				<Link href="/login"><MyButton buttonText="Login"/></Link>
				<Link href="/register"><MyButton buttonText="Cadastro"/></Link>
			</div>
		</nav>
	)
};