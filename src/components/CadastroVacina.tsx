'use client'

import { useState } from 'react';


export default function CadastroVacina() {

        const [vacina, setVacina] = useState({
            nomeVacina: '',
            fabricante: '',
            dosagem: '',
            fornecedor:'',
            validade:'',
            fabricacao:'',
            lote:'',
            tipoArmazenamento:'',
            condicaoArmazenamento:'',

        });
        const handleChange = (e: { target: { name: any; value: any; }; }) => {
            const { name, value } = e.target;
            setVacina(prevVacina => ({
                ...prevVacina,
                [name]: value
            }));
        };
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        // Inserir a lógica para enviar os dados do formulário para onde quiser
        console.log(vacina);
        
    };
  


    return (
        <div>
            <h2 className="font-bold text-lg mb-5 font">
    		    Você está no setor de: <span className="text-red-500">Cadastrar Vacinas</span>
            </h2>
            <div className='text-center text-xl'>
                <h2>Insira <span className="text-red-500">todos</span> os dados necessários</h2>
            </div>
            <div className="container mx-auto p-4 rounded-md bg-gray-100 relative">
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className=' p-3 md:p-4 group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-700'>
                            <input
                                type="text"
                                id="nomeVacina"
                                placeholder='Nome da Vacina'
                                name='nomeVacina'
                                value={vacina.nomeVacina}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className=' p-3 md:p-4 group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-700'>
                            <input
                                type="text"
                                id="fabricante"
                                placeholder='Fabricante'
                                name='fabricante'
                                value={vacina.fabricante}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className=' p-3 md:p-4 group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-700'>
                            <input
                                type="number"
                                id="doses"
                                placeholder='Dosagem'
                                name='dosagem'
                                value={vacina.dosagem}
                                onChange={handleChange}
                                required
                            />
                        </div>
                      
                        <div className=' p-3 md:p-4 group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-700'>
                            <input
                                type="text"
                                id="fornecedor"
                                placeholder='Fornecedor'
                                name='fornecedor'
                                value={vacina.fornecedor}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className=' p-3 md:p-4 group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-700'>
                            <input
                                type="text"
                                id="validade"
                                placeholder='Validade: DD/MM/AAAA'
                                name='validade'
                                value={vacina.validade}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className=' p-3 md:p-4 group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-700'>
                            <input
                                type="text"
                                id="fabricacao"
                                placeholder='Fabricação: DD/MM/AAAA'
                                name='fabricacao'
                                value={vacina.fabricacao}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className=' p-3 md:p-4 group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-700'>
                            <input
                                type="text"
                                id="lote"
                                placeholder='Lote'
                                name='lote'
                                value={vacina.lote}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className=' p-3 md:p-4 group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-700'>
                           
                            <input
                                type="text"
                                id="tipoArmazenamento"
                                placeholder='Tipo de Armazenamento'
                                name='tipoArmazenamento'
                                value={vacina.tipoArmazenamento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                         
                        <div className=' p-3 md:p-4 group flex flex-col bg-white border shadow-sm rounded-xl hover:shadow-md transition dark:bg-neutral-900 dark:border-neutral-700'>
                            <input
                                type="text"
                                id="condicaoArmazenamento"
                                placeholder='Condição de Armazenamento'
                                name='condicaoArmazenamento'
                                value={vacina.condicaoArmazenamento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <button  className=" relative bottom-1 right-2 bg-button p-2 px-6 rounded-lg text-white text-lg hover:bg-button-hover" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>

    );
}
