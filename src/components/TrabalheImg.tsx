import { ReactNode } from "react";
import trabalheConosco1 from "public/images/trabalheConosco1.png";
import trabalheConosco2 from "public/images/trabalheConosco2.png";
import Image from "next/image";
import { maxHeaderSize } from "http";
import { kMaxLength } from "buffer";


export function TrabalheHead(){
  return(
    <div className="w-full h-80 flex relative inline-block mt-3.5">
      <Image src={trabalheConosco1} alt="Criança deitada no chão" className="h-full w-full object-cover	drop-shadow-md rounded-s-3xl mix-blend-overlay bg-container backdrop-opacity-50	ml-5"></Image>
      <Image src={trabalheConosco2} alt="Criança montada em cavalo" className="h-full w-full object-cover	drop-shadow-md rounded-r-3xl	mix-blend-overlay bg-container backdrop-opacity-50 mr-5"></Image>
      <p className="absolute top-1/2 left-1/2 text-4xl text-white ml-1">CONOSCO</p>
      <p className="absolute top-1/2 right-1/2 text-4xl text-white mr-1">TRABALHE</p>
    </div>
  )
}