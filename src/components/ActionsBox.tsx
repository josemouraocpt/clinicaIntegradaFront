'use client'
import { useRouter } from "next/navigation";
import { MdDeleteForever, MdRemoveRedEye } from "react-icons/md";
interface IActionsBoxProps{
    path: string
    deleteFunc?: any
}

export function ActionsBox({path, deleteFunc}: IActionsBoxProps){
    const router = useRouter();

    return(
        <div className="flex space-x-2 my-2">
            {deleteFunc && (
                <button className="hover:opacity-75" onClick={deleteFunc}>
                    <MdDeleteForever size={32} className="text-button"/>
                </button>
            )}
            <button className="hover:opacity-75" onClick={() => { router.push(path) }}>
                <MdRemoveRedEye size={32} className="text-button" />
            </button>
        </div>
    )
}