import { ActionsBox } from "./ActionsBox";

interface ICardapioCardProps{
    path: string
}

export function CardapioCard({path}: ICardapioCardProps){
    return(
        <div className="bg-background max-w-[40vw] p-5 rounded-md shadow-md my-4">
            <h1 className="font-bold text-2xl text-center">Título da refeição</h1>
            <div>
                <ul>
                    <li>Data da refeição: </li>
                    <li>Horário da refeição: </li>
                </ul>
                <div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum perspiciatis rem voluptas natus soluta ea maiores nemo, consectetur doloremque quisquam perferendis quis sunt minima! Explicabo eveniet cum deserunt harum enim!
                    </p>
                </div>
            </div>
            <div className="flex justify-end">
                <ActionsBox path={path}/>
            </div>
        </div>
    )
}