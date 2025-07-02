"use client";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import authService from "@/services/authService";

export function LogOut(){
    const router = useRouter();
    async function sair() {
        router.push("/")
        await authService.logout()
    }
    return(
        <div className="border-t border-black w-4/5 mx-auto">
            <button onClick={sair}>
                <MdLogout title="Sair" size={32} className="inline"/> Sair
            </button>
        </div>
    )
}