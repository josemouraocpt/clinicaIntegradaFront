import Image from "next/image"
import logo from "../assets/img/logo-branco.png";
import Link from "next/link";
import { Menu } from "./Menu";

export function NavBarAuth(){
	return(
		<nav className="flex justify-between items-center p-1 bg-white">
			<div className="ml-14">
				<Image src={logo} alt="Logo Assopoc" width={234} height={59}/>
			</div>
			<div className="mr-14 space-x-5 text-lg text-menu-text">
				<Link href="/dashboard">Home</Link>
				<Menu/>
			</div>
		</nav>
	)
};