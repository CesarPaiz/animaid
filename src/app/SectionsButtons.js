'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Tooltip } from "@nextui-org/react"

export default function SectionButtons() {
    const pathname = usePathname()
    if (pathname === "/") {
        return (
            <div className="flex gap-4 flex-row  item-align-center justify-center mt-8 mb-4">
                <Link href={{
                    pathname: '/tendencia/' + 1

                }}>
                    <div className="bg-blue-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded-full "> Tendencias </div>

                </Link>
                <Tooltip placement="bottom" content="Proximamente" className='bg-gray-800 rounded-full outline-none text-white px-2'>
                    <div className="bg-blue-900  text-white font-bold py-2 px-4 rounded-full " > Populares </div>

                </Tooltip>
                <Tooltip placement="bottom" content="Proximamente" className='bg-gray-800 rounded-full outline-none text-white px-2'>
                    <div className="bg-blue-900  text-white font-bold py-2 px-4 rounded-full "> Guardados </div>

                </Tooltip>
            </div>
        )
    }
    else {
    }

}