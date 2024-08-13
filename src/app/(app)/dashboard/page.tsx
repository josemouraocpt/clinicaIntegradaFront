import { Actions } from "@/components/Actions";
import { MdManageAccounts, MdBusinessCenter, MdHotel, MdRestaurant, MdSportsSoccer, MdOutlineLightbulb } from "react-icons/md";
import { TbPill, TbCurrencyReal, TbPhysotherapist } from "react-icons/tb"
import Link from "next/link";
import { PageInfoText } from "@/components/PageInfoText";

export default function Dashboard(){
	return(
		<div className="p-4 space-y-7">
			<PageInfoText message="Para começar voce deseja:"/>
			<h2 className="text-xl font-bold">Conta</h2>
			<div className="text-white flex flex-row space-x-5">
				<Link href="/perfil"><Actions icon={<MdManageAccounts size={90}/>} title="Perfil"/></Link>
			</div>
			<h2 className="text-xl font-bold">Usuários</h2>
			<div className="text-white flex flex-row space-x-5">
				<Link href="/funcionarios"><Actions icon={<MdBusinessCenter size={90}/>} title="Funcionários"/></Link>
				<Link href="/hospedes"><Actions icon={<MdHotel size={90}/>} title="Hóspedes"/></Link>
			</div>
			<h2 className="text-xl font-bold">Setores</h2>
			<div className="text-white flex flex-row gap-5 flex-wrap">
				<Link href="/farmacia">
					<Actions icon={<TbPill size={90}/>} title="Farmácia"/>
				</Link>
				<Link href="/cozinha">
					<Actions icon={<MdRestaurant size={90}/>} title="Cozinha"/>
				</Link>
				<Link href="/atividades">
					<Actions icon={<MdSportsSoccer size={90}/>} title="Atividades Diárias"/>
				</Link>
				<Link href="/projetos">
					<Actions icon={<MdOutlineLightbulb size={90}/>} title="Projetos"/>
				</Link>
				<Link href="/atendimentos">
					<Actions icon={ <TbPhysotherapist size={90}/>} title="Atendimentos"/>
				</Link>
				<Link href="/financeiro">
					<Actions icon={<TbCurrencyReal size={90}/>} title="Financeiro"/>
				</Link>
			</div>
		</div>
	)
};
