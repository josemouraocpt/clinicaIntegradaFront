'use client'
import Link from "next/link";
import { useState } from "react";
import { MdBusinessCenter, MdContentPaste, MdHotel, MdManageAccounts, MdMenu, MdOutlineAppRegistration, MdOutlineLightbulb, MdRestaurant, MdSportsSoccer } from "react-icons/md";
import { TbCurrencyReal, TbPhysotherapist, TbPill } from "react-icons/tb";
import { LogOut } from "./LogOut";

export function Menu(){
    const [toggle, setToggle] = useState(false);
    function handleClick(){
        setToggle(!toggle)
    }
    function teste(){
        return toggle == true ? setToggle(!toggle) : undefined
    }
    return(
        <div className="absolute right-2 top-0">
            <button onClick={() => setToggle(!toggle)}>
                <MdMenu size={32}  className="mt-5"/>
            </button>
            <div className={toggle == false ? "hidden" : "absolute -right-2 w-56 top-[67px] space-y-2 text-black bg-white rounded-b-lg pb-2 z-10"} onMouseLeave={teste}>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/atendimentos" onClick={handleClick}>
                         <TbPhysotherapist className="inline" size={32}/> Atendimentos
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/atividades" onClick={handleClick}>
                        <MdSportsSoccer className="inline" size={32}/> Atividades diárias
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/cozinha" onClick={handleClick}>
                        <MdRestaurant className="inline" size={32}/> Cozinha
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/sistema/dominios" onClick={handleClick}>
                        <MdOutlineAppRegistration className="inline" size={32}/> Dominios
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/farmacia" onClick={handleClick}>
                        <TbPill size={32} className="inline"/> Fármacia
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/financeiro" onClick={handleClick}>
                        <TbCurrencyReal className="inline" size={32}/> Financeiro
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/sistema/fornecedores" onClick={handleClick}>
                        <MdContentPaste className="inline" size={32}/> Fornecedores
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/funcionarios" onClick={handleClick}>
                        <MdBusinessCenter size={32} className="inline"/> Funcionários
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/hospedes" onClick={handleClick}>
                        <MdHotel size={32} className="inline"/> Hóspedes
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/perfil" onClick={handleClick}>
                        <MdManageAccounts size={32} className="inline"/> Perfil
                    </Link>
                </div>
				<div className="border-t border-black w-4/5 mx-auto hover:bg-gray-50">
                    <Link href="/projetos" onClick={handleClick}>
                        <MdOutlineLightbulb className="inline" size={32}/> Projetos
                    </Link>
                </div>
                <LogOut/>
            </div>
        </div>
    )
}