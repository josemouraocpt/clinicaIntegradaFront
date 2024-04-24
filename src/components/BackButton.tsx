'use client'
import { useRouter } from "next/navigation"
import React from "react";

export default function BackButton (){
    const router = useRouter();
    return(
        <button className={'absolute margin-top-10 right-5 bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover '} onClick={router.back}>Voltar</button> 
    )
}