'use client'
import Link from 'next/link';
import { useState } from 'react';
export default function CadastroVacina() {

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };
  
    return (
        <div className='p-10'>
            <div className='m-4'>
                <h2 className='text-2xl text-center'>Insira <span className="text-red-500">todos</span> os dados necessários</h2>
            </div>
            <div className='bg-white p-5 rounded-md mb-20 shadow-lg'>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <label>Nome da vacina:
                            <input type="text" className='input'/>
                        </label>
                        <label>Fabricante:
                            <input type="text" className='input'/>
                        </label>
                        <label>Dosagem:
                            <input type="text" className='input'/>
                        </label>
                        <label>Fornecedor:
                            <input type="text" className='input'/>
                        </label>
                        <label>Validade:
                            <input type="date" className='input'/>
                        </label>
                        <label>Tipo de armazenamento necessário:
                            <input type="text" className='input'/>
                        </label>
                        <label>Número do lote:
                            <input type="text" className='input'/>
                        </label>
                        <label>Condição de armazenamento:
                            <input type="text" className='input'/>
                        </label>
                        <label>Data da fabricação:
                            <input type="date" className='input'/>
                        </label>
                    </div>
                </form>
                <div className='flex space-x-2 items-center justify-end'>
                    <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="submit">
                        Cadastrar
                    </button>
                    <button className="bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="button">
                        <Link href="/farmacia/vacinas">Voltar</Link>
                    </button>
                </div>
            </div>
        </div>

    );
}
