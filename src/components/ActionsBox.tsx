'use client'
import { useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";

interface IActionsBoxProps{
    path: string
}

export function ActionsBox({path}: IActionsBoxProps){
    const router = useRouter();

    return(
        <div className="flex space-x-2 my-2">
            <button className="hover:opacity-75">
                <MdDeleteForever size={32} className="text-button"/>
            </button>
            <button className="hover:opacity-75" onClick={() => { router.push(path) }}>
                <MdModeEdit size={32} className="text-button"/>
            </button>
        </div>
    )
}