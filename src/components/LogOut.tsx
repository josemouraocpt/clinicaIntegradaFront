"use client";
import { logout, reset } from "@/slices/authSlice";
import { useEffect } from "react";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export function LogOut(){
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(() => {
		dispatch(reset());
	}, [dispatch]);

    async function sair() {
        router.push("/")
        await dispatch(logout())
    }
    return(
        <div className="border-t border-black w-4/5 mx-auto">
            <button onClick={sair}>
                <MdLogout title="Sair" size={32} className="inline"/> Sair
            </button>
        </div>
    )
}