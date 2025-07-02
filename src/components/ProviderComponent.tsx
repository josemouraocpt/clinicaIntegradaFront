'use client';

import { store } from "@/store";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

interface IProviderComponentProps{
    children: ReactNode
}

export default function ProviderComponent({children}: IProviderComponentProps){
    return(
        <Provider store={store}>
            <NavBar/>
                {children}
            <Footer/>
        </Provider>
    )
}