import { ReactNode } from "react";

export function ContainerEnvie(){
  return(
    <div className="bg-white w-6/12 mx-7 my-5 pb-14 px-14 pt-16 text-2xl rounded-3xl shadow-md">
      <p className="">Ou envie por aqui.</p>
      <form>
        <fieldset className="ml-10 text-sm flex flex-col">
          <label for="envieUsuario" className="absolute hidden">Usuário Nome</label>
          <input type="text" id="envieUsuario" placeholder="Usuário Nome" className="w-full h-20 mt-11 pl-5 border-inp border-2 rounded placeholder:text-info"></input>

          <label for="envieEmail" className="absolute hidden">Usuário E-mail</label>
          <input type="email" id="envieEmail" placeholder="Usuário E-mail" className="w-full h-20 mt-16 pl-5 border-info border-2 rounded placeholder:text-info"></input>
        </fieldset>
      </form>
      <div className="flex justify-end">
      <button type="submit" value="Submit" className="w-24 h-11 mt-16 bg-button text-white rounded-xl">Enviar</button>
      </div>
    </div>
  )
}