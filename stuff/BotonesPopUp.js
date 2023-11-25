'use client'
import { Tooltip } from '@nextui-org/react'
import Link from 'next/link'
export default function BotonesPopUp({tipo, id }) {
    return (
        <div className="flex justify-end gap-2">
            <Tooltip  placement="bottom" content="Proximamente" className='bg-gray-800 mb-2 rounded-full outline-none text-white px-2'>
                <button className="bg-slate-800 text-white px-4 py-2 rounded">
                    Guardar
                </button>
            </Tooltip>
            <Link href={{
                pathname: '/' + String(tipo).toLocaleLowerCase() + '/' + id,

            }}>
                <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                    Ver
                </button>
            </Link>
        </div >
    )
}