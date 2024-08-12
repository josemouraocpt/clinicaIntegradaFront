import { ContainerAtividades } from "@/components/ContainerAtividades";
import { MyButtonImage } from "@/components/MyButtonImage";
import Link from "next/link";

export default function Atividades(){
	return(
		<div className="p-4 ">
			<ContainerAtividades/>
			<div className=" container bg-white rounded-lg mt-12 mx-auto shadow-lg">
				<div className="flex flex-col">
					<div className="ml-4 mt-4">
						<Link href={'/atividades/cadastrar'} className="inline-block">
							<MyButtonImage 
								buttonText="Cadastrar atividade" 
								imageSrc="/images/atividades/cadastrar.png" 
								imageAlt="Cadastrar atividade" 
								styles="p-1 px-2 mb-4" 
							/>
						</Link>
					</div>
					<div className="ml-4 mt-4">
						<Link href={'/atividades/alterar'} className="inline-block">
							<MyButtonImage 
								buttonText="Alterar atividade" 
								imageSrc="/images/atividades/alterar.png" 
								imageAlt="Alterar atividade" 
								styles="p-1 px-2 mb-4" 
							/>
						</Link>
					</div>
					<div className="ml-4 mt-4">
						<Link href={'/atividades/lancar'} className="inline-block">
							<MyButtonImage 
								buttonText="Lançar Presença" 
								imageSrc="/images/atividades/presenca.png" 
								imageAlt="Lançar Presença" 
								styles="p-1 px-2 mb-4" 
							/>
						</Link>
					</div>
					<div className="ml-4 mt-4">
						<Link href={'/atividades/consultar'} className="inline-block">
							<MyButtonImage 
								buttonText="Consultar Presença" 
								imageSrc="/images/atividades/interrogaçaõ.png" 
								imageAlt="Consultar Presença" 
								styles="p-1 px-2 mb-40" 
							/>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
};