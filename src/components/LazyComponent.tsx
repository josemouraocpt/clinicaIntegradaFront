'use client';
import { store } from "@/store";
import { Provider } from "react-redux";
import { NavBar } from '@/components/NavBar';
import { Footer } from '@/components/Footer';

export default function LazyComponent({ children }: { children: React.ReactNode}){
    return(
        <Provider store={store}>
            <NavBar/>
                {children}
            <Footer/>
        </Provider>
    )
}