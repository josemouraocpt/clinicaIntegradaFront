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
        await dispatch(logout())
        router.push("/")
    }
    return(
        <div className="inline">
            <button onClick={sair} className=" absolute">
                <MdLogout title="Sair" size={32} className="text-black"/>
            </button>
        </div>
    )
}