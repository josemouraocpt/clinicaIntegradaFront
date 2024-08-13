'use client';

interface IAtendimentosListProps{
    canEdit: boolean
}

export function AtendimentosList({canEdit}: IAtendimentosListProps){
    return(
        <div className="flex space-x-2 mb-1 w-full">
            <input type="text" readOnly={!canEdit} className="border p-1 border-gray-500 shadow-sm w-1/5" value="Seg - 02/01/2023"/>
            <input type="text" readOnly={!canEdit} className="border p-1 border-gray-500 shadow-sm w-1/5" value="Fisioterapia"/>
            <input type="text" readOnly={!canEdit} className="border p-1 border-gray-500 shadow-sm w-1/5" value="Rafaela"/>
            <input type="text" readOnly={!canEdit} className="border p-1 border-gray-500 shadow-sm w-1/5" value="Dor nas costas"/>
            <input type="text" readOnly={!canEdit} className="border p-1 border-gray-500 shadow-sm w-1/5" value="Massagem nas costas"/>
            <input type="text" readOnly={!canEdit} className="border p-1 border-gray-500 shadow-sm w-1/5" value="Remedio para as costas"/>
        </div>
    )
}