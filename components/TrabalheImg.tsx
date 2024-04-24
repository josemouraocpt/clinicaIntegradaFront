import { ReactNode } from "react";
import trabalheConosco from "public/images/trabalheConosco.png";
import Image from "next/image";
import { maxHeaderSize } from "http";
import { kMaxLength } from "buffer";


export function TrabalheHead(){
  return(
    <div className="w-full h-80 flex relative inline-block mt-3.5">
      <Image src={trabalheConosco} alt="Duas imagens lado a lado com filtro vermelho. A primeira com uma criança deitada em um tatame ao lado de mulher e médico. A segunda criança em cima de um cavalo com três médicos em volta." className="mx-auto"></Image>
      <p className="absolute top-1/2 end-1/3 text-4xl text-white mr-24">TRABALHE CONOSCO</p>
    </div>
  )
}