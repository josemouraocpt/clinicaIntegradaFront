import { Actions } from "@/components/Actions";
import { MdManageAccounts, MdBusinessCenter, MdHotel, MdRestaurant, MdSportsSoccer, MdOutlineLightbulb } from "react-icons/md";
import { TbPill, TbCurrencyReal, TbPhysotherapist } from "react-icons/tb"
import Link from "next/link";


export default function Dashboard(){
	return(
		<div className="bg-background p-4 space-y-7">
			<div>
				<h2 className="font-bold text-lg">Você está logado com o usuário <span className="text-yellow-500">@Usuário</span></h2>
				<p>Para começar voce deseja: </p>
			</div>
			<h2 className="text-xl font-bold">Conta</h2>
			<div className="text-white flex flex-row space-x-5">
				<Link href="/perfil"><Actions icon={<MdManageAccounts size={90}/>} title="Perfil"/></Link>
			</div>
			<h2 className="text-xl font-bold">Usuários</h2>
			<div className="text-white flex flex-row space-x-5">
				<Actions icon={<MdBusinessCenter size={90}/>} title="Funcionários"/>
				<Link href="/hospedes"><Actions icon={<MdHotel size={90}/>} title="Hóspedes"/></Link>
			</div>
			<h2 className="text-xl font-bold">Setores</h2>
			<div className="text-white flex flex-row space-x-5">
				<Actions icon={<TbPill size={90}/>} title="Farmácia"/>
				<Actions icon={<MdRestaurant size={90}/>} title="Cozinha"/>
				<Actions icon={<MdSportsSoccer size={90}/>} title="Atividades Diárias"/>
				<Actions icon={<MdOutlineLightbulb size={90}/>} title="Projetos"/>
				<Actions icon={ <TbPhysotherapist size={90}/>} title="Fisioterapia"/>
				<Actions icon={<TbCurrencyReal size={90}/>} title="Financeiro"/>
			</div>
		</div>
	)
};
