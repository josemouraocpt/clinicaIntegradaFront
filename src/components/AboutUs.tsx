import { MapPin, Phone } from "lucide-react"

export default function AboutUs() {
	return(
		<div className="flex text-white">
			<div className="bg-gradient-to-r from-gradient2 to-gradient">
				<MapPin/>
				<h2>
					Ondes Estamos
					</h2>				
				<p>
					SEDE EM CRUCILÂNDIA
					Rua: São Vicente de Paula 175
					Vicentino - Crucilândia/MG
					</p>
			</div>
			<div className="bg-gradient">
				<MapPin/>
				<h2>
					Escritório em Belo Horizonte
				</h2>
				<p>
					Rua Engenheiro Ocelo Cirino, 55
					Estoril - Belo Horizonte/MG
				</p>
			</div>
			<div className="bg-gradient-to-r from-gradient to-gradient2">
				<Phone  />
				<h2>
					Nossos Contatos
				</h2>
				<p>
					E-mail: contato@assopoc.org.br
					Celular: (31) 98853-0144
					Telefone: (31) 3378-2107
				</p>
			</div>
		</div>
	)
}