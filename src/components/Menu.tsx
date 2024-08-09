'use client'
import Link from "next/link";
import { useState } from "react";
import { MdMenu, MdOutlineLightbulb, MdRestaurant, MdSportsSoccer } from "react-icons/md";
import { TbCurrencyReal, TbPhysotherapist, TbPill } from "react-icons/tb";
import { LogOut } from "./LogOut";

export function Menu(){
    const [toggle, setToggle] = useState(false);
    function handleClick(){
        setToggle(!toggle)
    }
    return(
        <div className="absolute right-2 top-0">
            <button onClick={() => setToggle(!toggle)}>
                <MdMenu size={32}  className="mt-5"/>
            </button>
            <div className={toggle == false ? "hidden" : "absolute -right-2 w-56 top-[67px] space-y-2 text-black bg-white rounded-b-lg pb-2"}>
                <div className="border-t border-black w-4/5 mx-auto">
                    <Link href="/farmacia" onClick={handleClick}>
                        <TbPill size={32} className="inline"/> Farmácia
                    </Link>
                </div>
                <div className="border-t border-black w-4/5 mx-auto">
                    <Link href="/cozinha" onClick={handleClick}>
                        <MdRestaurant className="inline" size={32}/> Cozinha
                    </Link>
                </div>
				<div className="border-t border-black w-4/5 mx-auto">
                    <Link href="/atividades" onClick={handleClick}>
                        <MdSportsSoccer className="inline" size={32}/> Atividades diárias
                    </Link>
                </div>
				<div className="border-t border-black w-4/5 mx-auto">
                    <Link href="/projetos" onClick={handleClick}>
                        <MdOutlineLightbulb className="inline" size={32}/> Projetos
                    </Link>
                </div>
				<div className="border-t border-black w-4/5 mx-auto">
                    <Link href="/fisioterapia" onClick={handleClick}>
                         <TbPhysotherapist className="inline" size={32}/> Atendimentos
                    </Link>
                </div>
				<div className="border-t border-black w-4/5 mx-auto">
                    <Link href="/financeiro" onClick={handleClick}>
                        <TbCurrencyReal className="inline" size={32}/> Financeiro
                    </Link>
                </div>
                <LogOut/>
            </div>
        </div>
    )
}