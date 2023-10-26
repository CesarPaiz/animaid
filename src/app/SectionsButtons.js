'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function SectionButtons() {
    const pathname = usePathname()
    if(pathname === "/"){
        return (
            <div className="flex gap-4 flex-row  item-align-center justify-center mt-8 mb-4">
                <Link href={{
                    pathname: '/tendencia',
                    query: {
                        pag: 1,
                    }
                }}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full    "> Tendencias </button>
    
                </Link>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full " > Populares </button>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "> Guardados </button>
            </div>
        )
            }
        else{
        }
    
}