import { ContainerFarmacia } from "@/components/ContainerFarmacia"
import { ItemCard } from "@/components/ItemCard"

export default function ListaItem(){
    return(
        <div className="min-h-screen">
            <ContainerFarmacia/>
            <div className="m-10 grid grid-cols-2 gap-5 bg-white p-4 rounded-lg shadow-sm">
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
                <ItemCard/>
            </div>
        </div>
    )
}